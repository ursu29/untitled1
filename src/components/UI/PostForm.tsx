import { Button, Checkbox, Col, Form, Icon, Input, Row, Upload, Modal, Tabs } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'
import { GATEWAY } from '../../config'
import { Post } from '../../types'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

type PostPick = Pick<Post, 'title' | 'body' | 'bodyTranslated' | 'sendEmail'>

interface Props extends FormComponentProps {
  loading: boolean
  post?: PostPick
  onSubmit: (
    values: Pick<Post, 'title' | 'body' | 'bodyTranslated' | 'sendEmail'> & { images: string[] },
    reset: () => void,
  ) => void
}

class PostForm extends React.Component<Props> {
  state: any
  constructor(props: Props) {
    super(props)
    this.state = {
      publishAttempt: false,
      body: localStorage.getItem('postBody') || '',
      bodyTranslated: localStorage.getItem('postBodyTranslated') || '',
      selectedTab: 'write',
      fileList: [],
      showModal: false,
    }
    this.clearForm = this.clearForm.bind(this)
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ publishAttempt: true, showModal: false })
    this.props.form.validateFields((err, values) => {
      console.log(err)
      if (!err && this.state.body) {
        this.setState({ showModal: true })
      }
    })
  }

  handlePublish = () =>
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.value) {
        this.setState({ showModal: false })
        this.props.onSubmit(
          {
            title: values.title,
            body: this.state.body,
            bodyTranslated: this.state.bodyTranslated,
            sendEmail: values.sendEmail,
            images: this.state.fileList.map((file: any) => file.response[0].id),
          },
          this.clearForm,
        )
      }
    })

  public clearForm() {
    this.props.form.resetFields()
    this.setState({ body: '', bodyTranslated: '', publishAttempt: false })
    localStorage.removeItem('postBody')
    localStorage.removeItem('postValues')
  }

  setBody = (body: any) => {
    localStorage.setItem('postBody', body)
    this.setState({ body })
  }

  setBodyTranslated = (bodyTranslated: any) => {
    localStorage.setItem('postBodyTranslated', bodyTranslated)
    this.setState({ bodyTranslated })
  }

  setSelectedTab = (selectedTab: any) => this.setState({ selectedTab })
  handleImageChange = ({ fileList }: any) => this.setState({ fileList })
  handleReturn = () => this.setState({ showModal: false })

  render() {
    const { getFieldDecorator } = this.props.form

    const bodyError = this.state.publishAttempt && !this.state.body

    const postValues = localStorage.getItem('postValues')
    const post = this.props.post || (postValues && (JSON.parse(postValues!) as PostPick)) || null

    return (
      <>
        <Modal
          okText="Publish"
          width={800}
          title="Preview"
          visible={this.state.showModal}
          onOk={this.handlePublish}
          onCancel={this.handleReturn}
        >
          <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state.body) }}></div>
        </Modal>
        <Form layout="vertical" onSubmit={this.handleSubmit} style={{ marginBottom: 16 }}>
          <Form.Item>
            {getFieldDecorator('title', {
              initialValue: post?.title,
              rules: [{ required: true, message: 'Please add some title!' }],
            })(<Input placeholder="Post title" />)}
          </Form.Item>
          <Tabs>
            <Tabs.TabPane tab="Russian" key="russian">
              <Form.Item
                validateStatus={bodyError ? 'error' : ''}
                help={bodyError ? 'Please add some content!' : ''}
              >
                <ReactMde
                  value={this.state.body}
                  onChange={this.setBody}
                  selectedTab={this.state.selectedTab}
                  onTabChange={this.setSelectedTab}
                  generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                  }
                />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="English" key="english">
              <Form.Item
                validateStatus={bodyError ? 'error' : ''}
                help={bodyError ? 'Please add some content!' : ''}
              >
                <ReactMde
                  value={this.state.bodyTranslated}
                  onChange={this.setBodyTranslated}
                  selectedTab={this.state.selectedTab}
                  onTabChange={this.setSelectedTab}
                  generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                  }
                />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Form.Item>
            <Upload
              listType="picture"
              fileList={this.state.fileList}
              action={GATEWAY + '/upload'}
              name="files"
              onChange={this.handleImageChange}
              multiple
            >
              {this.state.fileList.length >= 10 ? null : (
                <Button>
                  <Icon type="upload" /> Upload Photos
                </Button>
              )}
            </Upload>
          </Form.Item>
          <Row type="flex" justify="space-between">
            <Col>
              <Form.Item>
                {getFieldDecorator('sendEmail', {
                  initialValue: post?.sendEmail,
                  valuePropName: 'checked',
                })(<Checkbox>Make a newsletter on all sidenis.com boxes</Checkbox>)}
              </Form.Item>
            </Col>
            <Col>
              <Button loading={this.props.loading} type="primary" htmlType="submit">
                Publish
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
}

export default Form.create<Props>({
  name: 'post_form',
  onValuesChange: (_, __, values: any) => {
    localStorage.setItem('postValues', JSON.stringify(values))
  },
})(PostForm)

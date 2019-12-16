import {
  Button,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Upload,
  Modal as AntdModal,
  Tabs,
  Typography,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'
import { GATEWAY } from '../../config'
import { Post } from '../../types'
import Gallery from 'react-photo-gallery'
//@ts-ignore
import Carousel, { Modal, ModalGateway } from 'react-images'

const { Title } = Typography

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

type PostPick = Partial<
  Pick<Post, 'title' | 'body' | 'bodyTranslated' | 'sendEmail'> & {
    tags: any
    images: any
  }
>

interface Props extends FormComponentProps {
  loading: boolean
  values?: PostPick
  onSubmit: (
    values: Pick<Post, 'title' | 'body' | 'bodyTranslated' | 'sendEmail'> & {
      images: string[]
      tags: string[]
    },
    reset: () => void,
  ) => void
  TagSelect: any
}

class PostForm extends React.Component<Props> {
  state: any
  constructor(props: Props) {
    super(props)
    this.state = {
      publishAttempt: false,
      selectedTab: 'write',
      values: localStorage.getItem('postValues')
        ? JSON.parse(localStorage.getItem('postValues')!)
        : {},
      showPostPreview: false,
    }
    this.clearForm = this.clearForm.bind(this)
  }

  componentDidMount() {
    if (this.props.values) {
      this.updateValues(this.props.values)
    }
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ publishAttempt: true, showPostPreview: false })
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.values.body) {
        this.setState({
          showPostPreview: true,
          values: {
            ...this.state.values,
            ...values,
          },
        })
      }
    })
  }

  handlePublish = () => {
    this.props.onSubmit(
      {
        title: this.state.values.title,
        body: this.state.values.body,
        bodyTranslated: this.state.values.bodyTranslated,
        sendEmail: this.state.values.sendEmail,
        tags: this.state.values.tags?.map((tag: any) => tag.id),
        images: this.state.values.images?.map((file: any) => file.id || file.response?.[0]?.id),
      },
      this.clearForm,
    )
  }

  public clearForm() {
    this.props.form.resetFields()
    this.setState({ values: null, showPostPreview: false, publishAttempt: false })
    localStorage.removeItem('postValues')
  }

  updateValues(values: any) {
    if (!this.props.values) {
      localStorage.setItem('postValues', JSON.stringify(values))
    }
    this.setState({ values })
  }

  setBody = (body: any) => {
    this.updateValues({
      ...this.state.values,
      body,
    })
  }

  setBodyTranslated = (bodyTranslated: any) => {
    this.updateValues({
      ...this.state.values,
      bodyTranslated,
    })
  }

  setSelectedTab = (selectedTab: any) => this.setState({ selectedTab })

  handleImageChange = ({ fileList: images }: any) => {
    this.updateValues({ ...this.state.values, images })
  }

  handleReturn = () => this.setState({ showPostPreview: false })

  handlePreview = async (file: any) => {
    this.setState({
      currentImage: this.state.values.images.findIndex((i: any) => i.url === file.url),
      showImagePreview: true,
    })
  }

  openLightbox = (event: any, { photo, index }: any) => {
    this.setState({ showImagePreview: true, currentImage: index })
  }

  closeLightbox = (event: any) => {
    this.setState({ showImagePreview: false, currentImage: 0 })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const post = this.state.values || {}
    const bodyError = this.state.publishAttempt && !post.body

    const TagSelect = this.props.TagSelect

    return (
      <>
        <ModalGateway>
          {this.state.showImagePreview ? (
            <Modal
              onClose={this.closeLightbox}
              styles={{
                blanket: (base: any, state: any) => ({ ...base, zIndex: 1100 }),
                positioner: (base: any, state: any) => ({ ...base, zIndex: 1110 }),
                dialog: (base: any, state: any) => ({ ...base, zIndex: 1120 }),
              }}
            >
              <Carousel
                currentIndex={this.state.currentImage}
                views={post.images.map((x: any) => ({
                  source: x.url || x.response?.[0]?.url,
                  caption: x.fileName,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
        <AntdModal
          okText="Publish"
          width={800}
          title="Preview"
          visible={this.state.showPostPreview}
          onOk={this.handlePublish}
          onCancel={this.handleReturn}
        >
          {this.state.showPostPreview && (
            <>
              <Title level={4}>{post.title}</Title>
              <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(post.body) }}></div>
              <Gallery
                onClick={this.openLightbox}
                photos={
                  post.images?.map((image: any) => {
                    return {
                      src: image.url || image.response?.[0]?.url,
                      width: 4,
                      height: 3,
                    }
                  }) || []
                }
              />
            </>
          )}
        </AntdModal>
        <Form layout="vertical" onSubmit={this.handleSubmit} style={{ marginBottom: 16 }}>
          <Tabs>
            <Tabs.TabPane tab="Russian" key="russian">
              <Form.Item>
                {getFieldDecorator('title', {
                  initialValue: post?.title,
                  rules: [{ required: true, message: 'Please add some title!' }],
                })(<Input placeholder="Post title" />)}
              </Form.Item>
              <Form.Item
                validateStatus={bodyError ? 'error' : ''}
                help={bodyError ? 'Please add some content!' : ''}
              >
                <ReactMde
                  value={post.body}
                  minEditorHeight={400}
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
              <Form.Item>
                {getFieldDecorator('titleTranslated', {
                  initialValue: post?.titleTranslated,
                  rules: [{ required: false, message: 'Please add some title!' }],
                })(<Input placeholder="Post title" />)}
              </Form.Item>
              <Form.Item
                validateStatus={bodyError ? 'error' : ''}
                help={bodyError ? 'Please add some content!' : ''}
                style={{ flexGrow: 1 }}
              >
                <ReactMde
                  value={post.bodyTranslated}
                  minEditorHeight={400}
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
              listType="picture-card"
              fileList={post.images}
              action={GATEWAY + '/upload'}
              name="files"
              onChange={this.handleImageChange}
              onPreview={this.handlePreview}
              multiple
            >
              {post.images?.length >= 10 ? null : (
                <Button>
                  <Icon type="upload" /> Upload Photos
                </Button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('tags', {
              initialValue: post?.tags,
            })(<TagSelect multiple />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('sendEmail', {
              initialValue: post?.sendEmail,
              valuePropName: 'checked',
            })(<Checkbox>Make a newsletter</Checkbox>)}
          </Form.Item>
          <Row type="flex" justify="space-between">
            <Col></Col>
            <Col>
              <Button loading={this.props.loading} type="primary" htmlType="submit">
                Preview & publish
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

import { Form, Icon, Input, Checkbox, Button, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'
import { Post } from '../../types'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

interface Props extends FormComponentProps {
  loading: boolean
  onSubmit: (
    values: Pick<Post, 'title' | 'body' | 'bodyTranslated' | 'sendEmail'>,
    reset: () => void,
  ) => void
}

class HorizontalLoginForm extends React.Component<Props> {
  state: any
  constructor(props: Props) {
    super(props)
    this.state = {
      publishAttempt: false,
      value: '',
      selectedTab: 'write',
    }
    this.clearForm = this.clearForm.bind(this)
  }
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ publishAttempt: true })
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.value) {
        this.props.onSubmit(
          {
            title: values.title,
            body: this.state.value,
            bodyTranslated: '',
            sendEmail: values.sendEmail,
          },
          this.clearForm,
        )
      }
    })
  }

  public clearForm() {
    this.props.form.resetFields()
    this.setState({ value: '', publishAttempt: false })
  }

  setValue = (value: any) => this.setState({ value })
  setSelectedTab = (selectedTab: any) => this.setState({ selectedTab })

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const bodyError = this.state.publishAttempt && !this.state.value

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit} style={{ marginBottom: 16 }}>
        <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please add some title!' }],
          })(<Input placeholder="Post title" />)}
        </Form.Item>
        <Form.Item
          validateStatus={bodyError ? 'error' : ''}
          help={bodyError ? 'Please add some content!' : ''}
        >
          <ReactMde
            value={this.state.value}
            onChange={this.setValue}
            selectedTab={this.state.selectedTab}
            onTabChange={this.setSelectedTab}
            generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
          />
        </Form.Item>
        <Row type="flex" justify="space-between">
          <Col>
            <Form.Item>
              {getFieldDecorator('sendEmail', {
                valuePropName: 'checked',
                initialValue: false,
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
    )
  }
}

export default Form.create<Props>({ name: 'horizontal_login' })(HorizontalLoginForm)

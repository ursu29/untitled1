import { Badge, Button, Checkbox, Col, Form, Icon, Input, Row, Tabs, Upload } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
//@ts-ignore
import Carousel, { Modal, ModalGateway } from 'react-images'
import { GATEWAY } from '../../config'
import { Post } from '../../types'
import PostFormLocations from './PostFormLocations'
import PostPrewiew from './PostPreview'
import MarkdownEditor from './MarkdownEditor'
import copyToCliboard from '../../utils/copyToClipboard'
import message from '../../message'

type PostPick = Partial<
  Pick<Post, 'title' | 'body' | 'bodyTranslated'> & {
    tags: any
    images: any
  }
>

interface Props extends FormComponentProps {
  loading: boolean
  values?: PostPick
  onSubmit: (
    values: Pick<
      Post,
      'title' | 'titleTranslated' | 'body' | 'bodyTranslated' | 'isTranslated' | 'locations'
    > & {
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
      const isValid = !err && this.state.values.body
      const isTranslatedValid =
        (values.isTranslated && this.state.values.bodyTranslated) || !values.isTranslated
      if (isValid && isTranslatedValid) {
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
        isTranslated: this.state.values.isTranslated,
        titleTranslated: this.state.values.titleTranslated,
        bodyTranslated: this.state.values.bodyTranslated,
        locations: this.state.values.locations,
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
      const string = localStorage.getItem('postValues')
      const prevValues = string && JSON.parse(string)
      if (prevValues) {
        this.setState({ values: { ...prevValues, ...values } })
        localStorage.setItem('postValues', JSON.stringify({ ...prevValues, ...values }))
      } else {
        this.setState({ values })
        localStorage.setItem('postValues', JSON.stringify(values))
      }
    } else {
      this.setState({ values: { ...this.state.values, ...values } })
    }
  }

  setBody = (body: any) => this.updateValues({ body })

  setLocations = (locations: any) => this.updateValues({ locations })

  setBodyTranslated = (bodyTranslated: any) => this.updateValues({ bodyTranslated })

  handleImageChange = ({ fileList: images }: any) => {
    this.setState({ values: { ...this.state.values, images } })
    if (!this.props.values) {
      const string = localStorage.getItem('postValues')
      const prevValues = string && JSON.parse(string)
      const values = {
        images: images?.filter((i: any) => i.url || i.response?.[0]?.url),
      }
      if (prevValues) {
        localStorage.setItem('postValues', JSON.stringify({ ...prevValues, ...values }))
      } else {
        localStorage.setItem('postValues', JSON.stringify(values))
      }
    }
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
    const { getFieldDecorator, getFieldError, getFieldValue } = this.props.form

    const post = this.state.values || {}
    const bodyError = this.state.publishAttempt && !post.body

    const bodyTranslatedError =
      this.state.publishAttempt && post?.isTranslated && !post.bodyTranslated

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
        <PostPrewiew
          post={post}
          handlePublish={this.handlePublish}
          handleReturn={this.handleReturn}
          visible={this.state.showPostPreview && !this.props.loading}
        />
        <Form layout="vertical" onSubmit={this.handleSubmit} style={{ marginBottom: 16 }}>
          <Form.Item style={{ marginBottom: 0 }}>
            {getFieldDecorator('isTranslated', {
              initialValue: post?.isTranslated,
              valuePropName: 'checked',
            })(<Checkbox>With translation</Checkbox>)}
          </Form.Item>
          <Tabs animated={false}>
            <Tabs.TabPane
              tab={<Badge dot={bodyError || Boolean(getFieldError('title'))}>Russian</Badge>}
              key="russian"
            >
              <Form.Item style={{ marginBottom: 4 }}>
                {getFieldDecorator('title', {
                  initialValue: post?.title,
                  rules: [{ required: true, message: 'Please add some title!' }],
                })(<Input placeholder="Post title" />)}
              </Form.Item>
              <Form.Item
                validateStatus={bodyError ? 'error' : ''}
                help={bodyError ? 'Please add some content!' : ''}
                style={{ marginBottom: 0 }}
              >
                <MarkdownEditor id="postBody" value={post.body} onChange={this.setBody} />
              </Form.Item>
            </Tabs.TabPane>
            {getFieldValue('isTranslated') && (
              <Tabs.TabPane
                tab={
                  <Badge dot={bodyTranslatedError || Boolean(getFieldError('titleTranslated'))}>
                    English
                  </Badge>
                }
                key="english"
              >
                <Form.Item style={{ marginBottom: 4 }}>
                  {getFieldDecorator('titleTranslated', {
                    initialValue: post?.titleTranslated,
                    rules: [{ required: post?.isTranslated, message: 'Please add some title!' }],
                  })(<Input placeholder="Post title" />)}
                </Form.Item>
                <Form.Item
                  validateStatus={bodyTranslatedError ? 'error' : ''}
                  help={bodyTranslatedError ? 'Please add some content!' : ''}
                  style={{ flexGrow: 1, marginBottom: 0 }}
                >
                  <MarkdownEditor
                    id="postBodyTranslated"
                    value={post.bodyTranslated}
                    onChange={this.setBodyTranslated}
                  />
                </Form.Item>
              </Tabs.TabPane>
            )}
          </Tabs>
          <Form.Item>
            <Upload
              fileList={post.images}
              action={GATEWAY + '/upload'}
              name="files"
              onChange={this.handleImageChange}
              onPreview={this.handlePreview}
              onDownload={value => {
                copyToCliboard(value.response[0].url)
                message.success('Link copied')
              }}
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
            })(<TagSelect allowAddNew multiple />)}
          </Form.Item>
          <PostFormLocations
            isTranslated={getFieldValue('isTranslated')}
            values={post.locations}
            onChange={this.setLocations}
          />
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
    const string = localStorage.getItem('postValues')
    const prevValues = string && JSON.parse(string)
    if (prevValues) {
      localStorage.setItem('postValues', JSON.stringify({ ...prevValues, ...values }))
    } else {
      localStorage.setItem('postValues', JSON.stringify(values))
    }
  },
})(PostForm)

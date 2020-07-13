import { UploadOutlined } from '@ant-design/icons'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Button, Checkbox, Col, Input, Row, Upload } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import React from 'react'
//@ts-ignore
import Carousel, { Modal, ModalGateway } from 'react-images'
import { GATEWAY } from '../../config'
import message from '../../message'
import { Post } from '../../types'
import copyToCliboard from '../../utils/copyToClipboard'
import TagSelect from '../Tags/TagSelect'
import MarkdownEditor from '../UI/MarkdownEditor'
import PostFormLocations from './PostFormLocations'
import PostPrewiew from './PostPreview'

type PostPick = Partial<
  Pick<Post, 'title' | 'body'> & {
    tags: any
    images: any
  }
>

interface Props extends FormComponentProps {
  loading: boolean
  values?: PostPick
  onSubmit: (
    values: Pick<Post, 'title' | 'body' | 'isTranslated' | 'locations'> & {
      images: string[]
      tags: string[]
    },
    reset: () => void,
  ) => void
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
      if (isValid) {
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
    const { getFieldDecorator, getFieldValue } = this.props.form

    const post = this.state.values || {}
    const bodyError = this.state.publishAttempt && !post.body

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
          <Form.Item>
            {getFieldDecorator('title', {
              initialValue: post?.title,
              rules: [{ required: true, message: 'Please add title!' }],
            })(<Input placeholder="Post title" />)}
          </Form.Item>
          <Form.Item
            validateStatus={bodyError ? 'error' : ''}
            help={bodyError ? 'Please add some content!' : ''}
            style={{ marginBottom: 0 }}
          >
            <MarkdownEditor id="postBody" value={post.body} onChange={this.setBody} />
          </Form.Item>
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
                  <UploadOutlined /> Upload Photos
                </Button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('tags', {
              initialValue: post?.tags,
            })(<TagSelect allowAddNew multiple />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isTranslated', {
              initialValue: post?.isTranslated,
              valuePropName: 'checked',
            })(<Checkbox>Translated</Checkbox>)}
          </Form.Item>
          <PostFormLocations
            isTranslated={getFieldValue('isTranslated')}
            values={post.locations}
            onChange={this.setLocations}
          />
          <Row justify="space-between">
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

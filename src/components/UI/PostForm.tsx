import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Badge,
  Modal as AntdModal,
  Row,
  Checkbox,
  Tabs,
  Typography,
  Upload,
} from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
//@ts-ignore
import Carousel, { Modal, ModalGateway } from 'react-images'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
// import Gallery from 'react-photo-gallery'
import Gallery from '../UI/Gallery'
import * as Showdown from 'showdown'
import { GATEWAY } from '../../config'
import { Post } from '../../types'
import PostFormLocations from './PostFormLocations'

const { Title } = Typography

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

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

  updateState = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (values.isTranslated !== this.state.values.isTranslated) {
        this.setState({
          values: {
            ...this.state.values,
            ...values,
          },
        })
      }
    })
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

  setSelectedTab = (selectedTab: any) => this.setState({ selectedTab })

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
    const { getFieldDecorator, getFieldError } = this.props.form

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
        <AntdModal
          okText="Publish"
          width={1000}
          bodyStyle={{ maxHeight: 600, overflowY: 'auto' }}
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
                images={
                  post.images
                    ?.filter((x: any) => x.url || x.response?.[0]?.url)
                    .map((image: any) => {
                      return {
                        id: image.id,
                        url: image.url || image.response?.[0]?.url,
                      }
                    }) || []
                }
              />
            </>
          )}
        </AntdModal>
        <Form
          layout="vertical"
          onSubmit={this.handleSubmit}
          style={{ marginBottom: 16 }}
          onChange={this.updateState}
        >
          <Form.Item>
            {getFieldDecorator('isTranslated', {
              initialValue: post?.isTranslated,
              valuePropName: 'checked',
            })(<Checkbox>With translation</Checkbox>)}
          </Form.Item>
          <Tabs animated={false}>
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
            {post?.isTranslated && (
              <Tabs.TabPane
                tab={
                  <Badge dot={bodyTranslatedError || Boolean(getFieldError('titleTranslated'))}>
                    English
                  </Badge>
                }
                key="english"
              >
                <Form.Item>
                  {getFieldDecorator('titleTranslated', {
                    initialValue: post?.titleTranslated,
                    rules: [{ required: post?.isTranslated, message: 'Please add some title!' }],
                  })(<Input placeholder="Post title" />)}
                </Form.Item>
                <Form.Item
                  validateStatus={bodyTranslatedError ? 'error' : ''}
                  help={bodyTranslatedError ? 'Please add some content!' : ''}
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
            )}
          </Tabs>
          <Form.Item>
            <Upload
              // listType="picture-card"
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
            })(<TagSelect allowAddNew multiple />)}
          </Form.Item>
          <PostFormLocations values={post.locations} onChange={this.setLocations} />
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

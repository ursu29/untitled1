import { UploadOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, Row, Switch, Upload } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { GATEWAY } from '../../config'
import { Post } from '../../types'
import TagSelect from '../Tags/TagSelect'
import MarkdownEditor from '../UI/MarkdownEditor'
import PostFormLocations from './PostFormLocations'
import PostPrewiew from './PostPreview'

type PostPick = Partial<
  Pick<Post, 'title' | 'body' | 'isTranslated' | 'isPublic' | 'annotation' | 'locations'> & {
    tags: any
    images: any
    publishDate: any
    titleImage: any
    backgroundImage: any
    foregroundImage: any
  }
>

interface Props {
  loading: boolean
  values?: PostPick
  onSubmit: (values: any, reset: () => void) => void
}

export default function PostForm({ values: post, loading, onSubmit }: Props) {
  const [form] = Form.useForm()
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!post) {
      const storagedValues = localStorage.getItem('postValues')
      if (storagedValues) {
        const values = JSON.parse(storagedValues)
        form.setFieldsValue({
          ...values,
          publishDate: values.publishDate
            ? moment(values.publishDate, 'YYYY-MM-DDTHH:mm:ssZ')
            : null,
        })
      }
    }
    //eslint-disable-next-line
  }, [])

  const handlePublish = () => {
    const values = form.getFieldsValue()
    onSubmit(
      {
        ...values,
        titleImage: values.titleImage?.[0]?.id || values.titleImage?.[0]?.response?.[0]?.id,
        backgroundImage:
          values.backgroundImage?.[0]?.id || values.backgroundImage?.[0]?.response?.[0]?.id,
        foregroundImage:
          values.foregroundImage?.[0]?.id || values.foregroundImage?.[0]?.response?.[0]?.id,
        images: values.images?.map((i: any) => i?.id || i.response?.[0]?.id),
        tags: values.tags?.map((i: any) => i.id),
        locations: values.locations?.filter((i: any) => i),
      },
      () => {
        localStorage.removeItem('postValues')
      },
    )
  }

  const handlePreview = (file: any) => {
    const url = file.url || file.response?.[0]
    if (url) {
      window.open(url, '_blank')
    }
  }

  const handleValueFromEvent = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return (
      e &&
      e.fileList.map((i: any) => {
        return {
          ...i,
          url: i.response?.[0]?.url,
        }
      })
    )
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={post}
      onFinish={() => {
        setPreview(true)
      }}
      onValuesChange={() => {
        if (!post) {
          localStorage.setItem('postValues', JSON.stringify(form.getFieldsValue()))
        }
      }}
    >
      <Form.Item shouldUpdate={preview} noStyle>
        <PostPrewiew
          post={form.getFieldsValue()}
          handlePublish={handlePublish}
          handleReturn={() => setPreview(false)}
          visible={preview && !loading}
        />
      </Form.Item>
      <Row>
        <Col span={6}>
          <Form.Item label="Post is public" name="isPublic" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) => prevValues.isPublic !== curValues.isPublic}
        >
          {() => {
            const isPublic = form.getFieldValue('isPublic')
            if (!isPublic) return null
            return (
              <Col span={8}>
                <Form.Item name="publishDate" label="Publish date">
                  <DatePicker showTime />
                </Form.Item>
              </Col>
            )
          }}
        </Form.Item>
      </Row>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please add title!' }]}
      >
        <Input placeholder="Post title" />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues.isPublic !== curValues.isPublic}
      >
        {() => {
          const isPublic = form.getFieldValue('isPublic')
          if (!isPublic) return null
          return (
            <Form.Item
              label="Annotation"
              name="annotation"
              rules={[
                { required: form.getFieldValue('isPublic'), message: 'Please add annotation!' },
              ]}
            >
              <MarkdownEditor id="postAnnotation" short />
            </Form.Item>
          )
        }}
      </Form.Item>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.isPublic !== curValues.isPublic ||
              prevValues.titleImage !== curValues.titleImage
            }
          >
            {() => {
              const isPublic = form.getFieldValue('isPublic')
              if (!isPublic) return null
              return (
                <Form.Item
                  name="titleImage"
                  label="Title image"
                  valuePropName="fileList"
                  getValueFromEvent={handleValueFromEvent}
                  rules={[
                    {
                      required: form.getFieldValue('isPublic'),
                      message: 'Please add title image!',
                    },
                  ]}
                >
                  <Upload
                    action={GATEWAY + '/upload'}
                    listType="picture"
                    name="files"
                    onPreview={handlePreview}
                    onRemove={() => form.setFieldsValue({ titleImage: null })}
                  >
                    {!form.getFieldValue('titleImage')?.length && (
                      <Button>
                        <UploadOutlined /> Upload Photo
                      </Button>
                    )}
                  </Upload>
                </Form.Item>
              )
            }}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.isPublic !== curValues.isPublic ||
              prevValues.backgroundImage !== curValues.backgroundImage
            }
          >
            {() => {
              const isPublic = form.getFieldValue('isPublic')
              if (!isPublic) return null
              return (
                <Form.Item
                  name="backgroundImage"
                  label="Background image"
                  valuePropName="fileList"
                  getValueFromEvent={handleValueFromEvent}
                >
                  <Upload
                    action={GATEWAY + '/upload'}
                    listType="picture"
                    name="files"
                    onPreview={handlePreview}
                    onRemove={() => form.setFieldsValue({ backgroundImage: null })}
                  >
                    {!form.getFieldValue('backgroundImage')?.length && (
                      <Button>
                        <UploadOutlined /> Upload Photo
                      </Button>
                    )}
                  </Upload>
                </Form.Item>
              )
            }}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.isPublic !== curValues.isPublic ||
              prevValues.foregroundImage !== curValues.foregroundImage
            }
          >
            {() => {
              const isPublic = form.getFieldValue('isPublic')
              if (!isPublic) return null
              return (
                <Form.Item
                  name="foregroundImage"
                  label="Foreground image"
                  valuePropName="fileList"
                  getValueFromEvent={handleValueFromEvent}
                >
                  <Upload
                    action={GATEWAY + '/upload'}
                    listType="picture"
                    name="files"
                    onPreview={handlePreview}
                    onRemove={() => form.setFieldsValue({ foregroundImage: null })}
                  >
                    {!form.getFieldValue('foregroundImage')?.length && (
                      <Button>
                        <UploadOutlined /> Upload Photo
                      </Button>
                    )}
                  </Upload>
                </Form.Item>
              )
            }}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please add body!' }]}>
        <MarkdownEditor id="postBody" />
      </Form.Item>
      <Form.Item
        name="images"
        label="Content images"
        valuePropName="fileList"
        getValueFromEvent={(e: any) => {
          if (Array.isArray(e)) {
            return e
          }
          return (
            e &&
            e.fileList.map((i: any) => {
              return {
                ...i,
                url: i.response?.[0]?.url,
              }
            })
          )
        }}
      >
        <Upload
          action={GATEWAY + '/upload'}
          name="files"
          onPreview={file => {
            const url = file?.url || file.response?.[0]?.url
            if (url) {
              window.open(url, '_blank')
            }
          }}
          multiple
        >
          {/* {!form.getFieldValue('titleImage')?.length && ( */}
          <Button>
            <UploadOutlined /> Upload Photos
          </Button>
          {/* )} */}
        </Upload>
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <TagSelect allowAddNew multiple />
      </Form.Item>

      <Row>
        <Col span={6}>
          <Form.Item label="Post is translated" name="isTranslated" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>

        <Col span={18}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.isTranslated !== curValues.isTranslated
            }
          >
            {() => {
              return (
                <Form.Item name="locations" style={{ margin: 0, padding: 0 }}>
                  <PostFormLocations isTranslated={form.getFieldValue('isTranslated')} />
                </Form.Item>
              )
            }}
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Button loading={loading} type="primary" htmlType="submit">
            Preview & publish
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

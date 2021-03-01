import { UploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Switch, Upload, Alert } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { GATEWAY } from '../../config'
import { Post } from '../../types'
import TagSelect from '../Tags/TagSelect'
import MarkdownEditor from '../UI/MarkdownEditor'
import PostFormLocations from './PostFormLocations'
import PostPrewiew from './PostPreview'

type PostPick = Partial<
  Pick<Post, 'title' | 'body' | 'isTranslated' | 'locations'> & {
    tags: any
    images: any
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

  // const handlePreview = (file: any) => {
  //   const url = file.url || file.response?.[0]
  //   if (url) {
  //     window.open(url, '_blank')
  //   }
  // }

  // const handleValueFromEvent = (e: any) => {
  //   if (Array.isArray(e)) {
  //     return e
  //   }
  //   return (
  //     e &&
  //     e.fileList.map((i: any) => {
  //       return {
  //         ...i,
  //         url: i.response?.[0]?.url,
  //       }
  //     })
  //   )
  // }

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
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please add title!' }]}
      >
        <Input placeholder="Post title" />
      </Form.Item>
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
        <Alert
          message="We do not save attached images anymore. Use this field to upload image to the azure file storage and then drag & drop it to the body to get link "
          type="info"
          style={{ marginBottom: 8 }}
        />
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
                  <PostFormLocations />
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

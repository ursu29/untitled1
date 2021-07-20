import { UploadOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload/interface'
import { Button, Col, Form, Input, Row, Switch, Upload, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { GATEWAY } from '../../config'
import { Hobby, Language } from '../../types/graphql'
import { HobbyPostBaseFragment } from '../../queries/hobbyPosts'
import MarkdownEditor from '../UI/MarkdownEditor'
import HobbySelect from './HobbySelect'
import PostPreview from '../Posts/PostPreview'
import { HobbyPostPreview } from './HobbyPost'

type FormFields = {
  title: string
  body: string
  hobbies: Pick<Hobby, 'id' | 'name'>[]
  isTranslated: boolean
  eventDate?: string
  eventLocation?: string
}

type SubmitValues = {
  title: string
  body: string
  hobbies: string[]
  language: Language
  eventDate?: string
  eventLocation?: string
}

type Props = {
  loading: boolean
  post?: HobbyPostBaseFragment
  onSubmit: (values: SubmitValues, reset: () => void) => void
}

const HobbyPostForm = ({ post, loading, onSubmit }: Props) => {
  const [form] = Form.useForm<FormFields>()
  const [preview, setPreview] = useState(false)
  const [uploadedImg, setUploadedImg] = useState<any>()

  useEffect(() => {
    if (!post) {
      const storagedValues = localStorage.getItem('hobbyPostValues')
      if (storagedValues) {
        const values = JSON.parse(storagedValues)
        form.setFieldsValue(values)
      }
    }
    // eslint-disable-next-line
  }, [])

  const handlePublish = () => {
    const values = form.getFieldsValue()
    onSubmit(
      {
        title: values.title,
        body: values.body,
        hobbies: values.hobbies.map(h => h.id),
        language: values.isTranslated ? Language.En : Language.Ru,
        eventDate: values.eventDate,
        eventLocation: values.eventLocation,
      },
      () => {
        localStorage.removeItem('hobbyPostValues')
      },
    )
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        ...post,
        eventDate: post?.eventDate ? moment(post?.eventDate, 'YYYY-MM-DD') : undefined,
      }}
      onFinish={() => setPreview(true)}
      onValuesChange={() => {
        if (!post) {
          localStorage.setItem('hobbyPostValues', JSON.stringify(form.getFieldsValue()))
        }
      }}
    >
      <Form.Item shouldUpdate={preview} noStyle>
        <PostPreview
          handlePublish={handlePublish}
          handleReturn={() => setPreview(false)}
          visible={preview && !loading}
        >
          <HobbyPostPreview post={form.getFieldsValue()} />
        </PostPreview>
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please add title!' }]}
      >
        <Input placeholder="Post title" />
      </Form.Item>
      <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please add body!' }]}>
        <MarkdownEditor
          id="hobbyPostBody"
          concatValue={
            uploadedImg?.name && uploadedImg?.url
              ? `![${uploadedImg?.name?.split('.')[0]}](${uploadedImg?.url})`
              : undefined
          }
        />
      </Form.Item>
      <Form.Item
        name="images"
        label="Content images"
        valuePropName="fileList"
        getValueFromEvent={(e: UploadChangeParam) => {
          if (Array.isArray(e)) {
            return e
          }
          return e?.fileList.map(i => {
            return {
              ...i,
              url: i.response?.[0]?.url,
            }
          })
        }}
      >
        <Upload
          action={GATEWAY + '/upload'}
          name="files"
          multiple
          listType="picture"
          onChange={info => {
            if (info?.file?.status === 'removed') return
            setUploadedImg(info?.file?.response?.[0])
          }}
        >
          <Button>
            <UploadOutlined /> Upload Photos
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Hobbies" name="hobbies" initialValue={[]}>
        <HobbySelect />
      </Form.Item>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Event date" name="eventDate">
            <DatePicker format={['DD.MM.YYYY']} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Event location" name="eventLocation">
            <Input placeholder="Location" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <Form.Item
            label="Post is translated"
            name="isTranslated"
            valuePropName="checked"
            initialValue={post?.language === Language.En}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Button loading={loading} type="primary" htmlType="submit" data-cy="preview">
            Preview & publish
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default HobbyPostForm

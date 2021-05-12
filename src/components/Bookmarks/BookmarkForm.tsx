import { useApolloClient } from '@apollo/react-hooks'
import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'
import getBookmarkByLink, { QueryType } from '../../queries/getBookmarkByLink'
import { Access, Bookmark, Employee } from '../../types'
import { LINK_REGEXP } from '../../utils/links'
import SkillTreeSelect from '../Skills/SkillTreeSelect'

type BookmarkPick = Pick<Bookmark, 'id' | 'title' | 'link' | 'skills'> & {
  employee: Pick<Employee, 'id' | 'name' | 'email'>
  access: Pick<Access, 'write'>
}

export interface Props {
  onSubmit: (bookmark: Bookmark, onDone?: () => void) => void
  loading?: boolean
  bookmark?: BookmarkPick
}

const BookmarkForm = ({ onSubmit, bookmark, loading }: Props) => {
  const client = useApolloClient()

  const handleSubmit = (values: any) => {
    onSubmit({
      id: bookmark?.id,
      ...values,
      skills: values.skills?.map((i: any) => i.id),
    })
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit} initialValues={bookmark}>
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter title',
              },
            ]}
          >
            <Input onPressEnter={handleSubmit} placeholder="Enter bookmark title" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col style={{ width: '100%' }}>
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                pattern: LINK_REGEXP,
                message: 'Please enter correct link',
              },
              {
                validator: async (_, value) => {
                  try {
                    const res = await client.query<QueryType>({
                      query: getBookmarkByLink,
                      variables: { link: value.trim() },
                      fetchPolicy: 'no-cache',
                    })
                    return res.data.bookmarkByLink && res.data.bookmarkByLink.id !== bookmark?.id
                      ? Promise.reject('Duplicate of ' + res.data.bookmarkByLink.title)
                      : Promise.resolve()
                  } catch (error) {
                    return Promise.resolve() // return success if validation is failed 'cause we have server validation during creation
                  }
                },
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter bookmark link" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Skills" name="skills">
        <SkillTreeSelect />
      </Form.Item>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit">
            Publish
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default BookmarkForm

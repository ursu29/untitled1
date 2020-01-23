import { Button, Col, Form, Input, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'
import { Bookmark, Employee, Access } from '../../types'

type BookmarkPick = Pick<Bookmark, 'id' | 'title' | 'link' | 'skills'> & {
  employee: Pick<Employee, 'id' | 'name' | 'email'>
  access: Pick<Access, 'write'>
}

export interface Props extends FormComponentProps {
  onSubmit: (bookmark: Bookmark, onDone?: () => void) => void
  loading?: boolean
  bookmark?: BookmarkPick
  SkillTreeSelect: any
}

const BookmarkForm = ({ form, onSubmit, bookmark, loading, SkillTreeSelect }: Props) => {
  const { getFieldDecorator } = form

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({
          id: bookmark?.id,
          ...values,
          skills: values.skills?.map((i: any) => i.id),
        })
      }
    })
  }

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Title">
            {getFieldDecorator('title', {
              initialValue: bookmark?.title,
              rules: [
                {
                  required: true,
                  message: 'Please enter title',
                },
              ],
            })(<Input onPressEnter={handleSubmit} placeholder="Enter bookmark title" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Form.Item label="Link">
            {getFieldDecorator('link', {
              initialValue: bookmark?.link,
              rules: [
                {
                  required: true,
                  pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                  message: 'Please enter correct link',
                },
              ],
            })(
              <Input.TextArea
                rows={4}
                onPressEnter={handleSubmit}
                placeholder="Enter bookmark link"
              />,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        {getFieldDecorator('skills', {
          initialValue: bookmark?.skills,
        })(<SkillTreeSelect />)}
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

export default Form.create<Props>({ name: 'bookmark_form' })(BookmarkForm)

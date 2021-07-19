import React from 'react'
import { Form, Input, Button } from 'antd'
import message from '../../message'
import { useReplyHobbyPostMutation } from '../../queries/hobbyPosts'

type FormFields = {
  comment: string
}

type Props = {
  postId: string
}

export default function ReplyHobbyPost({ postId }: Props) {
  const [form] = Form.useForm<FormFields>()

  const [reply, { loading }] = useReplyHobbyPostMutation({
    onCompleted: () => {
      message.success('Your reply has been sent')
      form.resetFields()
    },
    onError: message.error,
  })

  const onFinish = (values: FormFields) => {
    reply({
      variables: { input: { postId, body: values.comment } },
    })
  }

  return (
    <Form name={`post-${postId}`} labelCol={{ span: 4 }} form={form} onFinish={onFinish}>
      <Form.Item
        name="comment"
        rules={[
          {
            required: true,
            min: 3,
            max: 500,
            message: 'Text must be greater than 3 and less than 500 characters',
          },
        ]}
        style={{ marginBottom: 8 }}
      >
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 20 }} placeholder="Add comment..." />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Send comment
      </Button>
    </Form>
  )
}

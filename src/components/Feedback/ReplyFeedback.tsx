import React from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { replyFeedback } from '../../queries/feedback'
import message from '../../message'

export const FeedbackReplyForm = ({ feedbackId }: { feedbackId: string }) => {
  const [form] = Form.useForm()

  const [replyOnFeedback, { loading }] = useMutation(replyFeedback, {
    onCompleted: () => {
      message.success('Your reply has been sent')
      form.resetFields()
    },
    // TODO: update apollo cache
    // refetchQueries: ['getFeedbacks'],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  const onFinish = (values: any) => {
    replyOnFeedback({
      variables: { input: { feedbackId, ...values } },
    })
  }

  return (
    <Form labelCol={{ span: 4 }} name="addFeedbackForm" form={form} onFinish={onFinish}>
      <Form.Item
        name="text"
        rules={[
          {
            required: true,
            min: 15,
            max: 500,
            message: 'Text must be greater than 15 and less than 500 characters',
          },
        ]}
        style={{ marginBottom: 8 }}
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 20 }}
          placeholder="What do you want to say?"
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Reply
        </Button>
      </Form.Item>
    </Form>
  )
}

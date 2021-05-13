import { gql } from "@apollo/client";
import React from 'react'
import { Button, Form, Input } from 'antd'
import { useReplyFeedbackMutation } from '../../queries/feedback'
import { Feedback } from '../../types/graphql'
import message from '../../message'

type FeedbackWithCommentsFragmentType = Pick<Feedback, 'comments'>

const feedbackWithCommentsFragment = gql`
  fragment FeedbackWithComments on Feedback {
    comments {
      id
    }
  }
`

export const FeedbackReplyForm = ({
  feedbackId,
  onClose,
}: {
  feedbackId: string
  onClose: () => void
}) => {
  const [form] = Form.useForm()

  const [replyOnFeedback, { loading }] = useReplyFeedbackMutation({
    onCompleted: () => {
      message.success('Your reply has been sent')
      onClose()
    },
    update: (cache, { data }) => {
      const cacheId = `Feedback:${feedbackId}`
      const currentFeedback = cache.readFragment<FeedbackWithCommentsFragmentType>({
        id: cacheId,
        fragment: feedbackWithCommentsFragment,
      })
      if (data?.replyFeedback && currentFeedback) {
        const comments = (currentFeedback.comments || []).concat(data.replyFeedback)
        cache.writeData({
          id: cacheId,
          data: { comments },
        })
      }
    },
    onError: message.error,
  })

  const onFinish = (values: any) => {
    replyOnFeedback({
      variables: { input: { feedbackId, ...values } },
    })
  }

  return (
    <Form labelCol={{ span: 4 }} form={form} onFinish={onFinish}>
      <Form.Item
        data-cy="feedbackMessage"
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
          data-cy="text"
          autoFocus
          autoSize={{ minRows: 1, maxRows: 20 }}
          placeholder="What do you want to say?"
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" loading={loading} data-cy="replay">
          Reply
        </Button>
        <Button onClick={onClose} disabled={loading} style={{ margin: '0 8px' }} data-cy="cancel">
          Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}

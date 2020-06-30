import React, { useState } from 'react'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import { Button, Modal, Input, Form } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useEmployee } from '../../utils/withEmployee'
import Text from 'antd/lib/typography/Text'
import message from '../../message'

const rotateRequest = gql`
  mutation rotateRequest($input: RotateRequestInput) {
    rotateRequest(input: $input) {
      id
    }
  }
`

const cancelRotateRequest = gql`
  mutation cancelRotateRequest($input: CancelRotateRequestInput) {
    cancelRotateRequest(input: $input) {
      id
    }
  }
`

function Rotate({ vacancy }: { vacancy: QueryType['vacancies'][0] }) {
  const [showModal, setShowModal] = useState(false)
  const [comment, setComment] = useState('')
  const { employee } = useEmployee()

  const [rotate, { loading }] = useMutation(rotateRequest, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getVacancies }],
    onCompleted: () => {
      setShowModal(false)
      setComment('')
      message.success('Applied successfully!')
    },
  })

  const [cancelRotate, { loading: cancelLoading }] = useMutation(cancelRotateRequest, {
    variables: { input: { id: vacancy.id, candidate: employee.id } },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getVacancies }],
    onCompleted: () => {
      message.success('Cancelled!')
    },
  })

  const isRotating = vacancy.rotateEmployees?.find(i => i.isMe)

  if (isRotating) {
    return (
      <Button icon="retweet" loading={cancelLoading} onClick={() => cancelRotate()}>
        Cancel rotation
      </Button>
    )
  }

  return (
    <>
      <Button icon="retweet" onClick={() => setShowModal(true)}>
        Want to Rotate
      </Button>
      <Modal
        title="Why you want to rotate?"
        visible={showModal}
        okButtonProps={{
          disabled: !comment,
          loading,
        }}
        onOk={() => {
          rotate({
            variables: {
              input: {
                comment,
                id: vacancy.id,
                candidate: employee.id,
              },
            },
          })
        }}
        onCancel={() => {
          setShowModal(false)
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <Text>Comment</Text>
        </div>
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></Input.TextArea>
      </Modal>
    </>
  )
}

export default Rotate

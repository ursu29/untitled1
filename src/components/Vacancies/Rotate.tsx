import { useMutation } from '@apollo/react-hooks'
import { RetweetOutlined } from '@ant-design/icons'
import { Button, Input, Modal } from 'antd'
import Text from 'antd/lib/typography/Text'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import message from '../../message'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import { useEmployee } from '../../utils/withEmployee'

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
      <Button icon={<RetweetOutlined />} loading={cancelLoading} onClick={() => cancelRotate()}>
        Cancel rotation
      </Button>
    )
  }

  return (
    <>
      <Button icon={<RetweetOutlined />} onClick={() => setShowModal(true)}>
        Want to Rotate
      </Button>
      <Modal
        title="Want to rotate"
        visible={showModal}
        okButtonProps={{
          disabled: !comment,
          loading,
        }}
        okText="Send"
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
          <Text>
            Thanks for response! Your request will be sent to HR Team and Management, they'll
            contact you and describe further steps to rotation
          </Text>
          <Text style={{ fontWeight: 'bold', display: 'block', marginTop: 8 }}>
            Please describe one or several reasons why you want to rotate
          </Text>
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

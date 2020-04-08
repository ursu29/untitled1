import React from 'react'
import getVacancies, { QueryType } from '../../queries/getVacancies'
import { Button } from 'antd'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useEmployee } from '../../utils/employee'

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
  const { employee } = useEmployee()
  const [rotate] = useMutation(rotateRequest, {
    variables: { input: { id: vacancy.id, candidate: employee.id } },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getVacancies }],
  })

  const [cancelRotate] = useMutation(cancelRotateRequest, {
    variables: { input: { id: vacancy.id, candidate: employee.id } },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getVacancies }],
  })

  const isRotating = vacancy.rotateEmployees?.find(i => i.isMe)

  if (isRotating) {
    return (
      <Button icon="retweet" onClick={() => cancelRotate()}>
        Cancel rotation
      </Button>
    )
  }

  return (
    <Button icon="retweet" onClick={() => rotate()}>
      Rotate
    </Button>
  )
}

export default Rotate

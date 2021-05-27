import { useMutation, gql } from '@apollo/client'
import React, { useState } from 'react'
import message from '../../message'
import getMatrices from '../../queries/getMatrices'
import { MatrixGrade } from '../../types'
import MatrixDrawer from '../UI/MatrixDrawer'

const mutation = gql`
  mutation CreateMatrix($input: CreateMatrixInput) {
    createMatrix(input: $input) {
      id
    }
  }
`

type MutationType = {
  createMatrix: {
    id: string
  }
}

interface Props {}

export default function CreateMatrixGrade(props: Props) {
  const [matrix, setMatrix] = useState<MatrixGrade | undefined>(undefined)
  const [mutate, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getMatrices }],
    onError: message.error,
    onCompleted: () => message.success('Matrix created successfully'),
  })
  return (
    <MatrixDrawer
      togglerLabel="Create matrix"
      icon="edit"
      drawerLabel="Create a matrix"
      data={matrix}
      loading={loading}
      onSubmit={(matrix, onDone) => {
        setMatrix(matrix)
        mutate({
          variables: {
            input: matrix,
          },
          update: onDone,
        })
      }}
    />
  )
}

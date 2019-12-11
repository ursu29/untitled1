import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import getMatrices from '../../queries/getMatrices'
import getMatrix from '../../queries/getMatrix'
import { Matrix, MatrixGrade } from '../../types'
import MatrixDrawer from '../UI/MatrixDrawer'
import message from '../../message'

const mutation = gql`
  mutation CreateMatrixGrade($input: CreateMatrixGradeInput) {
    createMatrixGrade(input: $input) {
      id
    }
  }
`

type MutationType = {
  createMatrixGrade: {
    id: string
  }
}

interface Props {
  matrix?: Matrix
}

export default function CreateMatrixGrade({ matrix }: Props) {
  const [grade, setGrade] = useState<MatrixGrade | undefined>(undefined)
  const [mutate, { loading, error }] = useMutation<MutationType>(mutation, {
    refetchQueries: [
      { query: getMatrices },
      { query: getMatrix, variables: { input: { id: matrix?.id } } },
    ],
    onError: message.error,
    onCompleted: () => message.success('Grade id added'),
  })
  if (!matrix) return null
  return (
    <MatrixDrawer
      togglerLabel="Add grade "
      // icon="edit"
      drawerLabel={'Cerate a matrix grade for a matrix ' + matrix.title}
      data={grade}
      loading={loading}
      onSubmit={(grade, onDone) => {
        setGrade(grade)
        mutate({
          variables: {
            input: {
              matrixId: matrix.id,
              ...grade,
            },
          },
          update: onDone,
        })
      }}
    />
  )
}

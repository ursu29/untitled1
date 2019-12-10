import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import getMatrices from '../../queries/getMatrices'
import { Matrix, MatrixGrade } from '../../types'
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
  const [mutate, { loading, error }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getMatrices }],
    onError: () => {
      console.info('updateSkill error', error)
    },
  })
  return (
    <MatrixDrawer
      togglerLabel="Create matrix"
      icon="edit"
      drawerLabel={'Cerate a matrix'}
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

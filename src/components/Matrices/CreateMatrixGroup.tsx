import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import getMatrices from '../../queries/getMatrices'
import { Matrix, MatrixGrade } from '../../types'
import MatrixDrawer from '../UI/MatrixDrawer'

const mutation = gql`
  mutation CreateMatrixGroup($input: CreateMatrixGroupInput!) {
    createMatrixGroup(input: $input) {
      id
    }
  }
`

type MutationType = {
  createMatrixGroup: {
    id: string
  }
}

interface Props {
  matrix?: Matrix
}

export default function CreateMatrixGroup({ matrix }: Props) {
  const [group, setGroup] = useState<MatrixGrade | undefined>(undefined)
  const [mutate, { loading, error }] = useMutation<MutationType>(mutation, {
    refetchQueries: [
      { query: getMatrices },
      { query: getMatrices, variables: { input: { id: matrix?.id } } },
    ],
    onError: () => {
      console.info('updateSkill error', error)
    },
  })

  if (!matrix) return null

  return (
    <MatrixDrawer
      togglerLabel="Add group"
      // icon="edit"
      drawerLabel={'Cerate a matrix group for a matrix ' + matrix.title}
      data={group}
      loading={loading}
      onSubmit={(group, onDone) => {
        setGroup(group)
        mutate({
          variables: {
            input: {
              matrixId: matrix.id,
              ...group,
            },
          },
          update: onDone,
        })
      }}
    />
  )
}

import { useMutation, gql } from "@apollo/client";
import React, { useState } from 'react'
import getMatrices from '../../../queries/getMatrices'
import getMatrix from '../../../queries/getMatrix'
import { Matrix, MatrixGrade } from '../../../types'
import MatrixDrawer from '../../UI/MatrixDrawer'
import message from '../../../message'

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
  const [mutate, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [
      { query: getMatrices },
      { query: getMatrix, variables: { input: { id: matrix?.id } } },
    ],
    onError: message.error,
    onCompleted: () => message.success('Group id added'),
  })

  if (!matrix) return null

  return (
    <MatrixDrawer
      togglerLabel="Add group"
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

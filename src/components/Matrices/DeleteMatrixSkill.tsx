import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import getMatrix from '../../queries/getMatrix'
import { Matrix, Skill } from '../../types'
import SkillTag from '../UI/SkillTag'

const mutation = gql`
  mutation DeleteMatrixSkill($input: DeleteMatrixSkillInput) {
    deleteMatrixSkill(input: $input) {
      id
    }
  }
`

type MutationType = {
  addMatrixGrade: {
    id: string
  }
}

interface Props {
  matrix: Matrix
  skill: Skill
  editable: boolean
}

export default function CreateMatrixGrade({ matrix, skill, editable }: Props) {
  const [mutate, { loading, error }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getMatrix, variables: { input: { id: matrix?.id } } }],
    onError: () => {
      console.info('updateSkill error', error)
    },
  })
  if (!matrix) return null
  return (
    <SkillTag
      closable={editable}
      clickable
      skill={skill}
      onClose={() => {
        mutate({
          variables: {
            input: {
              id: skill.id,
              matrix: matrix.id,
            },
          },
        })
      }}
    />
  )
}

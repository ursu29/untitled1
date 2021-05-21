import { useMutation, gql } from "@apollo/client";
import React from 'react'
import getMatrix from '../../../queries/getMatrix'
import { Matrix, Skill } from '../../../types'
import SkillTag from '../../Skills/SkillTag'
import message from '../../../message'

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
  const [mutate] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getMatrix, variables: { input: { id: matrix?.id } } }],
    onError: message.error,
    onCompleted: () => message.success('Skill is deleted'),
  })
  if (!matrix) return null
  return (
    <SkillTag
      closable={editable}
      clickable
      skill={skill}
      style={{ marginRight: 0, width: '100%' }}
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

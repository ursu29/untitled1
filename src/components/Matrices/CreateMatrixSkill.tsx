import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import getMatrices from '../../queries/getMatrices'
import { Matrix, Skill, MatrixGrade, MatrixGroup } from '../../types'
import MatrixDrawer from '../UI/MatrixDrawer'
import SkillSelect from '../Skills/SkillSelect'
import Button from '../UI/Button'

const mutation = gql`
  mutation CreateMatrixSkill($input: CreateMatrixSkillInput) {
    createMatrixSkill(input: $input) {
      id
    }
  }
`

type MutationType = {
  createMatrixSkill: {
    id: string
  }
}

interface Props {
  matrix?: Matrix
  grade: MatrixGrade
  group: MatrixGroup
}

type SkillPick = Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>

const SkillSelector = ({ onSelect }: { onSelect: (skill: SkillPick) => any }) => {
  const [adding, toggleAdding] = useState(false)
  if (adding) {
    return (
      <SkillSelect
        allowAddNew
        autoFocus
        matrixSkillsOnly
        onBlur={() => {
          toggleAdding(false)
        }}
        onSelect={(skill: SkillPick) => {
          toggleAdding(false)
          onSelect(skill)
        }}
      />
    )
  }
  return (
    <Button type="dashed" size="small" onClick={() => toggleAdding(true)}>
      Add skill
    </Button>
  )
}

export default function CreateMatrixSkill({ matrix, grade, group }: Props) {
  const [mutate, { loading, error }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getMatrices, variables: { input: { id: matrix?.id } } }],
    onError: () => {
      console.info('updateSkill error', error)
    },
  })
  if (!matrix) return null
  return (
    <SkillSelector
      onSelect={skill => {
        mutate({
          variables: {
            input: {
              matrixId: matrix.id,
              skillId: skill.id,
              gradeId: grade.id,
              groupId: group.id,
            },
          },
        })
      }}
    />
  )
}

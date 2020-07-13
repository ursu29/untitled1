import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlusOutlined } from '@ant-design/icons'
import message from '../../../message'
import getMatrix from '../../../queries/getMatrix'
import { Matrix, MatrixGrade, MatrixGroup } from '../../../types'
import SkillSelect from '../../Skills/SkillSelect'
import Button from '../../UI/Button'

const AddSkillButton = styled.div`
  color: lightgray;
  &:hover {
    color: #40a9ff;
  }
`

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

const SkillSelector = ({ onSelect }: { onSelect: (skill: string) => any }) => {
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
        onChange={(skill: string) => {
          toggleAdding(false)
          onSelect(skill)
        }}
      />
    )
  }
  return (
    <AddSkillButton>
      <Button
        size="small"
        shape="circle"
        icon={<PlusOutlined />}
        style={{ color: 'inherit' }}
        onClick={() => toggleAdding(true)}
      />
    </AddSkillButton>
  )
}

export default function CreateMatrixSkill({ matrix, grade, group }: Props) {
  const [mutate, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getMatrix, variables: { input: { id: matrix?.id } } }],
    onError: message.warning,
    onCompleted: () => message.success('Skill is added'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Creating')
    }
  })

  if (!matrix) return null
  return (
    <SkillSelector
      onSelect={skill => {
        mutate({
          variables: {
            input: {
              matrixId: matrix.id,
              skillId: skill,
              gradeId: grade.id,
              groupId: group.id,
            },
          },
        })
      }}
    />
  )
}

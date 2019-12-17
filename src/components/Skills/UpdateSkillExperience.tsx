import React, { useEffect } from 'react'
import { Experience, Skill, Employee, Level } from '../../types'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import SkillLevelSelect from '../Skills/SkillLevelSelect'
import MatrixLevelSelect from '../EmployeeMatrices/MatrixLevelSelect'
import getEmployeeExperiences from '../../queries/getEmployeeExperiences'
import getExperiences from '../../queries/getExperiences'
import message from '../../message'

const createExperience = gql`
  mutation createExperience($input: CreateExperienceInput) {
    createExperience(input: $input) {
      id
    }
  }
`

const updateExperience = gql`
  mutation updateExperience($input: UpdateExperienceInput) {
    updateExperience(input: $input) {
      id
    }
  }
`

const deleteExperience = gql`
  mutation deleteExperience($input: DeleteExperienceInput) {
    deleteExperience(input: $input) {
      id
    }
  }
`

interface Props {
  experience?: {
    id: Experience['id']
    level: Pick<Level, 'id' | 'index' | 'name'>
  }
  skill?: Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeMatrixExperience({ experience, skill, employee }: Props) {
  const refetchQueries = [
    { query: getEmployeeExperiences, variables: { input: { id: employee?.id } } },
    {
      query: getExperiences,
      variables: {
        input: {
          employee: employee?.id,
          skill: skill?.id,
        },
      },
      skip: !employee || !skill,
    },
  ]

  const onCompleted = () => message.success('Skill updated')
  const onError = message.error

  const [create, { loading: createLoading }] = useMutation(createExperience, {
    refetchQueries,
    onCompleted,
    onError,
  })
  const [update, { loading: updateLoading }] = useMutation(updateExperience, {
    refetchQueries,
    onCompleted,
    onError,
  })
  const [remove, { loading: deleteLoading }] = useMutation(deleteExperience, {
    refetchQueries,
    onCompleted,
    onError,
  })

  useEffect(() => {
    if (createLoading) message.loading('Adding')
    if (updateLoading) message.loading('Updating')
    if (deleteLoading) message.loading('Removing')
  })

  if (!skill) return <div>No skill</div>
  if (!employee) return <div>Employee is not provided</div>

  console.log('skill', skill)

  const Select = skill.isMatrixOnly ? MatrixLevelSelect : SkillLevelSelect

  return (
    <Select
      loading={createLoading || updateLoading || deleteLoading}
      level={experience?.level}
      onSelect={level => {
        if (!experience) {
          create({
            variables: {
              input: {
                employee: employee.id,
                skill: skill.id,
                level: level.id,
              },
            },
          })
        } else {
          update({
            variables: {
              input: {
                id: experience.id,
                level: level.id,
              },
            },
          })
        }
      }}
      onDeselect={() => {
        if (experience) {
          remove({
            variables: { input: { id: experience.id } },
          })
        }
      }}
    />
  )
}

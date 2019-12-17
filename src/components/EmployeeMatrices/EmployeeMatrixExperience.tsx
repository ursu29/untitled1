import React, { useEffect } from 'react'
import { Experience, Skill, Employee } from '../../types'
import gql from 'graphql-tag'
import MatrixExperience from '../UI/MatrixExperience'
import { useMutation } from '@apollo/react-hooks'
import MatrixLevelSelect from './MatrixLevelSelect'
import getEmployeeExperiences from '../../queries/getEmployeeExperiences'
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
  experience?: Experience
  skill: Skill
  editable: boolean
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeMatrixExperience({ experience, skill, employee, editable }: Props) {
  const refetchQueries = [
    { query: getEmployeeExperiences, variables: { input: { id: employee?.id } } },
  ]

  const onCompleted = () => message.success('Matrix updated')
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

  if (!employee) return <div>Employee is not provided</div>

  return (
    <MatrixExperience
      skill={skill}
      experience={experience}
      matrixLevelSelect={
        editable ? (
          <MatrixLevelSelect
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
        ) : null
      }
    />
  )
}

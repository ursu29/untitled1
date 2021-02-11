import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import message from '../../message'
import getEmployeeExperiences from '../../queries/getEmployeeExperiences'
import updateExperience from '../../queries/updateExperience'
import { ArchivedMatrixRaw, Employee, Experience, LEVEL, Skill } from '../../types'
import MatrixExperience from '../Matrices/MatrixExperience'

const createExperience = gql`
  mutation createExperience($input: CreateExperienceInput) {
    createExperience(input: $input) {
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
    level: LEVEL
    comment: Experience['comment']
  }
  skill?: Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>
  editable: boolean
  employee?: Pick<Employee, 'id'>
  divClassName?: string
  type?: string
  archivedExperience?: ArchivedMatrixRaw['experiences'][0]
  isArchivedChosen?: boolean
}

export default function EmployeeMatrixExperience({
  experience,
  skill,
  employee,
  editable,
  divClassName,
  type,
  archivedExperience,
  isArchivedChosen,
}: Props) {
  const [experienceUI, setExperienceUI] = useState(experience)

  const refetchQueries = [
    { query: getEmployeeExperiences, variables: { input: { id: employee?.id } } },
  ]

  const onCompleted = () => message.success('Matrix updated')

  const onError = (err: any) => {
    message.error(err)
    setExperienceUI(experience)
  }

  const [create, { loading: createLoading }] = useMutation(createExperience, {
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted,
    onError,
  })
  const [update, { loading: updateLoading }] = useMutation(updateExperience, {
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted,
    onError,
  })
  const [remove, { loading: deleteLoading }] = useMutation(deleteExperience, {
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted,
    onError,
  })

  const onUpdateExperience = (level: any, comment: string) => {
    //@ts-ignore
    setExperienceUI({ ...experience, level, comment })

    if (!experience) {
      create({
        variables: {
          input: {
            employee: employee?.id,
            skill: skill?.id,
            level,
            comment,
          },
        },
      })
    } else {
      update({
        variables: {
          input: {
            id: experience.id,
            level,
            comment,
          },
        },
      })
    }
  }

  const onDeselectLevel = () => {
    setExperienceUI(undefined)

    if (experience) {
      remove({
        variables: { input: { id: experience.id } },
      })
    }
  }

  if (!skill) return null
  if (!employee) return <div>Employee is not provided</div>

  return (
    <MatrixExperience
      type={type}
      skill={skill}
      experience={experienceUI}
      archivedExperience={archivedExperience}
      isArchivedChosen={isArchivedChosen}
      onUpdateExperience={onUpdateExperience}
      onDeselectLevel={onDeselectLevel}
      divClassName={divClassName}
      editable={editable && !isArchivedChosen}
      loading={createLoading || updateLoading || deleteLoading}
    />
  )
}

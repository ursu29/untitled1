import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import message from '../../message'
import getEmployeeExperiences from '../../queries/getEmployeeExperiences'
import updateExperience from '../../queries/updateExperience'
import { useAddMatrixFeedbackMutation } from '../../queries/addMatrixFeedback'
import { ArchivedMatrixRaw, Employee, Experience, Skill, Matrix } from '../../types'
import MatrixExperience from '../Matrices/MatrixExperience'
import { Level } from '../../types/graphql'

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
  matrix: Matrix
  experience?: {
    id: Experience['id']
    level: Level
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
  matrix,
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
  const [addFeedback, { loading: feedbackLoading }] = useAddMatrixFeedbackMutation({
    onCompleted: () => message.success('Feedback sended'),
    onError: message.error,
  })

  const onUpdateExperience = (level: Level, comment?: string) => {
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

  const onAddFeedback = (feedback: string) => {
    addFeedback({
      variables: {
        input: {
          matrix: matrix.id,
          skill: skill!.id,
          feedback,
        },
      },
    })
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
      onAddFeedback={onAddFeedback}
      divClassName={divClassName}
      editable={editable && !isArchivedChosen}
      loading={createLoading || updateLoading || deleteLoading || feedbackLoading}
    />
  )
}

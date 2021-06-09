import React, { useState } from 'react'
import message from '../../message'
import getEmployeeExperiences from '../../queries/getEmployeeExperiences'
import { useCreateMatrixProposalMutation } from '../../queries/matrixProposals'
import {
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
  useUpdateExperienceMutation,
} from '../../queries/experience'
import { ArchivedMatrixRaw, Employee, Experience, Skill, Matrix } from '../../types'
import MatrixExperience from '../Matrices/MatrixExperience'
import { Level } from '../../types/graphql'

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

  const [create, { loading: createLoading }] = useCreateExperienceMutation({
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted,
    onError,
  })
  const [update, { loading: updateLoading }] = useUpdateExperienceMutation({
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted,
    onError,
  })
  const [remove, { loading: deleteLoading }] = useDeleteExperienceMutation({
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted,
    onError,
  })
  const [proposeChanges, { loading: proposeChangesLoading }] = useCreateMatrixProposalMutation({
    onCompleted: () => message.success('Proposal was sent to the matrix owner'),
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
            skill: skill!.id,
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

  const onProposeChanges = (proposal: string) => {
    const cellId = matrix.body?.skills?.find((e: any) => e?.skill?.id === skill?.id)?.id

    if (!cellId) {
      message.error('Cannot find cell id!')
      return
    }

    proposeChanges({
      variables: {
        input: {
          proposal,
          matrix: matrix.id,
          cellId,
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
      onProposeChanges={onProposeChanges}
      divClassName={divClassName}
      editable={editable && !isArchivedChosen}
      loading={createLoading || updateLoading || deleteLoading || proposeChangesLoading}
    />
  )
}

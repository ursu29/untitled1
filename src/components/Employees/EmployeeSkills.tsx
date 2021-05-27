import { useQuery, useMutation, gql } from '@apollo/client'
import React, { useEffect } from 'react'
import { Employee } from '../../types'
import { Level } from '../../types/graphql'
import query, { QueryType } from '../../queries/getEmployeeExperiences'
import { useGetLevelsQuery } from '../../queries/levels'
import Skeleton from '../UI/Skeleton'
import EmployeeSkillsDraggable from './EmployeeSkillsDraggable'
import message from '../../message'
import { useUpdateExperienceMutation } from '../../queries/experience'
import EmployeeRecommendations from './EmployeeRecommendations'

const updateExperiences = gql`
  mutation updateExperiences($input: UpdateExperiencesInput) {
    updateExperiences(input: $input) {
      id
    }
  }
`

interface Props {
  editable?: boolean
  showTabs?: boolean
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeSkills({ employee, editable = false, showTabs = false }: Props) {
  const id = employee?.id

  const { loading, data } = useQuery<QueryType>(query, {
    variables: { input: { id } },
    skip: !id,
  })
  const { loading: lLoading, data: lData } = useGetLevelsQuery({ skip: !employee })
  const [updateOne, { loading: updateOneLoading }] = useUpdateExperienceMutation({
    onCompleted: () => message.success('Skill level updated'),
    onError: message.error,
  })
  const [updateMany, { loading: updateManyLoading }] = useMutation(updateExperiences, {
    onCompleted: () => message.success('Skills updated'),
    refetchQueries: [{ query, variables: { input: { id } } }],
    onError: message.error,
  })

  useEffect(() => {
    if (updateOneLoading || updateManyLoading) {
      message.loading('Updating')
    }
  }, [updateOneLoading, updateManyLoading])

  if (!employee) return null

  const experiences = data?.employees?.[0].experiences
  const levels = lData?.levels ? [...lData.levels].reverse() : []
  const skills = experiences?.map(exp => exp.skill).filter(skill => !skill.isMatrixOnly)

  return (
    <Skeleton loading={loading || lLoading} active>
      {levels && experiences && (
        <div data-cy="allSkills">
          <EmployeeSkillsDraggable
            editable={editable}
            levels={levels}
            experiences={experiences.filter(e => !e.skill?.isMatrixOnly)}
            onMoveSkill={(id, level) =>
              updateOne({
                variables: { input: { id, level: level as Level } },
              })
            }
            onGroupUpdate={(skills, level) => {
              updateMany({
                variables: { input: { skills, level, employee: employee.id } },
              })
            }}
          />
        </div>
      )}
      {showTabs && Boolean(skills?.length) && <EmployeeRecommendations skills={skills} />}
    </Skeleton>
  )
}

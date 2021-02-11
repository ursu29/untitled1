import React, { useEffect } from 'react'
import { Employee, LEVEL } from '../../types'
import query, { QueryType } from '../../queries/getEmployeeExperiences'
import getLevels, { QueryType as LQueryType } from '../../queries/getLevels'
import Skeleton from '../UI/Skeleton'
import { useQuery, useMutation } from '@apollo/react-hooks'
import EmployeeSkillsDraggable from './EmployeeSkillsDraggable'
import gql from 'graphql-tag'
import message from '../../message'
import updateExperience from '../../queries/updateExperience'
import EmployeeRecommendations from './EmployeeRecommendations'

const updateExperiences = gql`
  mutation updateExperiences($input: UpdateExperiencesInput) {
    updateExperiences(input: $input) {
      id
    }
  }
`

interface Props {
  editable: boolean
  employee?: Pick<Employee, 'id'>
}

export default function EmployeeSkills({ employee, editable }: Props) {
  const id = employee?.id

  const { loading, data } = useQuery<QueryType>(query, {
    variables: { input: { id } },
    skip: !id,
  })
  const { loading: lLoading, data: lData } = useQuery<LQueryType>(getLevels, { skip: !employee })
  const [updateOne, { loading: updateOneLoading }] = useMutation(updateExperience, {
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
  const levels = lData?.levels
  const levelIds = levels?.filter(level => level <= LEVEL.LEARNING)
  const skills = experiences?.filter(exp => levelIds?.includes(exp.level)).map(exp => exp.skill)
  const showTabs = editable && Boolean(skills?.length)

  return (
    <Skeleton loading={loading || lLoading} active>
      {levels && experiences && (
        <div data-cy="allSkills">
          <EmployeeSkillsDraggable
            editable={editable}
            levels={levels}
            experiences={experiences.filter(e => !e.skill?.isMatrixOnly)}
            onMoveSkill={(id, level) => updateOne({ variables: { input: { id, level } } })}
            onGroupUpdate={(skills, level) => {
              updateMany({
                variables: { input: { skills, level, employee: employee.id } },
              })
            }}
          />
        </div>
      )}
      {showTabs && <EmployeeRecommendations skills={skills} />}
    </Skeleton>
  )
}

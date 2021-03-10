import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import getLevels, { QueryType as LevelsQueryType } from '../../queries/getLevels'
import { Skill, Experience, Employee, LEVEL } from '../../types'
import Skeleton from '../UI/Skeleton'
import Section from '../UI/Section'
import EmployeeTag from '../Employees/EmployeeTag'
import gql from 'graphql-tag'
import getLevelName from '../../utils/getLevelName'

const query = gql`
  query getSkillExperiences($input: SkillsInput) {
    skills(input: $input) {
      id
      experiences {
        id
        level
        employee {
          id
          name
          email
        }
      }
    }
  }
`

type ExperiencePick = {
  id: Experience['id']
  employee: Pick<Employee, 'id' | 'name' | 'email'>
  level: LEVEL
}

type SkillPick = {
  id: Skill['id']
  experiences: ExperiencePick[]
}

type QueryType = {
  skills: SkillPick[]
}

interface Props {
  skill: Pick<Skill, 'id'>
}

export default function SkillMentions(props: Props) {
  const { data, loading } = useQuery<QueryType>(query, {
    variables: { input: { id: props.skill.id } },
  })
  const { data: levelsData, loading: levelsLoading } = useQuery<LevelsQueryType>(getLevels)

  const levels = levelsData?.levels
    ? Object.assign([], levelsData.levels).reverse()
    : ([] as LEVEL[])
  const skill = data?.skills?.[0]

  return (
    <Skeleton active loading={loading || levelsLoading}>
      {levels?.map(level => {
        const levelExperiences = skill?.experiences.filter(i => i.level === level)
        return (
          <Section key={level} title={getLevelName(level)}>
            {(!levelExperiences || !levelExperiences.length) && (
              <div>No one knows that at this level</div>
            )}
            {levelExperiences
              ?.filter(i => i.employee)
              .map(i => {
                return <EmployeeTag key={i.id} employee={i.employee} />
              })}
          </Section>
        )
      })}
    </Skeleton>
  )
}

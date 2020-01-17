import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import getLevels, { QueryType as LevelsQueryType } from '../../queries/getLevels'
import { Skill, Experience, Level, Employee } from '../../types'
import Skeleton from '../UI/Skeleton'
import Section from '../UI/Section'
import EmployeeTag from '../UI/EmployeeTag'
import gql from 'graphql-tag'

const query = gql`
  query getSkillExperiences($input: SkillsInput) {
    skills(input: $input) {
      id
      experiences {
        id
        level {
          id
        }
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
  level: Pick<Level, 'id'>
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

  const levels = levelsData?.levels || []
  const skill = data?.skills?.[0]

  return (
    <Skeleton active loading={loading || levelsLoading}>
      {levels
        .sort((a, b) => b.index - a.index)
        .map(level => {
          const levelExperiences = skill?.experiences.filter(i => i.level.id === level.id)
          return (
            <Section key={level.id} title={level.name}>
              {(!levelExperiences || !levelExperiences.length) && (
                <div>No one knows that at this level</div>
              )}
              {levelExperiences?.map(i => {
                return <EmployeeTag employee={i.employee} />
              })}
            </Section>
          )
        })}
    </Skeleton>
  )
}

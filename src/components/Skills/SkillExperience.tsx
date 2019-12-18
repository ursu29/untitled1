import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import Section from '../UI/Section'
import { Skill, Employee } from '../../types'
import gql from 'graphql-tag'
import getExperiences, { QueryType } from '../../queries/getExperiences'
import getSkills, { QueryType as SkillsQueryType } from '../../queries/getSkills'
import UpdateSkillExperience from './UpdateSkillExperience'

interface SkillExperienceProps {
  skill?: SkillsQueryType['skills'][0]
  employee: Pick<Employee, 'id'>
}

function SkillExperience(props: SkillExperienceProps) {
  const { data, loading } = useQuery<QueryType>(getExperiences, {
    variables: {
      input: {
        employee: props.employee.id,
        skill: props.skill?.id,
      },
    },
    skip: !props.skill,
  })

  const experience = data?.experiences[0]
  const skill = props.skill

  return (
    <Skeleton loading={loading} line={true}>
      <UpdateSkillExperience experience={experience} skill={skill} employee={props.employee} />
    </Skeleton>
  )
}

const profileQuery = gql`
  {
    profile {
      id
    }
  }
`

interface Props {
  skill: Pick<Skill, 'id'>
}

export default function PreloadDetails({ skill }: Props) {
  const { data, loading, error } = useQuery<{ profile: Pick<Employee, 'id'> }>(profileQuery)
  const { data: skillData, loading: skillLoading, error: skillLoadingError } = useQuery<
    SkillsQueryType
  >(getSkills, {
    variables: { input: { id: skill.id } },
  })

  if (error || skillLoadingError) return <div>Error :(</div>

  if (!loading && !data?.profile) return <div>Employee is not found</div>

  return (
    <Skeleton loading={loading || skillLoading} avatar>
      <Section title="My level">
        {data?.profile && <SkillExperience skill={skillData?.skills[0]} employee={data.profile} />}
      </Section>
    </Skeleton>
  )
}

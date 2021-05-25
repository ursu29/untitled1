import { useQuery } from "@apollo/client";
import React from 'react'
import Skeleton from '../UI/Skeleton'
import Section from '../UI/Section'
import { Skill, Employee } from '../../types'
import getExperiences, { QueryType } from '../../queries/getExperiences'
import {
  useGetSkillsQuery,
  GetSkillsQuery,
  GetSkillExperiencesDocument,
} from '../../queries/skills'
import { ArrayElement } from '../../utils/types'
import { useEmployee } from '../../utils/withEmployee'
import UpdateSkillExperience from './UpdateSkillExperience'

interface SkillExperienceProps {
  skill?: ArrayElement<GetSkillsQuery['skills']>
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
      <UpdateSkillExperience
        experience={experience}
        skill={skill}
        employee={props.employee}
        refetchQueries={[
          { query: GetSkillExperiencesDocument, variables: { input: { id: props?.skill?.id } } },
        ]}
      />
    </Skeleton>
  )
}

interface Props {
  skill: Pick<Skill, 'id'>
}

export default function PreloadDetails({ skill }: Props) {
  const { employee } = useEmployee()
  const { data: skillData, loading: skillLoading, error: skillLoadingError } = useGetSkillsQuery({
    variables: { input: { id: skill.id } },
  })

  if (skillLoadingError) return <div>Error :(</div>

  if (!employee) return <div>Employee is not found</div>

  return (
    <Skeleton loading={skillLoading} avatar>
      <Section title="My level" data-cy="level">
        <SkillExperience skill={skillData?.skills?.[0]} employee={employee} />
      </Section>
    </Skeleton>
  )
}

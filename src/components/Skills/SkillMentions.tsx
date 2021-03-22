import React from 'react'
import Skeleton from '../UI/Skeleton'
import Section from '../UI/Section'
import EmployeeTag from '../Employees/EmployeeTag'
import { getLevelName } from '../../utils/getLevelName'
import { useGetSkillExperiencesQuery } from '../../queries/skills'
import { useGetLevelsQuery } from '../../queries/levels'
import { Skill } from '../../types/graphql'

interface Props {
  skill: Pick<Skill, 'id'>
}

export default function SkillMentions(props: Props) {
  const { data, loading } = useGetSkillExperiencesQuery({
    variables: { input: { id: props.skill.id } },
  })
  const { data: levelsData, loading: levelsLoading } = useGetLevelsQuery()

  const levels = levelsData?.levels ? [...levelsData.levels].reverse() : []
  const skill = data?.skills?.[0]

  return (
    <Skeleton active loading={loading || levelsLoading}>
      {levels?.map(level => {
        const levelExperiences = skill?.experiences?.filter(i => i.level === level)
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

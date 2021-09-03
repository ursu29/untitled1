import React from 'react'
import Skeleton from '../UI/Skeleton'
import Section from '../UI/Section'
import EmployeeTag from '../Employees/EmployeeTag'
import { getLevelName } from '../../utils/getLevelName'
import { useGetSkillExperiencesQuery } from '../../queries/skills'
import { useGetLevelsQuery } from '../../queries/levels'
import { Skill } from '../../types/graphql'
import RichText from '../UI/RichText'
import styled from 'styled-components'

const SectionTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
`

const CustomSection = styled.div`
  margin-bottom: 14px;
`

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
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', paddingRight: 40 }}>
        {/*description*/}
        {skill?.description && (
          <CustomSection>
            <SectionTitle>Description</SectionTitle>
            <p>{skill?.description}</p>
          </CustomSection>
        )}
        {/*acceptance criteria*/}
        {skill?.acceptanceCriteria && (
          <CustomSection>
            <SectionTitle>Acceptance criteria</SectionTitle>
            <RichText text={skill?.acceptanceCriteria} />
          </CustomSection>
        )}
        {skill?.sources && (
          <CustomSection>
            <div>Sources:</div>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <a href={skill.sources} target="_blank" rel="noreferrer">
                {skill.sources}
              </a>
            </div>
          </CustomSection>
        )}
        {/*Additional sources*/}
        {skill?.additionalSources?.length && !!skill?.additionalSources?.join('') && (
          <CustomSection>
            <div>Additional sources:</div>
            {skill?.additionalSources.map((link, index) => (
              <div
                style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                key={index + (link || '')}
              >
                <a href={link || ''} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </div>
            ))}
          </CustomSection>
        )}
      </div>
      <Skeleton active loading={loading || levelsLoading} style={{ marginLeft: 'auto' }}>
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
    </div>
  )
}

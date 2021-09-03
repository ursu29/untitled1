import React from 'react'
import { MatrixSkillPick } from './MatrixExperience'
import RichText from '../UI/RichText'
import styled from 'styled-components'
import TextArea from 'antd/es/input/TextArea'
import { Experience } from '../../types'
import { Level } from '../../types/graphql'
import { debounce } from 'throttle-debounce'
import { DEBOUNCE_DELAY } from '../../constants'

type Props = {
  skill: MatrixSkillPick
  experience?: {
    id: Experience['id']
    level: Level
    comment: Experience['comment']
  }
  onUpdateExperience: (level: Level, comment?: string) => void
}

const SectionTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
`

const Section = styled.div`
  margin-bottom: 14px;
`

export const MatrixSkillPopover = ({ skill, experience, onUpdateExperience }: Props) => {
  const handleCommentUpdate = debounce(
    DEBOUNCE_DELAY.FORM_INPUT,
    (level: Level, comment?: string) => {
      onUpdateExperience(level, comment)
    },
  )

  return (
    <>
      <div style={{ width: 400 }}>
        {/*description*/}
        {skill.description && (
          <Section>
            <SectionTitle>Description</SectionTitle>
            <p>{skill.description}</p>
          </Section>
        )}
        {/*acceptance criteria*/}
        {skill.acceptanceCriteria && (
          <Section>
            <SectionTitle>Acceptance criteria</SectionTitle>
            <RichText text={skill.acceptanceCriteria} />
          </Section>
        )}
        {/*notes*/}
        <Section>
          <div style={{ fontSize: 12 }}>Notes</div>
          <TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            rows={4}
            defaultValue={experience?.comment || ''}
            onChange={e =>
              handleCommentUpdate(experience?.level || Level.Wanted, e.target.value || '')
            }
          />
        </Section>
        {/*sources*/}
        {skill.sources && (
          <Section>
            <div>Sources:</div>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <a href={skill.sources} target="_blank" rel="noreferrer">
                {skill.sources}
              </a>
            </div>
          </Section>
        )}
        {/*Additional sources*/}
        {skill.additionalSources?.length && (
          <Section>
            <div>Additional sources:</div>
            {skill.additionalSources.map((link, index) => (
              <div
                style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                key={index + link}
              >
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </div>
            ))}
          </Section>
        )}
      </div>
    </>
  )
}

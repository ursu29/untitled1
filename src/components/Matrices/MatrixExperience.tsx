import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { LinkOutlined } from '@ant-design/icons'
import { Tooltip, Spin } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import getLevels, { QueryType } from '../../queries/getLevels'
import { MatrixCell } from './styled'
import { Skill, Level, Experience, ArchivedMatrixRaw } from '../../types'
import { CircleButton, circleButtonsPallette } from './CircleButton'
import { getSkillLink } from '../../paths'

const Card = styled.div<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  position: relative;
  border-radius: 4px;
  padding: 14px;
  margin: 0 0 16px 0;
  &:hover {
    .link_to_skill {
      filter: opacity(1);
      visibility: visible;
    }
  }
`

const Link = styled.div<{ visible?: boolean }>`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  filter: opacity(0);
  visibility: hidden;
  transition: 0.3s visibility, 0.2s filter;
`

interface Props {
  skill: Pick<Skill, 'id' | 'name' | 'description'>
  experience?: {
    id: Experience['id']
    level: Pick<Level, 'id' | 'index' | 'name'>
  }
  archivedExperience?: ArchivedMatrixRaw['experiences'][0]
  isArchivedChosen?: boolean
  onSelectLevel: any
  onDeselectLevel: any
  divClassName?: string
  editable: boolean
  type?: string
  loading?: boolean
}

const getName = (index: number) => {
  const names: any = {
    0: 'Unknown',
    1: 'Theoretical knowledge',
    2: 'Practical knowledge',
    3: 'Practical knowledge',
  }
  return names[index] || '?'
}

function MatrixExperience({
  skill,
  experience,
  archivedExperience,
  isArchivedChosen,
  onSelectLevel,
  onDeselectLevel,
  divClassName,
  editable,
  history,
  type,
  loading,
}: Props & RouteComponentProps) {
  const { data } = useQuery<QueryType>(getLevels)

  const filteredLevels = data?.levels
    .sort((a, b) => a.index - b.index)
    .filter(level => level.index !== 3)
    .map(level => {
      return {
        ...level,
        name: getName(level.index),
      }
    })

  let backgroundColor = 'rgba(0, 0, 0, 0.04)'
  if (experience) {
    if (experience.level.index === 1) {
      backgroundColor = 'rgba(242, 201, 76, 0.3)'
    }
    if (experience.level.index > 1) {
      backgroundColor = 'rgba(21, 225, 127, 0.3)'
    }
  }

  if (archivedExperience && isArchivedChosen && data) {
    const levelIndex = data.levels.find(level => level.id === archivedExperience.level)?.index

    if (levelIndex && levelIndex === 1) {
      backgroundColor = 'rgba(242, 201, 76, 0.3)'
    }
    if (levelIndex && levelIndex > 1) {
      backgroundColor = 'rgba(21, 225, 127, 0.3)'
    }
  }

  if (archivedExperience === null && isArchivedChosen) backgroundColor = 'rgba(0, 0, 0, 0.04)'

  return (
    <Tooltip title={skill.description} placement="left" mouseEnterDelay={0.5}>
      <Card
        backgroundColor={type !== 'space_boilerplate' ? backgroundColor : 'transparent'}
        className={divClassName}
      >
        {type !== 'space_boilerplate' ? (
          <>
            <MatrixCell>{skill.name}</MatrixCell>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: '14px',
              }}
            >
              <Link className="link_to_skill" onClick={() => history.push(getSkillLink(skill.id))}>
                <LinkOutlined />
              </Link>
              {loading ? (
                <div style={{ position: 'absolute', right: '30px', bottom: '10px' }}>
                  <Spin />
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  {editable &&
                    circleButtonsPallette.map((button, i) => (
                      <CircleButton
                        key={i}
                        backgroundColor={button.backgroundColor}
                        borderColor={button.borderColor}
                        isActive={experience?.level.index ? i === experience?.level.index : i === 0}
                        isHovered
                        onClick={() => {
                          if (i === experience?.level.index) return
                          i === 0
                            ? onDeselectLevel()
                            : onSelectLevel(filteredLevels?.find(level => level.index === i))
                        }}
                      />
                    ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div></div>
        )}
      </Card>
    </Tooltip>
  )
}

export default withRouter(MatrixExperience)

import React, { useState } from 'react'
import { LinkOutlined, MessageOutlined } from '@ant-design/icons'
import { Tooltip, Spin } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Level } from '../../types/graphql'
import { MatrixCell } from './styled'
import { Skill, Experience, ArchivedMatrixRaw } from '../../types'
import { CircleButton, circleButtonsPallette } from './CircleButton'
import { getSkillLink } from '../../paths'
import CommentModal from '../UI/CommentModal'

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
    .card_button {
      filter: opacity(1);
      visibility: visible;
    }
  }
`

const Link = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  color: lightgray;
  filter: opacity(0);
  visibility: hidden;
  transition: 0.3s visibility, 0.2s filter;
  :hover {
    color: gray;
  }
`

const Comment = styled.div<{ active: boolean }>`
  margin-bottom: -5px;
  cursor: pointer;
  color: ${props => (props.active ? 'gray' : 'lightgray')};
  filter: ${props => (props.active ? 'opacity(1)' : 'opacity(0)')};
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  transition: 0.3s visibility, 0.2s filter;
  :hover {
    color: gray;
  }
`

const getBGColorByLevel = (level?: Level) => {
  switch (level) {
    case Level.Learning:
      return 'rgba(242, 201, 76, 0.3)'
    case Level.Experienced:
    case Level.Confident:
      return 'rgba(21, 225, 127, 0.3)'
    case Level.Wanted:
    default:
      return 'rgba(0, 0, 0, 0.04)'
  }
}

interface Props {
  skill: Pick<Skill, 'id' | 'name' | 'description'>
  experience?: {
    id: Experience['id']
    level: Level
    comment: Experience['comment']
  }
  archivedExperience?: ArchivedMatrixRaw['experiences'][0]
  isArchivedChosen?: boolean
  onUpdateExperience: (level: Level, comment?: string) => void
  onDeselectLevel: () => void
  divClassName?: string
  editable: boolean
  type?: string
  loading?: boolean
}

function MatrixExperience({
  skill,
  experience,
  archivedExperience,
  isArchivedChosen,
  onUpdateExperience,
  onDeselectLevel,
  divClassName,
  editable,
  history,
  type,
  loading,
}: Props & RouteComponentProps) {
  const initialCommentModal = {
    visible: false,
    comment: '',
  }
  const [addCommentModal, setAddCommentModal] = useState(initialCommentModal)

  const currentLevel = isArchivedChosen ? archivedExperience?.level : experience?.level
  const backgroundColor = getBGColorByLevel(currentLevel)

  return (
    <>
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
                <Link className="card_button" onClick={() => history.push(getSkillLink(skill.id))}>
                  <Tooltip title={'Link'} placement="bottom">
                    <LinkOutlined />
                  </Tooltip>
                </Link>

                <Comment
                  active={isArchivedChosen ? !!archivedExperience?.comment : !!experience?.comment}
                  className="card_button"
                  onClick={() => {
                    if (isArchivedChosen) return
                    setAddCommentModal({
                      ...initialCommentModal,
                      visible: true,
                      comment: experience?.comment || '',
                    })
                  }}
                >
                  {isArchivedChosen ? (
                    archivedExperience?.comment && (
                      <Tooltip
                        title={archivedExperience.comment}
                        overlayClassName="styled_tooltip"
                        placement="bottom"
                        color="white"
                      >
                        <MessageOutlined />
                      </Tooltip>
                    )
                  ) : (
                    <Tooltip
                      title={experience?.comment ? experience?.comment : 'Leave a comment'}
                      overlayClassName={experience?.comment ? 'styled_tooltip' : ''}
                      placement="bottom"
                      color={experience?.comment ? 'white' : ''}
                    >
                      <MessageOutlined />
                    </Tooltip>
                  )}
                </Comment>

                <div>
                  {loading ? (
                    <div style={{ width: '75px' }}>
                      <div style={{ position: 'absolute', right: '30px', bottom: '10px' }}>
                        <Spin />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'flex-end', width: '75px' }}>
                      {editable &&
                        circleButtonsPallette.map(button => (
                          <CircleButton
                            key={button.level}
                            backgroundColor={button.backgroundColor}
                            borderColor={button.borderColor}
                            isActive={
                              experience?.level
                                ? experience?.level === button.level
                                : button.level === Level.Wanted
                            }
                            isHovered
                            onClick={() => {
                              if (experience?.level === button.level) return
                              button.level === Level.Wanted && !experience?.comment
                                ? onDeselectLevel()
                                : onUpdateExperience(button.level, experience?.comment)
                            }}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div />
          )}
        </Card>
      </Tooltip>

      <CommentModal
        title="Comment"
        visible={addCommentModal.visible}
        onOk={() => {
          //@ts-ignore
          const comment = document.getElementById('comment_text_area')?.value

          if (!comment && !addCommentModal.comment) return

          onUpdateExperience(experience?.level || Level.Wanted, comment || '')
          setAddCommentModal(initialCommentModal)
        }}
        onCancel={() => setAddCommentModal(initialCommentModal)}
        defaultComment={addCommentModal.comment}
      />
    </>
  )
}

export default withRouter(MatrixExperience)

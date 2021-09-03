import React, { useState } from 'react'
import { MessageOutlined, BulbOutlined } from '@ant-design/icons'
import { Tooltip, Spin, Popover } from 'antd'
import styled from 'styled-components'
import { Level } from '../../types/graphql'
import { MatrixCell } from './styled'
import { Skill, Experience, ArchivedMatrixRaw } from '../../types'
import { CircleButton, circleButtonsPallette } from './CircleButton'
import CommentModal from '../UI/CommentModal'
import { MatrixSkillPopover } from './MatrixSkillPopover'

const CardButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: lightgray;
  filter: opacity(0);
  visibility: hidden;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 16px;
  transition: 0.3s visibility, 0.2s filter;
  :hover {
    color: #8d8c8c;
  }
`
const CardHoveredButtons = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-width: 75px;
  visibility: hidden;
`

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
  cursor: pointer;
  &:hover {
    ${CardButton},
    ${CardHoveredButtons} {
      filter: opacity(1);
      visibility: visible;
    }
  }
`

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 14px;
`

const Comment = styled(CardButton)<{ active: boolean }>`
  color: ${props => (props.active ? 'gray' : 'lightgray')};
  filter: ${props => (props.active ? 'opacity(1)' : 'opacity(0)')};
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
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

export type MatrixSkillPick = Pick<
  Skill,
  'id' | 'name' | 'description' | 'acceptanceCriteria' | 'sources' | 'additionalSources'
>

interface Props {
  skill: MatrixSkillPick
  experience?: {
    id: Experience['id']
    level: Level
    comment: Experience['comment']
  }
  archivedExperience?: ArchivedMatrixRaw['experiences'][0]
  isArchivedChosen?: boolean
  onUpdateExperience: (level: Level, comment?: string) => void
  onDeselectLevel: () => void
  onProposeChanges: (proposal: string) => void
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
  onProposeChanges,
  divClassName,
  editable,
  type,
  loading,
}: Props) {
  const initialCommentModal = {
    visible: false,
    comment: '',
  }
  const [addCommentModal, setAddCommentModal] = useState(initialCommentModal)
  const [addFeedbackModal, setAddFeedbackModal] = useState(false)

  const currentLevel = isArchivedChosen ? archivedExperience?.level : experience?.level
  const backgroundColor = getBGColorByLevel(currentLevel)

  return (
    <>
      <Popover
        trigger={['click']}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Info
            {editable && (
              <CircleButtons
                experience={experience}
                onUpdateExperience={onUpdateExperience}
                onDeselectLevel={onDeselectLevel}
                position="right"
              />
            )}
          </div>
        }
        content={
          <MatrixSkillPopover
            skill={skill}
            experience={experience}
            onUpdateExperience={onUpdateExperience}
          />
        }
      >
        <Card
          backgroundColor={type !== 'space_boilerplate' ? backgroundColor : 'transparent'}
          className={divClassName}
        >
          {type !== 'space_boilerplate' ? (
            <>
              <MatrixCell>{skill.name}</MatrixCell>
              <CardActions>
                <Comment
                  type="button"
                  active={isArchivedChosen ? !!archivedExperience?.comment : !!experience?.comment}
                  onClick={e => {
                    e.stopPropagation()
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
                    <CardHoveredButtons>
                      {editable && (
                        <CircleButtons
                          experience={experience}
                          onUpdateExperience={onUpdateExperience}
                          onDeselectLevel={onDeselectLevel}
                        />
                      )}
                    </CardHoveredButtons>
                  )}
                </div>
                <CardButton type="button" onClick={() => setAddFeedbackModal(true)}>
                  <Tooltip title="Propose changes" placement="bottom">
                    <BulbOutlined />
                  </Tooltip>
                </CardButton>
              </CardActions>
            </>
          ) : (
            <div />
          )}
        </Card>
      </Popover>

      <CommentModal
        title="Comment"
        visible={addCommentModal.visible}
        onOk={comment => {
          if (!comment && !addCommentModal.comment) return

          onUpdateExperience(experience?.level || Level.Wanted, comment || '')
          setAddCommentModal(initialCommentModal)
        }}
        onCancel={() => setAddCommentModal(initialCommentModal)}
        defaultComment={addCommentModal.comment}
      />

      <CommentModal
        title="Propose matrix changes"
        visible={addFeedbackModal}
        onOk={comment => {
          if (!comment) return

          onProposeChanges(comment)
          setAddFeedbackModal(false)
        }}
        onCancel={() => setAddFeedbackModal(false)}
        defaultComment=""
      />
    </>
  )
}

type CircleButtonsProps = {
  experience: Props['experience']
  onDeselectLevel: Props['onDeselectLevel']
  onUpdateExperience: Props['onUpdateExperience']
  position?: 'left' | 'right'
}

export const CircleButtons: React.FC<CircleButtonsProps> = ({
  experience,
  onDeselectLevel,
  onUpdateExperience,
  position = 'left',
}) => {
  return (
    <div style={{ display: 'flex', marginLeft: position === 'left' ? 0 : 'auto' }}>
      {circleButtonsPallette.map(button => (
        <CircleButton
          key={button.level}
          backgroundColor={button.backgroundColor}
          borderColor={button.borderColor}
          isActive={
            experience?.level ? experience?.level === button.level : button.level === Level.Wanted
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
  )
}

export default MatrixExperience

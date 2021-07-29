import React, { useState } from 'react'
import { Tag, Popconfirm, Tooltip } from 'antd'
import { Skill, Level } from '../../types/graphql'
import { withRouter, RouteComponentProps } from 'react-router'
import { getSkillLink } from '../../paths'
import styled, { css } from 'styled-components'

const StyledTag = styled(Tag)<{ level?: Level | null }>`
  margin: 0 8px 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${props => {
    switch (props.level) {
      case Level.Confident:
        return css`
          background: #eafff5;
          color: #237804;
          border-color: #15e17f;
        `
      case Level.Experienced:
        return css`
          background: #fffbe6;
          color: #9b6803;
          border-color: #ffcc24;
        `
      default:
        return null
    }
  }}
`

type Props = {
  closable?: boolean
  clickable?: boolean
  skill: Pick<Skill, 'id' | 'name' | 'description'>
  level?: Level | null
  onClose?: (skill: Pick<Skill, 'id' | 'name'>) => void
  style?: any
} & RouteComponentProps

export default withRouter(
  ({ skill, level, closable, clickable = true, onClose, history, style }: Props) => {
    const [deleting, setDeleting] = useState(false)
    const toggleDeleting = () => setDeleting(!deleting)
    const handleClick = (e: any) => {
      e.preventDefault()
      if (clickable) history.push(getSkillLink(skill.id))
    }

    return (
      <Tooltip placement="left" title={skill.description}>
        <StyledTag
          closable={closable}
          level={level}
          style={style}
          onClose={(e: any) => {
            e.preventDefault()
            setDeleting(true)
          }}
        >
          <span
            style={{
              display: 'inline-block',
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            onClick={handleClick}
            title={skill.name}
          >
            {skill.name}
          </span>
          {closable && (
            <Popconfirm
              title="Confirm deleting"
              onConfirm={() => onClose && onClose(skill)}
              onVisibleChange={toggleDeleting}
              onCancel={() => setDeleting(false)}
              visible={deleting}
              okText="Yes"
              cancelText="No"
            />
          )}
        </StyledTag>
      </Tooltip>
    )
  },
)

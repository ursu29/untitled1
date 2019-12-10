import React, { useState } from 'react'
import { Tag, Popconfirm, Tooltip } from 'antd'
import { Skill } from '../../types'
import { withRouter, RouteComponentProps } from 'react-router'
import { getSkillLink } from '../../paths'

type Props = {
  closable?: boolean
  clickable?: boolean
  skill: Skill
  onClose?: (skill: Skill) => void
} & RouteComponentProps

export default withRouter(({ skill, closable, clickable = true, onClose, history }: Props) => {
  const [deleting, setDeleting] = useState(false)
  const toggleDeleting = () => setDeleting(!deleting)
  const handleClick = (e: any) => {
    e.preventDefault()
    if (clickable) history.push(getSkillLink(skill.id))
  }

  return (
    <Tooltip placement="left" title={skill.description}>
      <Tag
        closable={closable}
        style={{ marginTop: 6, marginBottom: 6, display: 'flex', alignItems: 'center' }}
        onClose={(e: any) => {
          e.preventDefault()
          setDeleting(true)
        }}
      >
        <span
          style={{
            display: 'inline-block',
            maxWidth: 120,
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
      </Tag>
    </Tooltip>
  )
})

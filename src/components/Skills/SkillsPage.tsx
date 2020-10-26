import React from 'react'
import PageContent from '../UI/PageContent'
import SkillsTree from './SkillsTree'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'

export default function SkillsPage() {
  return (
    <PageContent>
      <Typography.Title style={{ marginBottom: '40px' }}>
        Skills
        <Link to={'/stats'} style={{ fontSize: '14px', marginLeft: '20px' }}>
          Statistic
        </Link>
      </Typography.Title>
      <SkillsTree />
    </PageContent>
  )
}

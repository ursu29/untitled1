import React from 'react'
import PageContent from '../UI/PageContent'
import SkillsTree from './SkillsTree'
import { Link } from 'react-router-dom'
import PageHeader from '../UI/PageHeader'
import Helmet from '../Helmet'

export default function SkillsPage() {
  return (
    <>
      <Helmet title="Skills" />
      <PageHeader
        title="Skills"
        extra={[
          <Link to={'/stats'} style={{ fontSize: '14px', marginLeft: '20px' }}>
            Statistic
          </Link>,
        ]}
      />
      <PageContent>
        <SkillsTree />
      </PageContent>
    </>
  )
}

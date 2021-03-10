import { BookOutlined, ContainerOutlined } from '@ant-design/icons'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import paths from '../../paths'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'
import EmployeeRecommendationBookmarks from './EmployeeRecommendationBookmarks'
import EmployeeRecommendationFiles from './EmployeeRecommendationFiles'

type SkillPick = Pick<Skill, 'id'>

interface Props {
  skills?: SkillPick[]
}

const EmployeeRecommendations = ({ skills }: Props) => {
  const history = useHistory()
  const { subTab } = useParams<{ subTab: string }>()
  const handleTabChange = (nextTab: string) => {
    history.push(`${paths.PROFILE}/skills/${nextTab}`)
  }

  const tabs = [
    {
      title: 'Bookmarks',
      icon: <BookOutlined />,
      key: 'bookmarks',
      body: <EmployeeRecommendationBookmarks skills={skills} />,
    },
    {
      title: 'Files',
      icon: <ContainerOutlined />,
      key: 'files',
      body: <EmployeeRecommendationFiles skills={skills} />,
    },
  ]

  return (
    <Tabs
      tabs={tabs}
      tab={subTab}
      controlled
      noPadding
      tabsProps={{
        onTabClick: handleTabChange,
        tabBarStyle: { padding: 0 },
      }}
    />
  )
}

export default EmployeeRecommendations

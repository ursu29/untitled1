import React from 'react'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'
import EmployeeRecommendationBookmarks from './EmployeeRecommendationBookmarks'
import EmployeeRecommendationFiles from './EmployeeRecommendationFiles'
import URLAction from '../../utils/URLAction'

type SkillPick = Pick<Skill, 'id'>

interface Props {
  skills?: SkillPick[]
}

const EmployeeRecommendations = ({ skills }: Props) => {
  const urlAction = new URLAction()
  const handleTabChange = (nextTab: string) => {
    urlAction.paramsSet('recommendation', nextTab)
  }

  const tabs = [
    {
      title: 'Bookmarks',
      key: 'bookmarks',
      body: <EmployeeRecommendationBookmarks skills={skills} />,
    },
    {
      title: 'Files',
      key: 'files',
      body: <EmployeeRecommendationFiles skills={skills} />,
    },
  ]

  return (
    <Tabs
      tabs={tabs}
      tab={urlAction.paramsGet('recommendation') || tabs[0].key}
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

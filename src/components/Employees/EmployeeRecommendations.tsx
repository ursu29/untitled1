import React from 'react'
import { BookOutlined, VideoCameraOutlined, ContainerOutlined } from '@ant-design/icons'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'
import Stream from '../Stream/StreamPage'
import EmployeeRecommendationBookmarks from './EmployeeRecommendationBookmarks'
import EmployeeRecommendationFiles from './EmployeeRecommendationFiles'

type SkillPick = Pick<Skill, 'id'>

interface Props {
  skills?: SkillPick[]
}

const EmployeeRecommendations = ({ skills }: Props) => {
  const tabs = [
    {
      title: 'Bookmarks',
      icon: <BookOutlined />,
      key: 'bookmarks',
      body: <EmployeeRecommendationBookmarks skills={skills} />,
    },
    {
      title: 'Streams',
      icon: <VideoCameraOutlined />,
      key: 'streams',
      body: <Stream skills={skills} skillsFilterPartial />,
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
      noPadding
      tabsProps={{
        tabBarStyle: { padding: 0 },
      }}
    />
  )
}

export default EmployeeRecommendations

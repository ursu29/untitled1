import { BookOutlined, ContainerOutlined, TeamOutlined } from '@ant-design/icons'
import React from 'react'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'
import SkillBookmarks from './SkillBookmarks'
import SkillFiles from './SkillFiles'
import SkillMentions from './SkillMentions'

interface Props {
  tab: string
  skill: Pick<Skill, 'id'>
}

export default function SkillTabs({ skill, tab = 'mentions' }: Props) {
  const tabs = [
    {
      title: 'Mentions',
      icon: <TeamOutlined />,
      key: 'mentions',
      body: <SkillMentions skill={skill} />,
    },
    {
      title: 'Bookmarks',
      icon: <BookOutlined />,
      key: 'bookmarks',
      body: <SkillBookmarks skill={skill} />,
    },
    {
      title: 'Files',
      icon: <ContainerOutlined />,
      key: 'files',
      body: <SkillFiles skill={skill} />,
    },
  ]
  return <Tabs controlled tabs={tabs} tab={tab} />
}

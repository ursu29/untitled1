import React from 'react'
import { TeamOutlined, BookOutlined } from '@ant-design/icons'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'
import SkillBookmarks from './SkillBookmarks'
import SkillMentions from './SkillMentions'

interface Props {
  tab: string
  skill: Pick<Skill, 'id'>
}

export default function SkillTabs(props: Props) {
  let tabs = [
    {
      title: 'Mentions',
      icon: <TeamOutlined />,
      key: 'mentions',
      body: <SkillMentions skill={props.skill} />,
    },
    {
      title: 'Bookmarks',
      icon: <BookOutlined />,
      key: 'bookmarks',
      body: <SkillBookmarks skill={props.skill} />,
    },
  ]
  return <Tabs tabs={tabs} tab={props.tab} />
}

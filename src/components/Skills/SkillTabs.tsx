import React from 'react'
import {
  TeamOutlined,
  BookOutlined,
  ContainerOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'
import SkillBookmarks from './SkillBookmarks'
import SkillMentions from './SkillMentions'
import SkillFiles from './SkillFiles'
import Stream from '../Stream/StreamPage'

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
      title: 'Streams',
      icon: <VideoCameraOutlined />,
      key: 'streams',
      body: <Stream skill={skill} />,
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

import React from 'react'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'
import SkillBookmarks from './SkillBookmarks'

interface Props {
  tab: string
  skill: Pick<Skill, 'id'>
}

export default function SkillTabs(props: Props) {
  let tabs = [
    {
      title: 'Mentions',
      icon: 'user',
      key: 'mentions',
      body: <div>Mentions</div>,
    },
    {
      title: 'Bookmarks',
      icon: 'book',
      key: 'bookmarks',
      body: <SkillBookmarks skill={props.skill} />,
    },
  ]
  return <Tabs tabs={tabs} tab={props.tab} />
}

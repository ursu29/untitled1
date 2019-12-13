import React from 'react'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'

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
      body: <div>Bookmarks</div>,
    },
  ]
  return <Tabs tabs={tabs} tab={props.tab} />
}

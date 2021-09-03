import React from 'react'
import { Skill } from '../../types'
import Tabs from '../UI/Tabs'
import SkillBookmarks from './SkillBookmarks'
import SkillFiles from './SkillFiles'
import SkillMentions from './SkillMentions'
import { LibraryList } from '../Library/LibraryList'

interface Props {
  tab: string
  skill: Pick<Skill, 'id'>
}

export default function SkillTabs({ skill, tab = 'mentions' }: Props) {
  const tabs = [
    {
      title: 'Mentions & Acceptance Criteria',
      key: 'mentions',
      body: <SkillMentions skill={skill} />,
    },
    {
      title: 'Bookmarks',
      key: 'bookmarks',
      body: <SkillBookmarks skill={skill} />,
    },
    {
      title: 'Files',
      key: 'files',
      body: <SkillFiles skill={skill} />,
    },
    {
      title: 'Books',
      key: 'books',
      body: <LibraryList skills={[skill.id]} />,
    },
  ]
  return <Tabs controlled tabs={tabs} tab={tab} />
}

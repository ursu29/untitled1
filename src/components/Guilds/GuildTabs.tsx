import React from 'react'
import { Guild } from '../../types'
import Tabs from '../UI/Tabs'
import GuildInfo from './GuildInfo'
import GuildFiles from './GuildFiles'
import GuildBookmarks from './GuildBookmarks'
import { LibraryList } from '../Library/LibraryList'

interface Props {
  tab?: string
  guild: Guild
}

export default function GuildTabs({ guild, tab }: Props) {
  const tabs = [
    {
      title: 'Basic info',
      key: 'info',
      body: <GuildInfo guild={guild} />,
    },
    {
      title: 'Bookmarks',
      key: 'bookmarks',
      body: <GuildBookmarks guild={guild} />,
    },
    {
      title: 'Files',
      key: 'files',
      body: <GuildFiles guild={guild} />,
    },
    {
      title: 'Books',
      key: 'books',
      body: <LibraryList skills={guild.skills.map(e => e.id)} />,
    },
  ]
  return (
    <Tabs
      controlled
      tabs={tabs}
      tab={tab}
      noPadding
      tabsProps={{
        tabBarStyle: { padding: 0 },
      }}
    />
  )
}

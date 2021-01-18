import React from 'react'
import {
  BookOutlined,
  CoffeeOutlined,
  ContainerOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Guild } from '../../types'
import Tabs from '../UI/Tabs'
import Stream from '../Stream/StreamPage'
import GuildInfo from './GuildInfo'
import GuildFiles from './GuildFiles'
import GuildBookmarks from './GuildBookmarks'

interface Props {
  tab?: string
  guild: Guild
}

export default function GuildTabs({ guild, tab }: Props) {
  const tabs = [
    {
      title: 'Basic info',
      icon: <CoffeeOutlined />,
      key: 'info',
      body: <GuildInfo guild={guild} />,
    },
    {
      title: 'Bookmarks',
      icon: <BookOutlined />,
      key: 'bookmarks',
      body: <GuildBookmarks guild={guild} />,
    },
    {
      title: 'Streams',
      icon: <VideoCameraOutlined />,
      key: 'streams',
      body: <Stream skills={guild.skills} skillsFilterPartial />,
    },
    {
      title: 'Files',
      icon: <ContainerOutlined />,
      key: 'files',
      body: <GuildFiles guild={guild} />,
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
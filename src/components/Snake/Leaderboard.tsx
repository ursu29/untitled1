import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { ColumnType } from 'antd/lib/table/interface'
import dayjs from 'dayjs'
import { getEmployeeLink } from '../../paths'
import { GameScoreFragmentFragment } from '../../queries/games'
import Avatar from '../Avatar'

type Props = {
  leaderboards: GameScoreFragmentFragment[]
  loading: boolean
}

const columns: ColumnType<GameScoreFragmentFragment>[] = [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    width: '10%',
  },
  {
    title: 'Name',
    dataIndex: 'player',
    key: 'name',
    render: (player: GameScoreFragmentFragment['player']) => {
      return (
        <Link to={getEmployeeLink(player.email)}>
          <Avatar employee={player} size="small" /> {player.name}
        </Link>
      )
    },
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date: GameScoreFragmentFragment['date']) => {
      return dayjs(date).format('DD.MM.YYYY')
    },
  },
]

const Leaderboard = ({ leaderboards, loading }: Props) => {
  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={leaderboards}
      columns={columns}
      pagination={false}
    />
  )
}

export default Leaderboard

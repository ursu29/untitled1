import React from 'react'
import { Menu, Icon, Tag } from 'antd'
import { Link } from 'react-router-dom'
import paths from '../../paths'
import { useQuery } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import gql from 'graphql-tag'
import { Access } from '../../types'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../../config'
import styled from 'styled-components'

const Width = styled.div<{ isLarge: boolean }>`
  .ant-menu-inline-collapsed > .ant-menu-item {
    padding: 0 ${props => (props.isLarge ? '32px !important' : '22px !important')};
  }
`

const query = gql`
  {
    matricesAccess {
      read
    }
    processesAccess {
      read
    }
  }
`

type QueryType = {
  matricesAccess: Pick<Access, 'read'>
  processesAccess: Pick<Access, 'read'>
}

interface Props {
  path: string
}

function PortalMenu(props: Props) {
  const { data, loading } = useQuery<QueryType>(query)

  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })

  const menuItems = [
    {
      route: paths.EMPLOYEES,
      icon: <Icon type="team" />,
      title: 'Employees',
    },
    {
      route: paths.PROJECTS,
      icon: <Icon type="folder-open" />,
      title: 'Projects',
    },
    {
      route: paths.GUILDS,
      icon: <Icon type="coffee" />,
      title: 'Guilds',
    },
    {
      route: paths.SKILLS,
      icon: <Icon type="crown" />,
      title: 'Skills',
    },
    {
      route: paths.STATISTICS,
      icon: <Icon type="line-chart" />,
      title: 'Statistics',
      status: 'updated',
    },
    {
      route: paths.STREAM,
      icon: <Icon type="video-camera" />,
      title: 'Stream',
    },
    {
      route: paths.BOOKMARKS,
      icon: <Icon type="book" />,
      title: 'Bookmarks',
    },
    data?.matricesAccess.read
      ? {
          route: paths.MATRICES,
          icon: <Icon type="number" />,
          title: 'Matrices',
        }
      : null,
    {
      route: paths.SHARED_FILES,
      icon: <Icon type="file-image" />,
      title: 'Files',
    },
    {
      route: paths.POSTS,
      icon: <Icon type="fire" />,
      title: 'News',
    },
    {
      route: paths.TIMEMASTER,
      icon: <Icon type="clock-circle" />,
      title: 'Timemaster',
    },
    {
      route: paths.WIKI,
      icon: <Icon type="question-circle" />,
      title: 'WIKI',
    },
    {
      route: paths.OFFICE_PLANNER,
      icon: <Icon type="import" />,
      title: 'Office planner',
      status: 'new',
    },
    {
      route: paths.VACANCIES,
      icon: <Icon type="idcard" />,
      title: 'Vacancies',
      status: 'new',
    },
    data?.processesAccess.read
      ? {
          route: paths.HR,
          icon: <Icon type="user-add" />,
          title: 'HR Tool',
          status: 'new',
        }
      : null,
    data?.processesAccess.read
      ? {
          route: paths.PROCESSES,
          icon: <Icon type="branches" />,
          title: 'Processes',
          status: 'new',
        }
      : null,
  ]

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <Skeleton active loading={loading} />
      </div>
    )
  }

  return (
    <Skeleton withOffset active loading={loading}>
      <Width isLarge={isLarge}>
        <Menu
          defaultSelectedKeys={[props.path]}
          selectedKeys={[props.path]}
          mode="inline"
          theme="light"
          style={{ border: 'none', width: isLarge ? 240 : 60 }}
        >
          {menuItems.map(item => {
            if (!item) return null
            return (
              <Menu.Item key={item.route}>
                <Link to={item.route} key={item.route}>
                  {item.icon}
                  <span>{item.title}</span>
                  {item.status && isLarge && (
                    <Tag
                      style={{
                        fontSize: 11,
                        marginLeft: 8,
                        padding: '0 4px',
                        textTransform: 'uppercase',
                        lineHeight: 1.5,
                        cursor: 'pointer',
                      }}
                      color={(() => {
                        if (item.status === 'updated') return 'green'
                        if (item.status === 'new') return 'volcano'
                      })()}
                    >
                      {item.status === 'new' && 'New'}
                      {item.status === 'updated' && 'Updated'}
                    </Tag>
                  )}
                </Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </Width>
    </Skeleton>
  )
}

export default React.memo(PortalMenu)

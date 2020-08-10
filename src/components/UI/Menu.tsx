import React from 'react'

import {
  BookOutlined,
  BranchesOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  CrownOutlined,
  FileImageOutlined,
  FireOutlined,
  FolderOpenOutlined,
  IdcardOutlined,
  ImportOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  NumberOutlined,
  TeamOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
  NotificationOutlined,
} from '@ant-design/icons'

import { Menu, Tag, Badge } from 'antd'
import { Link } from 'react-router-dom'
import paths from '../../paths'
import { useQuery } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import gql from 'graphql-tag'
import { Access } from '../../types'
import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH, MENU_WIDTH } from '../../config'
import styled from 'styled-components'
import { useEmployee } from '../../utils/withEmployee'
import getActiveProcessExecutions, {
  ActiveProcessExecutionsQueryType,
} from '../../queries/getEmployeeActiveProcessExecutions'

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
  const { employee } = useEmployee()

  const { data: dataEmployee } = useQuery<ActiveProcessExecutionsQueryType>(
    getActiveProcessExecutions,
    {
      variables: { email: employee.email },
    },
  )
  let activeProcessExecutionsCount = 0
  if (dataEmployee)
    activeProcessExecutionsCount = dataEmployee.employeeByEmail.activeProcessExecutions.map(
      e => e.id,
    ).length

  const { data, loading } = useQuery<QueryType>(query)

  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })

  const menuItems = [
    {
      route: paths.EMPLOYEES,
      icon: <TeamOutlined />,
      title: 'Employees',
    },
    {
      route: paths.PROJECTS,
      icon: <FolderOpenOutlined />,
      title: 'Projects',
    },
    {
      route: paths.GUILDS,
      icon: <CoffeeOutlined />,
      title: 'Guilds',
    },
    {
      route: paths.SKILLS,
      icon: <CrownOutlined />,
      title: 'Skills',
    },
    {
      route: paths.STATISTICS,
      icon: <LineChartOutlined />,
      title: 'Statistics',
    },
    {
      route: paths.STREAM,
      icon: <VideoCameraOutlined />,
      title: 'Stream',
    },
    {
      route: paths.BOOKMARKS,
      icon: <BookOutlined />,
      title: 'Bookmarks',
    },
    data?.matricesAccess.read
      ? {
          route: paths.MATRICES,
          icon: <NumberOutlined />,
          title: 'Matrices',
        }
      : null,
    {
      route: paths.SHARED_FILES,
      icon: <FileImageOutlined />,
      title: 'Files',
    },
    {
      route: paths.POSTS,
      icon: <FireOutlined />,
      title: 'News',
    },
    {
      route: paths.TIMEMASTER,
      icon: <ClockCircleOutlined />,
      title: 'Timemaster',
    },
    {
      route: paths.WIKI,
      icon: <InfoCircleOutlined />,
      title: 'WIKI',
    },
    {
      route: paths.OFFICE_PLANNER,
      icon: <ImportOutlined />,
      title: 'Office planner',
    },
    {
      route: paths.VACANCIES,
      icon: <IdcardOutlined />,
      title: 'Vacancies',
    },
    data?.processesAccess.read
      ? {
          route: paths.HR,
          icon: <UserAddOutlined />,
          title: 'HR Tool',
          badgeCount: activeProcessExecutionsCount,
        }
      : null,
    data?.processesAccess.read
      ? {
          route: paths.PROCESSES,
          icon: <BranchesOutlined />,
          title: 'Processes',
        }
      : null,
    {
      route: paths.FEEDBACK,
      icon: <NotificationOutlined />,
      title: 'Feedback',
      style: { marginTop: '40px' },
      status: 'new',
    },
  ]

  if (loading) {
    return (
      <div style={{ padding: isLarge ? 24 : 8 }}>
        <Skeleton active loading={true} />
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
          style={{ border: 'none', width: isLarge ? MENU_WIDTH : 60 }}
        >
          {menuItems.map(item => {
            if (!item) return null
            return (
              <Menu.Item key={item.route} style={item?.style}>
                <Badge
                  count={item.badgeCount}
                  dot={isLarge ? false : !!item.badgeCount}
                  offset={isLarge ? [15, 0] : [5, 8]}
                >
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
                </Badge>
              </Menu.Item>
            )
          })}
        </Menu>
      </Width>
    </Skeleton>
  )
}

export default React.memo(PortalMenu)

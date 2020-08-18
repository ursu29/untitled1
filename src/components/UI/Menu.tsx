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
  ToolOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
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
  const { SubMenu } = Menu

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
      subMenu: 'knowledge',
    },
    {
      route: paths.BOOKMARKS,
      icon: <BookOutlined />,
      title: 'Bookmarks',
      subMenu: 'knowledge',
    },
    data?.matricesAccess.read
      ? {
          route: paths.MATRICES,
          icon: <NumberOutlined />,
          title: 'Matrices',
          subMenu: 'technical',
        }
      : null,
    {
      route: paths.SHARED_FILES,
      icon: <FileImageOutlined />,
      title: 'Files',
      subMenu: 'knowledge',
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
      subMenu: 'tools',
    },
    {
      route: paths.WIKI,
      icon: <InfoCircleOutlined />,
      title: 'WIKI',
      subMenu: 'knowledge',
    },
    {
      route: paths.OFFICE_PLANNER,
      icon: <ImportOutlined />,
      title: 'Office planner',
      subMenu: 'tools',
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
          subMenu: 'tools',
          badgeCount: activeProcessExecutionsCount,
        }
      : null,
    data?.processesAccess.read
      ? {
          route: paths.PROCESSES,
          icon: <BranchesOutlined />,
          title: 'Processes',
          subMenu: 'technical',
        }
      : null,
    {
      route: paths.FEEDBACK,
      icon: <NotificationOutlined />,
      title: 'Feedback',
      style: { marginTop: '40px' },
      status: 'new',
      subMenu: 'feedback',
    },
  ]

  if (loading) {
    return (
      <div style={{ padding: isLarge ? 24 : 8 }}>
        <Skeleton active loading={true} />
      </div>
    )
  }

  const getMenuItems = (subMenu?: string) =>
    menuItems
      .filter(item => (subMenu ? item?.subMenu === subMenu : !item?.subMenu))
      .map(item => {
        if (!item) return null
        return (
          <Menu.Item key={item.route} style={item?.style}>
            <Badge
              count={item.badgeCount}
              // dot={isLarge ? false : !!item.badgeCount}
              // offset={isLarge ? [70, 7] : [5, 8]}
              offset={isLarge ? [70, 7] : [50, 7]}
              style={{ backgroundColor: '#108ee9' }}
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
      })

  return (
    <Skeleton withOffset active loading={loading}>
      <Width isLarge={isLarge}>
        <Menu
          defaultSelectedKeys={[props.path]}
          selectedKeys={[props.path]}
          defaultOpenKeys={['tools']}
          mode="inline"
          theme="light"
          style={{ border: 'none', width: isLarge ? MENU_WIDTH : 60 }}
        >
          {getMenuItems()}

          <SubMenu
            key="tools"
            title={
              <span>
                <Badge
                  dot={
                    !!menuItems
                      .filter(item => item?.subMenu === 'tools')
                      .filter((e: any) => e?.badgeCount > 0).length
                  }
                  offset={isLarge ? [80, 7] : [5, 8]}
                  style={{ backgroundColor: '#108ee9' }}
                >
                  <AppstoreOutlined />
                  <span>Tools</span>
                </Badge>
              </span>
            }
          >
            {getMenuItems('tools')}
          </SubMenu>

          <SubMenu
            key="knowledge"
            title={
              <span>
                <DatabaseOutlined />
                <span>Knowledge</span>
              </span>
            }
          >
            {getMenuItems('knowledge')}
          </SubMenu>

          {getMenuItems('technical').length && (
            <SubMenu
              key="technical"
              title={
                <span>
                  <ToolOutlined />
                  <span>Technical</span>
                </span>
              }
            >
              {getMenuItems('technical')}
            </SubMenu>
          )}

          {getMenuItems('feedback')}
        </Menu>
      </Width>
    </Skeleton>
  )
}

export default React.memo(PortalMenu)

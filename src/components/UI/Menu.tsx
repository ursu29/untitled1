import {
  ClockCircleOutlined,
  CoffeeOutlined,
  FireOutlined,
  FolderOpenOutlined,
  GlobalOutlined,
  IdcardOutlined,
  BranchesOutlined,
  ImportOutlined,
  NotificationOutlined,
  ReadOutlined,
  TableOutlined,
  TeamOutlined,
  ToolOutlined,
  UserAddOutlined,
  CrownOutlined,
  LikeOutlined,
  MehOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { useQuery } from '@apollo/react-hooks'
import { Badge, Menu } from 'antd'
import gql from 'graphql-tag'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { COLLAPSE_WIDTH, MENU_WIDTH } from '../../config'
import paths from '../../paths'
import getActiveProcessExecutions, {
  ActiveProcessExecutionsQueryType,
} from '../../queries/getEmployeeActiveProcessExecutions'
import { Access } from '../../types'
import { useEmployee } from '../../utils/withEmployee'
import Skeleton from '../UI/Skeleton'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import { ReactComponent as MicSmallIcon } from '../../svg/mic-small.svg'

const Width = styled.div<{ isLarge: boolean }>`
  .ant-menu-inline-collapsed > .ant-menu-item,
  .ant-menu-inline-collapsed .ant-menu-submenu-title {
    padding: 0 ${props => (props.isLarge ? '32px !important' : '22px !important')};
  }
`

const query = gql`
  {
    matricesAccess {
      read
    }
    processesAccess {
      write
    }
    processExecutionsAccess {
      read
    }
    onboardingAccess {
      read
    }
  }
`

type QueryType = {
  matricesAccess: Pick<Access, 'read'>
  processesAccess: Pick<Access, 'write'>
  processExecutionsAccess: Pick<Access, 'read'>
  onboardingAccess: Pick<Access, 'read'>
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
  if (dataEmployee) {
    activeProcessExecutionsCount =
      dataEmployee.employeeByEmail.activeProcessExecutions?.map(e => e.id).length || 0
  }

  const { data, loading } = useQuery<QueryType>(query)

  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  const { SubMenu } = Menu

  const menuItems = [
    {
      route: paths.CALENDAR,
      icon: <CalendarOutlined />,
      title: 'Events',
      status: 'new',
    },
    {
      route: paths.ONBOARDING,
      icon: <LikeOutlined />,
      title: 'Trainings',
      status: '',
    },
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
      title: 'Guild',
    },
    {
      route: paths.SKILLS,
      icon: <CrownOutlined />,
      title: 'Skills',
    },
    {
      route: paths.POSTS,
      icon: <FireOutlined />,
      title: 'News',
    },
    {
      route: paths.VACANCIES,
      icon: <IdcardOutlined />,
      title: 'Vacancies',
    },
    {
      route: paths.KNOWLEDGE,
      icon: <ReadOutlined />,
      title: 'Knowledge',
    },
    {
      route: paths.WIKI,
      icon: <GlobalOutlined />,
      title: 'WIKI',
    },
    {
      route: paths.TIMEMASTER,
      icon: <ClockCircleOutlined />,
      title: 'Timemaster',
      subMenu: 'tools',
    },
    {
      route: paths.WORKSPACE_PLANNER,
      icon: <ImportOutlined />,
      title: 'Workspace',
      subMenu: 'tools',
    },
    {
      route: paths.OFFICE_PLANNER,
      icon: <ImportOutlined />,
      title: 'Office planner',
      subMenu: 'tools',
    },
    data?.processExecutionsAccess.read
      ? {
          route: paths.HR,
          icon: <UserAddOutlined />,
          title: 'HR Tool',
          subMenu: 'tools',
          badgeCount: activeProcessExecutionsCount,
        }
      : null,
    data?.processesAccess.write
      ? {
          route: paths.PROCESSES,
          icon: <BranchesOutlined />,
          title: 'Processes',
          subMenu: 'tools',
        }
      : null,
    data?.matricesAccess.read
      ? {
          route: paths.MATRICES,
          icon: <TableOutlined />,
          title: 'Matrices',
          subMenu: 'tools',
        }
      : null,
    useStrapiGroupCheck('SUPER_USER')
      ? {
          route: paths.MANAGEMENT,
          icon: <MehOutlined />,
          title: 'Management',
          subMenu: 'tools',
        }
      : null,
    {
      route: paths.DEVREL,
      icon: <MicSmallIcon style={{ marginRight: '10px', height: '14px', width: '14px' }} />,
      title: 'DevRel',
      subMenu: 'tools',
    },
    {
      route: paths.FEEDBACK,
      icon: <NotificationOutlined />,
      title: 'Feedback',
      style: { marginTop: '40px' },
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

  const getMenuItems = ({
    subMenu,
    start,
    amount,
  }: {
    subMenu?: string
    start?: number
    amount?: number
  }) =>
    menuItems
      .slice(start, (start ? start : 0) + (amount ? amount : menuItems.length))
      .filter(item => (subMenu ? item?.subMenu === subMenu : !item?.subMenu))
      .map(item => {
        if (!item) return null
        return (
          <Menu.Item key={item.route} style={item?.style}>
            <Link to={item.route} key={item.route}>
              <Badge
                count={item.badgeCount}
                offset={isLarge ? [70, 7] : [50, 7]}
                style={{ backgroundColor: '#108ee9' }}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.status && isLarge && (
                  <Badge color="rgb(255 180 0 / 1)" offset={[10, 8]} />
                  /*                   <Tag
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
                    {item.status === 'new' && 'NEW'}
                    {item.status === 'updated' && 'Updated'}
                  </Tag> */
                )}
              </Badge>
            </Link>
          </Menu.Item>
        )
      })

  return (
    <Skeleton withOffset active loading={loading}>
      <Width isLarge={isLarge}>
        <Menu
          defaultSelectedKeys={[props.path]}
          selectedKeys={[props.path]}
          // defaultOpenKeys={['tools']}
          mode="inline"
          theme="light"
          style={{ border: 'none', width: isLarge ? MENU_WIDTH : 60 }}
        >
          {getMenuItems({ start: 0, amount: 3 })}

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
                  <ToolOutlined />
                  <span>Tools</span>
                </Badge>
              </span>
            }
          >
            {getMenuItems({ subMenu: 'tools' })}
          </SubMenu>

          {getMenuItems({ start: 3 })}

          {getMenuItems({ subMenu: 'feedback' })}
        </Menu>
      </Width>
    </Skeleton>
  )
}

export default React.memo(PortalMenu)

import React from 'react'
import { Menu, Icon } from 'antd'
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
      route: paths.SKILLS,
      icon: <Icon type="crown" />,
      title: 'Skills',
    },
    {
      route: paths.STATISTICS,
      icon: <Icon type="line-chart" />,
      title: 'Statistics',
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
      route: paths.VACANCIES,
      icon: <Icon type="idcard" />,
      title: 'Vacancies',
    },
    {
      route: paths.HR,
      icon: <Icon type="user-add" />,
      title: 'HR Tool',
    },
    data?.processesAccess.read
      ? {
          route: paths.PROCESSES,
          icon: <Icon type="branches" />,
          title: 'Processes',
        }
      : null,
  ]

  return (
    <Skeleton padding={20} active loading={loading}>
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

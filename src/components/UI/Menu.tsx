import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import paths from '../../paths'
import { useQuery } from '@apollo/react-hooks'
import Skeleton from '../UI/Skeleton'
import gql from 'graphql-tag'
import { Access } from '../../types'

const query = gql`
  {
    matricesAccess {
      read
    }
  }
`

type QueryType = {
  matricesAccess: Pick<Access, 'read'>
}

interface Props {
  path: string
}

function PortalMenu(props: Props) {
  const { data, loading } = useQuery<QueryType>(query)

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
  ]

  return (
    <Skeleton padding={20} active loading={loading}>
      <Menu
        defaultSelectedKeys={[props.path]}
        selectedKeys={[props.path]}
        mode="inline"
        theme="light"
        style={{ border: 'none' }}
      >
        {menuItems
          // .filter(i => !!i)
          .map(item => {
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
    </Skeleton>
  )
}

export default React.memo(PortalMenu)

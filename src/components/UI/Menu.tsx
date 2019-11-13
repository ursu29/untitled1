import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import paths from '../../paths'

const menuItems = [
  {
    route: paths.PROFILE,
    icon: <Icon type="user" />,
    title: 'Profile',
  },
  {
    route: paths.EMPLOYEES,
    icon: <Icon type="team" />,
    title: 'Employees',
  },
  {
    route: paths.PROJECTS,
    icon: <Icon type="project" />,
    title: 'Projects',
  },
  {
    route: paths.GUILD_PROJECTS,
    icon: <Icon type="experiment" />,
    title: 'Guild projects',
  },
  {
    route: paths.SKILLS,
    icon: <Icon type="tool" />,
    title: 'Skills',
  },
  {
    route: paths.STATS,
    icon: <Icon type="pie-chart" />,
    title: 'Statistics',
  },
  {
    route: paths.BOOKMARKS,
    icon: <Icon type="book" />,
    title: 'Bookmarks',
  },
  {
    route: paths.MATRICES,
    icon: <Icon type="number" />,
    title: 'Matrices',
  },
  {
    route: paths.SHARED_FILES,
    icon: <Icon type="file" />,
    title: 'Files',
  },
  {
    route: paths.NEWS,
    icon: <Icon type="read" />,
    title: 'News',
  },
]

interface Props {
  path: string
}

export default function PortalMenu(props: Props) {
  return (
    <Menu
      style={{ minHeight: '100%' }}
      defaultSelectedKeys={[props.path]}
      mode="inline"
      theme="light"
    >
      {menuItems.map(item => {
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
  )
}

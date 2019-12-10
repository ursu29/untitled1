import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import paths from '../../paths'

const menuItems = [
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
  {
    route: paths.SETTINGS,
    icon: <Icon type="setting" />,
    title: 'Settings',
  },
]

interface Props {
  path: string
}

function PortalMenu(props: Props) {
  return (
    <Menu
      defaultSelectedKeys={[props.path]}
      selectedKeys={[props.path]}
      mode="inline"
      theme="light"
      style={{ border: 'none' }}
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

export default React.memo(PortalMenu)

import React from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { wikiEditingAccess } from '../../queries/wiki'
import PageScheme from './PageScheme'

const Title = styled.div`
  font-size: 24px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 5px;
  width: fit-content;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  min-width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.04);
  margin-right: 18px;
  cursor: pointer;
  &:hover {
    & > i {
      transform: scale(1.1);
    }
  }
`

export default function MainMenuItem({
  section,
  paths,
}: {
  section: {
    title: string
    description: string
    icon: string
    path: string
  }
  paths: string[]
}) {
  const { title, description, icon, path } = section
  const isMobileView = useMediaQuery({ maxWidth: 400 })

  // Get editing access
  const { data } = useQuery(wikiEditingAccess)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobileView ? 'column' : 'row',
        marginBottom: '40px',
      }}
    >
      <Link to={path}>
        <IconStyled>
          <Icon type={icon} style={{ fontSize: '35px', color: '#1890FF' }} />
        </IconStyled>
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
        <Link to={path} style={{ width: 'fit-content' }}>
          <Title>{title}</Title>
        </Link>

        <div
          style={{
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.45)',
            whiteSpace: 'break-spaces',
          }}
        >
          {description}
        </div>

        {data?.wikiEditingAccess.write && (
          <div style={{ marginBottom: '-20px' }}>
            <PageScheme paths={paths} sectionPath={section.path} />
          </div>
        )}
      </div>
    </div>
  )
}

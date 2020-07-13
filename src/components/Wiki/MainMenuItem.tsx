import React from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { wikiEditingAccess } from '../../queries/wiki'
import PageScheme from './PageScheme'
import {
  FileTextOutlined,
  QuestionCircleOutlined,
  StarOutlined,
  GlobalOutlined,
  QuestionOutlined,
} from '@ant-design/icons'

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

  const isLinkExternal = path.includes('http')

  const ConditionalLink = (props: any) =>
    !isLinkExternal ? (
      <Link to={path} style={props.style}>
        {props.children}
      </Link>
    ) : (
      <a href={path} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    )

  const RootIcon = ({ type, style }: { type: string; style?: any }) => {
    switch (type) {
      case 'file-text':
        return <FileTextOutlined style={style} />
      case 'question-circle':
        return <QuestionCircleOutlined style={style} />
      case 'star':
        return <StarOutlined style={style} />
      case 'global':
        return <GlobalOutlined style={style} />
      default:
        return <QuestionOutlined style={style} />
    }
  }

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
      <ConditionalLink>
        <IconStyled>
          <RootIcon type={icon} style={{ fontSize: '35px', color: '#1890FF' }} />
        </IconStyled>
      </ConditionalLink>

      <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
        <ConditionalLink style={{ width: 'fit-content' }}>
          <Title>{title}</Title>
        </ConditionalLink>

        <div
          style={{
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.45)',
            whiteSpace: 'break-spaces',
          }}
        >
          {description}
        </div>

        {data?.wikiEditingAccess.write && !isLinkExternal && (
          <div style={{ marginBottom: '-20px' }}>
            <PageScheme paths={paths} sectionPath={section.path} />
          </div>
        )}
      </div>
    </div>
  )
}

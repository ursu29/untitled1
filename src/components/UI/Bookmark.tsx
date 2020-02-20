import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { getSkillLink } from '../../paths'
import { Access, Bookmark, Employee, Skill } from '../../types'
import EmployeeLink from './EmployeeLink'

const StyledBookmark = styled.div`
  color: #8d96ac;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 2px 4px;
  word-break: break-word;
`

const StyledTitle = styled.a`
  color: #4a4a4a;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`

const StyledTag = styled.span`
  color: #8d96ac;
  cursor: pointer;
  padding-right: 4px;
  &:last-child {
    padding-right: 0;
  }
  &:hover {
    color: #1890ff;
  }
`

interface Props {
  edit?: any
  remove?: any
  like?: any
  bookmark: Pick<Bookmark, 'id' | 'title' | 'link'> & {
    employee: Pick<Employee, 'id' | 'name' | 'email'>
    access: Pick<Access, 'write'>
    skills?: Pick<Skill, 'id' | 'name'>[]
  }
}

const BulletDivider = () => (
  <span style={{ color: '#4a4a4a', paddingLeft: 4, paddingRight: 4 }}>&nbsp;•&nbsp;</span>
)

export default withRouter(
  ({ bookmark, history, edit, remove, like }: Props & RouteComponentProps) => {
    return (
      <StyledBookmark>
        <StyledTitle href={bookmark.link} target="_blank">
          {bookmark.title}
        </StyledTitle>
        {!!bookmark.skills?.length && (
          <>
            <BulletDivider />
            <span>
              {bookmark.skills.map(item => (
                <StyledTag
                  key={item.id}
                  onClick={e => {
                    e.preventDefault()
                    history.push(getSkillLink(item.id))
                  }}
                >
                  #{item.name}
                </StyledTag>
              ))}
            </span>
          </>
        )}
        <BulletDivider />
        {bookmark.employee ? <EmployeeLink employee={bookmark.employee} /> : 'Unknown'}
        {bookmark.employee && bookmark.access.write && (
          <>
            <BulletDivider />
            {edit}
            or
            {remove}
          </>
        )}
        <BulletDivider />
        {like}
      </StyledBookmark>
    )
  },
)

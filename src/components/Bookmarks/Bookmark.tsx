import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Access, Bookmark, Employee, Skill } from '../../types'
import EmployeeLink from '../Employees/EmployeeLink'
import { SkillLink } from '../Skills/SkillLink'
import { makeExternalUrl } from '../../utils/links'

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
        <StyledTitle
          href={makeExternalUrl(bookmark.link)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {bookmark.title}
        </StyledTitle>
        {!!bookmark.skills?.length && (
          <>
            <BulletDivider />
            <span>
              {bookmark.skills.map(skill => (
                <SkillLink key={skill.id} skill={skill} />
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

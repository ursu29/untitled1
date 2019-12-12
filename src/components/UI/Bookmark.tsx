import React, { useState } from 'react'
import {Bookmark, Employee, Access, Skill} from '../../types'
import EmployeeLink from '../UI/EmployeeLink'
import styled from 'styled-components'
import UpdateBookmark from '../Bookmarks/UpdateBookmark'
import DeleteBookmark from '../Bookmarks/DeleteBookmark'
import LikeBookmark from '../Bookmarks/LikeBookmark'
import { getSkillLink } from '../../paths'
import { RouteComponentProps, withRouter } from 'react-router-dom'

const StyledBookmark = styled.div`
  color: #8d96ac;
  margin-top: ${props => props.theme.padding / 2}px;
  margin-bottom: ${props => props.theme.padding / 2}px;
  padding: ${props => props.theme.padding / 4}px ${props => props.theme.padding / 2}px;
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
  padding-right: ${props => props.theme.padding / 4}px;
  &:last-child {
    padding-right: 0;
  }
  &:hover {
    color: #1890ff;
  }
`

interface Props {
  bookmark: Pick<Bookmark, 'id' | 'title' | 'link'> & {
    employee: Pick<Employee, 'id' | 'name' | 'email'>,
    access: Pick<Access, 'write'>,
    skills?: Pick<Skill, 'id' | 'name'>[]
  }
}

const BulletDivider = () => <span style={{ color: '#4a4a4a' }}>&nbsp;•&nbsp;</span>

export default withRouter(({ bookmark, history }: Props & RouteComponentProps) => {
  return (
    <StyledBookmark>
      <StyledTitle href={bookmark.link} target="_blank">{bookmark.title}</StyledTitle>
      {!!bookmark.skills?.length &&
        <>
          <BulletDivider/>
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
      }
      <BulletDivider/>
      {bookmark.employee ? <EmployeeLink employee={bookmark.employee}/> : 'Unknown'}
      {bookmark.employee && bookmark.access.write && (
        <>
          <BulletDivider/>
          <UpdateBookmark bookmark={bookmark}/>
          &nbsp;or&nbsp;
          <DeleteBookmark bookmark={bookmark}/>
        </>
      )}
      <BulletDivider/>
      <LikeBookmark bookmark={bookmark}/>
    </StyledBookmark>
  )
})
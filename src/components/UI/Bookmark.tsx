import React from 'react'
import {Bookmark, Employee, Access, Skill} from '../../types'
import EmployeeLink from '../UI/EmployeeLink'
import styled from 'styled-components'
import UpdateBookmark from '../Bookmarks/UpdateBookmark'
import DeleteBookmark from '../Bookmarks/DeleteBookmark'
import LikeBookmark from '../Bookmarks/LikeBookmark'
import { getSkillLink } from '../../paths'

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
    access: Pick<Access, 'write'>
  }
}

const BulletDivider = () => <span style={{ color: '#4a4a4a' }}>&nbsp;•&nbsp;</span>

export default function BookmarkItem({ bookmark }: Props) {

  return (
        <div>
          <StyledTitle href={bookmark.link} target="_blank">{bookmark.title}</StyledTitle>
          {/*{bookmark.skills && (
              <>
                <BulletDivider />
                <span>
            {bookmark.skills.map(skill => (
                <StyledTag
                    key={skill.id}
                    onClick={e => {
                      e.preventDefault()
                      history.push(getSkillLink(skill.id))
                    }}
                >
                  #{skill.name}
                </StyledTag>
            ))}
          </span>
              </>
          )}*/}
          {bookmark.employee &&
          <>
            <BulletDivider />
            <EmployeeLink employee={bookmark.employee} />
          </>
          }
          {bookmark.employee && bookmark.access.write && (
              <>
                <BulletDivider />
                <UpdateBookmark bookmark={bookmark} />
                &nbsp;or&nbsp;
                <DeleteBookmark bookmark={bookmark} />
              </>
          )}
          <BulletDivider />
          <LikeBookmark bookmark={bookmark} />
        </div>
    )
}
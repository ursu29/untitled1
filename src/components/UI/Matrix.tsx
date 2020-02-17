import React from 'react'
import { Matrix } from '../../types'
import { Skeleton } from 'antd'
import styled from 'styled-components'
import Divider from '../UI/Divider'

export const MatrixCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`

export const MatrixRow = styled.div`
  display: flex;
  /* padding: 16px; */
`

export const MatrixGroup = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.padding}px;
`

export const MatrixGrade = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 8px;
  background-color: #f7f7f7;
  margin-right: 8px;
`

interface MatrixBodyProps
  extends Pick<
    Props,
    'matrix' | 'CreateMatrixGroup' | 'CreateMatrixGrade' | 'CreateMatrixSkill' | 'DeleteMatrixSkill'
  > {}

export const MatrixBody = React.memo(
  ({
    matrix,
    CreateMatrixGroup,
    CreateMatrixGrade,
    CreateMatrixSkill,
    DeleteMatrixSkill,
  }: MatrixBodyProps) => {
    if (!matrix) return null
    const editable = matrix.access.write
    const { groups, grades, skills } = matrix.body
    return (
      <div>
        <MatrixRow>
          <MatrixGroup>
            {editable && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CreateMatrixGroup matrix={matrix} />
                &nbsp;\&nbsp;
                <CreateMatrixGrade matrix={matrix} />
              </div>
            )}
          </MatrixGroup>
          {grades.map(grade => (
            <MatrixGrade key={grade.id} style={{ justifyContent: 'center' }}>
              {grade.title}
            </MatrixGrade>
          ))}
        </MatrixRow>
        {groups.map(group => {
          return (
            <div key={group.id}>
              <Divider />
              <MatrixRow key={group.id}>
                <MatrixGroup>{group.title}</MatrixGroup>
                {grades.map(grade => {
                  const content = skills
                    .filter(skill => skill.groupId === group.id && skill.gradeId === grade.id)
                    .map(({ skill }) => (
                      <MatrixCell key={skill.id}>
                        <DeleteMatrixSkill skill={skill} matrix={matrix} editable={editable} />
                      </MatrixCell>
                    ))
                  if (editable)
                    content.push(
                      <MatrixCell key="-1">
                        <CreateMatrixSkill grade={grade} group={group} matrix={matrix} />
                      </MatrixCell>,
                    )
                  return <MatrixGrade key={grade.id}>{content.length ? content : '-'}</MatrixGrade>
                })}
              </MatrixRow>
            </div>
          )
        })}
      </div>
    )
  },
)

interface Props {
  loading: boolean
  matrix?: Matrix
  CreateMatrixGroup: any
  CreateMatrixGrade: any
  CreateMatrixSkill: any
  DeleteMatrixSkill: any
}

export default function MatrixView({ loading, ...props }: Props) {
  if (!loading && !props.matrix) return null
  return (
    <Skeleton active loading={loading}>
      <MatrixBody {...props} />
    </Skeleton>
  )
}

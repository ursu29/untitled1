import React from 'react'
import { Employee, Matrix, Skill, Level, Experience } from '../../types'
import { Tooltip } from 'antd'
import { MatrixRow, MatrixGroup, MatrixGrade } from './Matrix'
import { ExperienceDetails } from '../../fragments'

interface Props {
  matrix: Matrix
  employee?: Pick<Employee, 'id'> & {
    experiences: ExperienceDetails[]
  }
  EmployeeMatrixExperience: any
}

export default function MatrixWithExperiences({
  matrix,
  employee,
  EmployeeMatrixExperience,
}: Props) {
  const { groups, grades, skills } = matrix.body
  return (
    <div style={{ padding: '8px 0' }}>
      <MatrixRow>
        <MatrixGroup />
        {grades.map(grade => (
          <MatrixGrade key={grade.title} style={{ justifyContent: 'center' }}>
            <Tooltip title={grade.description}>{grade.title}</Tooltip>
          </MatrixGrade>
        ))}
      </MatrixRow>
      {groups.map(group => (
        <MatrixRow key={group.title}>
          <MatrixGroup>
            <Tooltip title={group.description}>{group.title}</Tooltip>
          </MatrixGroup>
          {grades.map(grade => {
            const content = skills
              .filter(skill => skill.groupId === group.id && skill.gradeId === grade.id)
              .map(({ skill }) => {
                const experience = employee?.experiences.find(i => i.skill.id === skill.id)
                return (
                  <EmployeeMatrixExperience
                    experience={experience}
                    key={skill.id}
                    skill={skill}
                    editable={matrix.access.write || false}
                    employee={employee}
                  />
                )
              })
            return <MatrixGrade key={grade.title}>{content.length ? content : '-'}</MatrixGrade>
          })}
        </MatrixRow>
      ))}
    </div>
  )
}

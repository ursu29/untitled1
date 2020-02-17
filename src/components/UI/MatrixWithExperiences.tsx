import { Tooltip } from 'antd'
import React from 'react'
import { ExperienceDetails } from '../../fragments'
import { Employee, Matrix } from '../../types'
import { MatrixGrade, MatrixGroup, MatrixRow } from './Matrix'
import Divider from '../UI/Divider'

interface Props {
  matrix: Matrix
  employee?: Pick<Employee, 'id'> & {
    experiences: ExperienceDetails[]
  }
  EmployeeSkillExperience: any
}

export default function MatrixWithExperiences({
  matrix,
  employee,
  EmployeeSkillExperience,
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
        <>
          <Divider type="horizontal" />
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
                    <EmployeeSkillExperience
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
        </>
      ))}
    </div>
  )
}

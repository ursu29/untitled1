import { Table, Tooltip } from 'antd'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled, { css } from 'styled-components'
import { COLLAPSE_WIDTH } from '../../config'
import { QueryType } from '../../queries/getProjectEmployeesExperiences'
import { ReactComponent as ConfidentIcon } from '../../svg/confident.svg'
import { ReactComponent as ExperiencedIcon } from '../../svg/experienced.svg'
import { ReactComponent as StudyingIcon } from '../../svg/studying.svg'
import { Employee, Skill } from '../../types'
import EmployeeLink from '../Employees/EmployeeLink'
import { Level } from '../../types/graphql'
import { levelList, getLevelName } from '../../utils/getLevelName'

type EmployeeSkillMatrixProps = {
  project: QueryType['project']
}

function getEmployeeSkillLevel(employee: Partial<Employee>, skill: Partial<Skill>): Level | null {
  const exp = employee.experiences!.find(e => e.skill.id === skill.id)
  if (!exp) {
    return null
  }
  return exp.level
}

function bySkillNameAZ(a: Partial<Skill>, b: Partial<Skill>) {
  const nameA = a.name!.toLowerCase()
  const nameB = b.name!.toLowerCase()
  return nameA > nameB ? 1 : nameA < nameB ? -1 : 0
}

const SkillIcon = styled.div<{ minor?: boolean }>`
  height: 32px;
  ${props =>
    props.minor &&
    css`
      font-size: 15px;
      line-height: 18px;
      color: #4a4a4a;
      opacity: 0.5;
      font-weight: bold;
    `}
  > img {
    height: 100%;
    width: 100%;
  }
`

const levelIcons = [
  <SkillIcon minor>•</SkillIcon>,
  <SkillIcon>
    <ConfidentIcon />
  </SkillIcon>,
  <SkillIcon>
    <ExperiencedIcon />
  </SkillIcon>,
  <SkillIcon>
    <StudyingIcon />
  </SkillIcon>,
]

type EmployeePick = Pick<Employee, 'id' | 'name' | 'email' | 'position'>

const EmployeeSkillMatrix: React.FC<EmployeeSkillMatrixProps> = ({ project }) => {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  if (!project.skills || !project.skills.length) {
    return <div>Project has no skills</div>
  }

  const columns: any = [
    {
      title: 'Name',
      key: 'name',
      width: 150,
      render: (employee: EmployeePick) => (
        <>
          <EmployeeLink employee={employee} />
          {!isLarge && <div>{employee.position}</div>}
        </>
      ),
      sorter: (a: EmployeePick, b: EmployeePick): number => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      },
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend',
    },
  ].concat(
    project.skills?.sort(bySkillNameAZ).map(skill => {
      const col: any = {
        align: 'center',
        key: skill.id,
        ellipsis: true,
        render: (_: any, record: Partial<Employee>) => {
          const level = getEmployeeSkillLevel(record, skill)
          if (!level) {
            return (
              <SkillIcon minor title={`Doesn't have this skill "${skill.name}"`}>
                ×
              </SkillIcon>
            )
          }
          return (
            <div title={`${getLevelName(level)} ${skill.name}`}>
              {levelIcons[levelList.indexOf(level)]}
            </div>
          )
        },
        sortDirections: ['ascend', 'descend'],
        sorter: (a: Partial<Employee>, b: Partial<Employee>) => {
          const levelA = getEmployeeSkillLevel(a, skill) || { index: -Infinity }
          const levelB = getEmployeeSkillLevel(b, skill) || { index: -Infinity }
          return levelList.indexOf(levelB as Level) - levelList.indexOf(levelA as Level)
        },
        title: (
          <Tooltip title={skill.name}>
            <span>{skill.name}</span>
          </Tooltip>
        ),
      }

      return col
    }),
  )

  return (
    <Table
      //@ts-ignore
      dataSource={project.employees}
      pagination={false}
      //@ts-ignore
      columns={columns}
      rowKey="id"
      scroll={{ x: true }}
    />
  )
}

export default EmployeeSkillMatrix

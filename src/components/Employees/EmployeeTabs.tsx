import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import {
  FormOutlined,
  RiseOutlined,
  NumberOutlined,
  BookOutlined,
  CrownOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { useQuery } from '@apollo/react-hooks'
import { Employee, Access } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeMatrices from '../EmployeeMatrices/EmployeeMatrices'
import Tabs from '../UI/Tabs'
import EmployeeBookmarks from './EmployeeBookmarks'
import EmployeeCV from './EmployeeCV'
import EmployeeSkills from './EmployeeSkills'
import EmployeeDevelopmentPlan from './EmployeeDevelopmentPlan'
import EmployeeEvaluation from '../EmployeeEvaluation/EmployeeEvaluation'
import { Tag } from 'antd'

interface Props extends RouteComponentProps {
  employee: Pick<Employee, 'id' | 'email'>
  tab?: string
}

const query = gql`
  query getEmployees(
    $input: EmployeesInput
    $inputEmail: AccessInput
    $inputToWhom: EvaluationReviewersAccessInput
  ) {
    employees(input: $input) {
      id
      name
      email
      manager {
        id
        name
        isMe
      }
      access {
        read
        write
      }
      isMe
    }

    curriculumVitaeAccess(input: $inputEmail) {
      read
      write
    }

    matricesLookReviewersAccess(input: $inputEmail) {
      read
      write
    }

    developmentPlanLookReviewersAccess(input: $inputEmail) {
      read
      write
    }

    evaluationReviewersAccess(input: $inputToWhom) {
      read
      write
    }
  }
`

type QueryType = {
  employees: (Pick<Employee, 'id' | 'name' | 'email' | 'access' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'email' | 'isMe'>
  })[]
  curriculumVitaeAccess: Access
  matricesLookReviewersAccess: Access
  developmentPlanLookReviewersAccess: Access
  evaluationReviewersAccess: Access
}

function EmployeeTabs({ match, ...props }: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: {
      input: { id: props.employee.id },
      inputEmail: { employeeEmail: props.employee.email },
      inputToWhom: { toWhom: props.employee.id },
    },
  })

  if (error) return <div>Error :(</div>

  const employee = data?.employees?.[0]
  const curriculumVitaeAccess = data?.curriculumVitaeAccess
  const matricesLookReviewersAccess = data?.matricesLookReviewersAccess
  const developmentPlanLookReviewersAccess = data?.developmentPlanLookReviewersAccess
  const evaluationReviewersAccess = data?.evaluationReviewersAccess

  let tabs: any = [
    {
      title: 'Skills',
      key: 'skills',
      icon: <CrownOutlined />,
      noPadding: false,
      body: <EmployeeSkills employee={employee} editable={employee?.access.write || false} />,
    },
    {
      title: 'Bookmarks',
      icon: <BookOutlined />,
      key: 'bookmarks',
      noPadding: false,
      body: <EmployeeBookmarks employee={employee} />,
    },
  ]

  if (matricesLookReviewersAccess?.read) {
    tabs.push({
      title: (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          Matrices
          <Tag
            style={{
              fontSize: 11,
              marginLeft: 6,
              padding: '0 4px',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              cursor: 'pointer',
            }}
            color="green"
          >
            Updated
          </Tag>
        </div>
      ),
      key: 'matrices',
      icon: <NumberOutlined />,
      noPadding: false,
      body: (
        <EmployeeMatrices employee={employee} reviewersListAccess={matricesLookReviewersAccess} />
      ),
    })
  }
  if (developmentPlanLookReviewersAccess?.read) {
    tabs.push({
      title: (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          Personal development
          <Tag
            style={{
              fontSize: 11,
              marginLeft: 6,
              padding: '0 4px',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              cursor: 'pointer',
            }}
            color="green"
          >
            Updated
          </Tag>
        </div>
      ),
      key: 'development-plan',
      icon: <RiseOutlined />,
      noPadding: false,
      body: (
        <EmployeeDevelopmentPlan
          employee={employee}
          reviewersListAccess={developmentPlanLookReviewersAccess}
        />
      ),
    })
  }

  if (evaluationReviewersAccess?.read) {
    tabs.push({
      title: (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          Self Evaluation Form
          <Tag
            style={{
              fontSize: 11,
              marginLeft: 6,
              padding: '0 4px',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              cursor: 'pointer',
            }}
            color="green"
          >
            Updated
          </Tag>
        </div>
      ),
      key: 'evaluation',
      icon: <StarOutlined />,
      noPadding: false,
      body: <EmployeeEvaluation employee={employee} editable={evaluationReviewersAccess?.write} />,
    })
  }
  if (curriculumVitaeAccess?.read) {
    tabs.push({
      title: 'CV',
      icon: <FormOutlined />,
      key: 'cv',
      noPadding: true,
      body: (
        <EmployeeCV
          editable={curriculumVitaeAccess?.write}
          employee={{ id: employee?.id || '', email: employee?.email || '' }}
        />
      ),
    })
  }

  return (
    <Skeleton loading={loading} withOffset>
      {employee && <Tabs controlled tabs={tabs} tab={props.tab} />}
    </Skeleton>
  )
}

export default withRouter(EmployeeTabs)

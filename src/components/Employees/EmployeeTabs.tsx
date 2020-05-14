import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
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

interface Props extends RouteComponentProps {
  employee: Pick<Employee, 'id' | 'email'>
  tab?: string
}

const query = gql`
  query getEmployees(
    $input: EmployeesInput
    $inputEmail: CurriculumVitaeInput
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
  const evaluationReviewersAccess = data?.evaluationReviewersAccess

  let tabs = [
    {
      title: 'Skills',
      key: 'skills',
      icon: 'crown',
      noPadding: false,
      body: <EmployeeSkills employee={employee} editable={employee?.access.write || false} />,
    },
    {
      title: 'Bookmarks',
      icon: 'book',
      key: 'bookmarks',
      noPadding: false,
      body: <EmployeeBookmarks employee={employee} />,
    },
  ]

  if (employee?.access.write) {
    tabs.push({
      title: 'Matrices',
      key: 'matrices',
      icon: 'number',
      noPadding: false,
      body: <EmployeeMatrices employee={employee} />,
    })
  }
  if (employee?.access.write) {
    tabs.push({
      title: 'Personal development',
      key: 'development-plan',
      icon: 'rise',
      noPadding: false,
      body: <EmployeeDevelopmentPlan employee={employee} />,
    })
  }
  if (curriculumVitaeAccess?.read) {
    tabs.push({
      title: 'CV',
      icon: 'form',
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
  if (evaluationReviewersAccess?.read) {
    tabs.push({
      title: 'Self Evaluation Form',
      key: 'evaluation',
      icon: 'star',
      noPadding: false,
      body: <EmployeeEvaluation employee={employee} editable={evaluationReviewersAccess?.write} />,
    })
  }

  return (
    <Skeleton loading={loading} withOffset>
      {employee && <Tabs controlled tabs={tabs} tab={props.tab} />}
    </Skeleton>
  )
}

export default withRouter(EmployeeTabs)

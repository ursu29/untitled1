import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Employee, Access } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeMatrices from '../EmployeeMatrices/EmployeeMatrices'
import Tabs from '../UI/Tabs'
import EmployeeBookmarks from './EmployeeBookmarks'
import EmployeeSkills from './EmployeeSkills'
import EmployeeDevelopmentPlan from './EmployeeDevelopmentPlan'
import EmployeeEvaluation from '../EmployeeEvaluation/EmployeeEvaluation'
import EmployeeEvaluationReviewersAccess from '../EmployeeEvaluation/EmployeeEvaluationReviewersAccess'

interface Props extends RouteComponentProps {
  employee: Pick<Employee, 'id'>
  tab?: string
}

const query = gql`
  query getEmployees($input: EmployeesInput) {
    employees(input: $input) {
      id
      name
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
  }
`

type QueryType = {
  employees: (Pick<Employee, 'id' | 'name' | 'access' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  })[]
}

function EmployeeTabs({ match, ...props }: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: { input: { id: props.employee.id } },
  })

  if (error) return <div>Error :(</div>

  const employee = data?.employees?.[0]

  let tabs = [
    {
      title: 'Skills',
      key: 'skills',
      icon: 'crown',
      body: <EmployeeSkills employee={employee} editable={employee?.access.write || false} />,
    },
    {
      title: 'Bookmarks',
      icon: 'book',
      key: 'bookmarks',
      body: <EmployeeBookmarks employee={employee} />,
    },
  ]

  if (employee?.access.write) {
    tabs.push({
      title: 'Matrices',
      key: 'matrices',
      icon: 'number',
      body: <EmployeeMatrices employee={employee} />,
    })
  }
  if (employee?.access.write) {
    tabs.push({
      title: 'Personal development',
      key: 'development-plan',
      icon: 'rise',
      body: <EmployeeDevelopmentPlan employee={employee} />,
    })
  }

  return (
    <Skeleton loading={loading} padding={60}>
      {employee && (
        <EmployeeEvaluationReviewersAccess employee={employee}>
          {(evaluationTabAccess: Access) => {
            if (evaluationTabAccess.read) {
              tabs.push({
                title: 'Self Evaluation Form',
                key: 'evaluation',
                icon: 'star',
                body: (
                  <EmployeeEvaluation employee={employee} editable={evaluationTabAccess.write} />
                ),
              })
            }
            return <Tabs tabs={tabs} tab={props.tab} />
          }}
        </EmployeeEvaluationReviewersAccess>
      )}
    </Skeleton>
  )
}

export default withRouter(EmployeeTabs)

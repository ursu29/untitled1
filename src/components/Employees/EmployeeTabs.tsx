import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Access, Employee } from '../../types/graphql'
import Skeleton from '../UI/Skeleton'
import Tabs from '../UI/Tabs'
import Career from './Career'
import EmployeeBookmarks from './EmployeeBookmarks'
import EmployeeSummary from './EmployeeSummary'
import { TabTitleWithBadge } from '../UI/TabTitleWithBadge'
import EmployeeSubordinates from './EmployeeSubordinates'

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
      subordinateUsersCount {
        users
        one2oneRequests
      }
      agileManager {
        id
        name
        email
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
  employees: (Pick<
    Employee,
    'id' | 'name' | 'email' | 'access' | 'isMe' | 'subordinateUsersCount'
  > & {
    agileManager: Pick<Employee, 'id' | 'name' | 'email' | 'isMe'>
  })[]
  curriculumVitaeAccess: Access
  matricesLookReviewersAccess: Access
  developmentPlanLookReviewersAccess: Access
  evaluationReviewersAccess: Access
}

function EmployeeTabs({ match, location, ...props }: Props) {
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
  const access = {
    curriculumVitaeAccess,
    matricesLookReviewersAccess,
    developmentPlanLookReviewersAccess,
    evaluationReviewersAccess,
  }

  if (!employee) return null

  let tabs: any = [
    {
      title: 'Career',
      key: 'career',
      body: <Career employee={employee} access={access} />,
    },
    {
      title: 'Summary',
      key: 'summary',
      body: <EmployeeSummary employee={employee} editable={Boolean(employee?.access?.write)} />,
    },
    {
      title: 'My bookmarks',
      key: 'bookmarks',
      body: <EmployeeBookmarks employee={employee} />,
    },
    // {
    //   title: 'Achievements',
    //   key: 'achievements',
    //   body: <div>Achievements</div>,
    // },
  ]

  if (employee?.subordinateUsersCount?.users) {
    tabs.push({
      title: (
        <TabTitleWithBadge
          title={`Total count: ${employee.subordinateUsersCount?.users} user(s)`}
          count={employee.subordinateUsersCount?.users}
          offset={[12, -6]}
          overflowCount={999}
          showZero
          style={{
            backgroundColor: '#fff',
            color: '#999',
            boxShadow: '0 0 0 1px #d9d9d9 inset',
          }}
        >
          <TabTitleWithBadge
            title={`One-2-one: ${employee.subordinateUsersCount?.one2oneRequests} request(s)`}
            count={employee.subordinateUsersCount?.one2oneRequests ? '1-2-1' : null}
            offset={[-25, -9]}
            size="small"
            style={{
              backgroundColor: '#ffc400',
              fontSize: '10px',
            }}
          >
            My employees
          </TabTitleWithBadge>
        </TabTitleWithBadge>
      ),
      key: 'employees',
      body: <EmployeeSubordinates employee={employee} />,
    })
  }

  return (
    <Skeleton loading={loading} withOffset>
      {employee && <Tabs controlled tabs={tabs} tab={props.tab} />}
    </Skeleton>
  )
}

export default withRouter(EmployeeTabs)

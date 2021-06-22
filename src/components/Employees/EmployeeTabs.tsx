import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { RouteComponentProps, withRouter, matchPath } from 'react-router-dom'
import paths from '../../paths'
import { Employee, Access } from '../../types'
import Skeleton from '../UI/Skeleton'
import EmployeeMatrices from '../EmployeeMatrices/EmployeeMatrices'
import Tabs from '../UI/Tabs'
import { TabTitleWithBadge } from '../UI/TabTitleWithBadge'
import EmployeeEvaluation from '../EmployeeEvaluation/EmployeeEvaluation'
import EmployeeBookmarks from './EmployeeBookmarks'
import EmployeeCV from './EmployeeCV'
import EmployeeSkills from './EmployeeSkills'
import EmployeeDevelopmentPlan from './EmployeeDevelopmentPlan'
import EmployeeSubordinates from './EmployeeSubordinates'
import EmployeeSummary from './EmployeeSummary'

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

/* const UpdatedTag = () => (
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
) */

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
  const isProfile = Boolean(matchPath(location.pathname, { path: paths.PROFILE }))

  let tabs: any = [
    {
      title: 'Skills',
      key: 'skills',
      noPadding: false,
      body: (
        <EmployeeSkills
          employee={employee}
          editable={employee?.access.write}
          showTabs={isProfile}
        />
      ),
    },
    {
      title: 'Summary',
      key: 'summary',
      noPadding: false,
      body: <EmployeeSummary employee={employee} editable={employee?.access.write} />,
    },
    {
      title: 'Bookmarks',
      key: 'bookmarks',
      noPadding: false,
      body: <EmployeeBookmarks employee={employee} />,
    },
  ]

  if (matricesLookReviewersAccess?.read) {
    tabs.push({
      title: <div style={{ display: 'inline-flex', alignItems: 'center' }}>Matrices</div>,
      key: 'matrices',
      noPadding: false,
      body: (
        <EmployeeMatrices employee={employee} reviewersListAccess={matricesLookReviewersAccess} />
      ),
    })
  }
  if (developmentPlanLookReviewersAccess?.read) {
    tabs.push({
      title: (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>Personal development</div>
      ),
      key: 'development-plan',
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
      title: 'Self Evaluation Form',
      /* (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          Self Evaluation Form
           <UpdatedTag /> 
        </div>
      ), */
      key: 'evaluation',
      noPadding: false,
      body: <EmployeeEvaluation employee={employee} editable={evaluationReviewersAccess?.write} />,
    })
  }

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
      noPadding: true,
      body: <EmployeeSubordinates employee={employee} />,
    })
  }

  if (curriculumVitaeAccess?.read) {
    tabs.push({
      title: 'CV',
      key: 'cv',
      noPadding: false,
      body: (
        <EmployeeCV
          editable={curriculumVitaeAccess?.write}
          employee={{
            id: employee?.id || '',
            email: employee?.email || '',
            name: employee?.name || '',
            isMe: employee?.isMe || false,
          }}
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

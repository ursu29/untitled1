import gql from 'graphql-tag'
import { Employee } from '../types'
import fragments, { EmployeeDetails, ProjectDetails } from '../fragments'

export const query = gql`
  query getSubordinates($email: String!) {
    employeeByEmail(email: $email) {
      id
      subordinateUsers {
        ...EmployeeDetails
        lastManagerMeeting
        leadingProjects {
          ...ProjectDetails
        }
        projects {
          ...ProjectDetails
        }
      }
    }
  }
  ${fragments.Employee.Details}
  ${fragments.Project}
`

export type Subordinate = EmployeeDetails &
  Pick<Employee, 'lastManagerMeeting'> & {
    leadingProjects: ProjectDetails[]
    projects: ProjectDetails[]
  }

export type QueryType = {
  employeeByEmail: {
    id: string
    subordinateUsers: Subordinate[]
  }
}

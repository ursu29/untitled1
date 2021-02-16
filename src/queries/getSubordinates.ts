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
        one2oneRequest
        requestedOnboardingTickets {
          ...OnboardingTicketDetails
        }
        projects {
          ...ProjectDetails
        }
      }
    }
  }
  ${fragments.Employee.Details}
  ${fragments.Project}
  ${fragments.OnboardingTicket}
`

export type Subordinate = EmployeeDetails &
  Pick<Employee, 'lastManagerMeeting' | 'one2oneRequest' | 'requestedOnboardingTickets'> & {
    projects: ProjectDetails[]
  }

export type QueryType = {
  employeeByEmail: {
    id: string
    subordinateUsers: Subordinate[]
  }
}

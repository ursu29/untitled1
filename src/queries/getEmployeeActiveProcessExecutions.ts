import { gql } from '@apollo/client'

export default gql`
  query getEmployee($email: String!) {
    employeeByEmail(email: $email) {
      id
      activeProcessExecutions {
        id
      }
    }
  }
`

export type ActiveProcessExecutionsQueryType = {
  employeeByEmail: { activeProcessExecutions: [{ id: string }] }
}

import gql from 'graphql-tag'

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

import gql from 'graphql-tag'

export default gql`
  mutation rotateEmployee($input: RotateEmployeeInput!) {
    rotateEmployee(input: $input) {
      id
    }
  }
`

export type MutationResult = {
  rotateEmployee: {
    id: string
  }
}

export type MutationVariables = {
  input: {
    execution: string
    employee: string
    process: string
    locations: [string]
    project: string
  }
}
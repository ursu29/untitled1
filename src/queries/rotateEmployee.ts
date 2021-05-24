import { gql } from '@apollo/client'

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
    prio: number
  }
}

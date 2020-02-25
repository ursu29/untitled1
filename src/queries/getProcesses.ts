import gql from 'graphql-tag'
import { Process, ProcessStep } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export default gql`
  query getProcesses($input: ProcessesInput) {
    processes(input: $input) {
      id
      title
      customer
      type
      isRotation
      steps {
        id
        title
        description
        type
        responsibleUsers {
          ...EmployeeDetails
        }
        sendToTeamlead
        parentSteps {
          id
        }
      }
    }
  }
  ${fragments.Employee.Details}
`

type ProcessPick = Pick<Process, 'id' | 'customer' | 'type' | 'isRotation' | 'title'> & {
  steps: (Pick<ProcessStep, 'id' | 'title' | 'description' | 'type' | 'sendToTeamlead'> & {
    responsibleUsers: EmployeeDetails[]
    parentSteps: Pick<ProcessStep, 'id'>[]
  })[]
}

export type QueryType = {
  processes: ProcessPick[]
}

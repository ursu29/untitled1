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
        hasComment
        parentSteps {
          id
        }
        process {
          id
        }
      }
    }
  }
  ${fragments.Employee.Details}
`

type ProcessPick = Pick<Process, 'id' | 'customer' | 'type' | 'isRotation' | 'title'> & {
  steps: (Pick<
    ProcessStep,
    'id' | 'title' | 'description' | 'type' | 'sendToTeamlead' | 'hasComment'
  > & {
    responsibleUsers: EmployeeDetails[]
    parentSteps: Pick<ProcessStep, 'id'>[]
    process: Pick<Process, 'id'>
  })[]
}

export type QueryType = {
  processes: ProcessPick[]
}

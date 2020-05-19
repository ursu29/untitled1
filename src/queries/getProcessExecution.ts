import gql from 'graphql-tag'
import fragments, { EmployeeDetails, ProcessStepDetails } from '../fragments'
import { Process, ProcessExecutionStep, ProcessStep, Vacancy } from '../types'

export default gql`
  query getProcessExecutions($input: ProcessExecutionsInput) {
    processExecutions(input: $input) {
      id
      process {
        id
        type
        steps {
          ...ProcessStepDetails
        }
      }
      vacancy {
        id
        isPublished
        rotateEmployees {
          ...EmployeeDetails
        }
        responsibleEmployees {
          ...EmployeeDetails
        }
        editable
      }
      executionSteps {
        id
        step {
          id
        }
        description
        isDone
      }
    }
  }
  ${fragments.Employee.Details}
  ${fragments.ProcessStep.Details}
`

type ProcessExecutionPick = {
  id: string
  process: Pick<Process, 'id' | 'type'> & {
    steps: ProcessStepDetails[]
  }
  vacancy: Pick<Vacancy, 'id' | 'isPublished' | 'editable'> & {
    rotateEmployees: EmployeeDetails[]
    responsibleEmployees: EmployeeDetails[]
  }
  executionSteps: (Pick<ProcessExecutionStep, 'id' | 'description' | 'isDone'> & {
    step: Pick<ProcessStep, 'id'>
  })[]
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

import gql from 'graphql-tag'
import fragments, { EmployeeDetails, ProcessStepDetails } from '../fragments'
import { Process, ProcessExecutionStep, ProcessStep, Vacancy, ProcessExecution } from '../types'

export default gql`
  query getProcessExecutions($input: ProcessExecutionsInput) {
    processExecutions(input: $input) {
      id
      status
      process {
        id
        title
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
      employee
      finishDate
    }
  }
  ${fragments.Employee.Details}
  ${fragments.ProcessStep.Details}
`

type ProcessExecutionPick = {
  id: string
  status: ProcessExecution['status']
  process: Pick<Process, 'id' | 'type' | 'title'> & {
    steps: ProcessStepDetails[]
  }
  vacancy: Pick<Vacancy, 'id' | 'isPublished' | 'editable'> & {
    rotateEmployees: EmployeeDetails[]
    responsibleEmployees: EmployeeDetails[]
  }
  executionSteps: (Pick<ProcessExecutionStep, 'id' | 'description' | 'isDone'> & {
    step: Pick<ProcessStep, 'id'>
  })[]
  employee: string
  finishDate: string
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

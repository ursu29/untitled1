import gql from 'graphql-tag'
import fragments, { ProcessStepDetails, EmployeeDetails } from '../fragments'
import {
  Process,
  Vacancy,
  ProcessExecutionComment,
  ProcessExecutionStep,
  ProcessStep,
} from '../types'

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
      }
      executionSteps {
        id
        step {
          id
        }
        isDone
        comments {
          id
          body
          employee {
            ...EmployeeDetails
          }
        }
      }
    }
  }
  ${fragments.ProcessStep.Details}
  ${fragments.Employee.Details}
`

type ProcessExecutionPick = {
  id: string
  process: Pick<Process, 'id' | 'type'> & {
    steps: ProcessStepDetails[]
  }
  vacancy: Pick<Vacancy, 'id' | 'isPublished'>
  executionSteps: (Pick<ProcessExecutionStep, 'id' | 'isDone'> & {
    step: Pick<ProcessStep, 'id'>
    comments: Pick<ProcessExecutionComment, 'id' | 'body'> & {
      employee: EmployeeDetails
    }
  })[]
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

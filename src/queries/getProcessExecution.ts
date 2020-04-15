import gql from 'graphql-tag'
import fragments, { ProcessStepDetails } from '../fragments'
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
  ${fragments.ProcessStep.Details}
`

type ProcessExecutionPick = {
  id: string
  process: Pick<Process, 'id' | 'type'> & {
    steps: ProcessStepDetails[]
  }
  vacancy: Pick<Vacancy, 'id' | 'isPublished'>
  executionSteps: (Pick<ProcessExecutionStep, 'id' | 'description' | 'isDone'> & {
    step: Pick<ProcessStep, 'id'>
    // comments: Pick<ProcessExecutionComment, 'id' | 'body'> & {
    //   employee: EmployeeDetails
    // }
  })[]
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

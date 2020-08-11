import gql from 'graphql-tag'
import {
  Process,
  Vacancy,
  Project,
  Location,
  ProcessExecution,
  ProcessExecutionStep,
  ProcessStep,
} from '../types'
import { ProcessStepDetails } from '../fragments'

export default gql`
  {
    processExecutions {
      id
      process {
        id
        title
        customer
        type
        steps {
          id
          responsibleUsers {
            email
            name
          }
        }
      }
      executionSteps {
        id
        step {
          id
        }
        isDone
      }
      status
      vacancy {
        id
        position
        # employeeComment
      }
      project {
        id
        name
      }
      locations {
        id
        name
      }
      employee
      finishDate
    }
  }
`

type ProcessExecutionPick = {
  id: string
  process: Pick<Process, 'id' | 'title' | 'customer' | 'type'> & {
    steps: ProcessStepDetails[]
  }
  vacancy: Pick<Vacancy, 'id' | 'position' | 'employeeComment'>
  project: Pick<Project, 'id' | 'name'>
  locations: Pick<Location, 'id' | 'name'>[]
  status: ProcessExecution['status']
  employee: ProcessExecution['employee']
  finishDate: ProcessExecution['finishDate']
  executionSteps: (Pick<ProcessExecutionStep, 'id' | 'isDone'> & {
    step: Pick<ProcessStep, 'id'>
  })[]
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

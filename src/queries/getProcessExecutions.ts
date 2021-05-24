import { gql } from '@apollo/client'
import {
  Process,
  Vacancy,
  Project,
  ProcessExecution,
  ProcessExecutionStep,
  ProcessStep,
  Employee,
  LOCATION,
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
      }
      status
      substatus
      vacancy {
        id
        position
        isPublished
      }
      project {
        id
        name
        code
      }
      projectFrom {
        id
        name
        code
      }
      projectTo {
        id
        name
        code
      }
      locations
      employee
      employeeRef {
        id
        name
      }
      finishDate
      activeStepEmployees {
        id
        name
        email
      }
      prio
      updatedAt
    }
  }
`

type ProcessExecutionPick = {
  id: string
  process: Pick<Process, 'id' | 'title' | 'customer' | 'type'> & {
    steps: ProcessStepDetails[]
  }
  vacancy: Pick<Vacancy, 'id' | 'position' | 'employeeComment'>
  project: Pick<Project, 'id' | 'name' | 'code'>
  projectFrom: Pick<Project, 'id' | 'name' | 'code'>
  projectTo: Pick<Project, 'id' | 'name' | 'code'>
  locations: LOCATION[]
  status: ProcessExecution['status']
  substatus: ProcessExecution['substatus']
  employee: ProcessExecution['employee']
  employeeRef: ProcessExecution['employeeRef']
  finishDate: ProcessExecution['finishDate']
  executionSteps: (Pick<ProcessExecutionStep, 'id' | 'isDone'> & {
    step: Pick<ProcessStep, 'id'>
  })[]
  activeStepEmployees?: Employee[]
  prio: ProcessExecution['prio']
  updatedAt: ProcessExecution['updatedAt']
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

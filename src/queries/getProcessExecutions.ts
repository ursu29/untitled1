import { gql } from "@apollo/client";
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
  locations: LOCATION[]
  status: ProcessExecution['status']
  employee: ProcessExecution['employee']
  employeeRef: ProcessExecution['employeeRef']
  finishDate: ProcessExecution['finishDate']
  executionSteps: (Pick<ProcessExecutionStep, 'id' | 'isDone'> & {
    step: Pick<ProcessStep, 'id'>
  })[]
  activeStepEmployees?: Employee[]
  prio: ProcessExecution['prio']
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

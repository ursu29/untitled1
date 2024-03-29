import { gql } from '@apollo/client'
import fragments, { EmployeeDetails, ProcessStepDetails } from '../fragments'
import {
  Process,
  ProcessExecutionStep,
  ProcessStep,
  Vacancy,
  ProcessExecution,
  LOCATION,
} from '../types'

export default gql`
  query getProcessExecutions($input: ProcessExecutionsInput) {
    processExecutions(input: $input) {
      id
      status
      substatus
      locations
      process {
        id
        title
        type
        customer
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
          type
        }
        description
        isDone
      }
      employee
      employeeRef {
        id
        name
        isDismissed
        agileManager {
          id
          name
          email
        }
      }
      finishDate
      employeePhone
      swissReOffboardingDate
      isIndependentStepsActive
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
    }
  }
  ${fragments.Employee.Details}
  ${fragments.ProcessStep.Details}
`

type ProcessExecutionPick = {
  id: string
  status: ProcessExecution['status']
  substatus: ProcessExecution['substatus']
  locations: LOCATION[]
  process: Pick<Process, 'id' | 'type' | 'title' | 'customer'> & {
    steps: ProcessStepDetails[]
  }
  vacancy: Pick<Vacancy, 'id' | 'isPublished' | 'editable'> & {
    rotateEmployees: EmployeeDetails[]
    responsibleEmployees: EmployeeDetails[]
  }
  executionSteps: (Pick<ProcessExecutionStep, 'id' | 'description' | 'isDone'> & {
    step: Pick<ProcessStep, 'id' | 'type'>
  })[]
  employee: string
  employeeRef: EmployeeDetails & { agileManager: EmployeeDetails; isDismissed: boolean }
  finishDate: string
  employeePhone: string
  swissReOffboardingDate: string
  isIndependentStepsActive: boolean
  project: {
    id: string
    name: string
    code: string
  }
  projectFrom: {
    id: string
    name: string
    code: string
  }
  projectTo: {
    id: string
    name: string
    code: string
  }
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

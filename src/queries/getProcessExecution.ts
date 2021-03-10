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
      }
      finishDate
      employeePhone
      swissReOffboardingDate
      isIndependentStepsActive
    }
  }
  ${fragments.Employee.Details}
  ${fragments.ProcessStep.Details}
`

type ProcessExecutionPick = {
  id: string
  status: ProcessExecution['status']
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
  employeeRef: EmployeeDetails
  finishDate: string
  employeePhone: string
  swissReOffboardingDate: string
  isIndependentStepsActive: boolean
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

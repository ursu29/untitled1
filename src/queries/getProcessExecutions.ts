import gql from 'graphql-tag'
import { Process, Vacancy, Project, Location, ProcessExecution } from '../types'

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
  process: Pick<Process, 'id' | 'title' | 'customer' | 'type'>
  vacancy: Pick<Vacancy, 'id' | 'position' | 'employeeComment'>
  project: Pick<Project, 'id' | 'name'>
  locations: Pick<Location, 'id' | 'name'>[]
  status: ProcessExecution['status']
  employee: ProcessExecution['employee']
  finishDate: ProcessExecution['finishDate']
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

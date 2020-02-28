import gql from 'graphql-tag'
import { Process, Vacancy } from '../types'

export default gql`
  query getProcessExecutions($input: ProcessExecutionsInput) {
    processExecutions {
      id
      process {
        id
      }
      vacancy {
        id
        position
      }
    }
  }
`

type ProcessExecutionPick = {
  id: string
  process: Pick<Process, 'id'>
  vacancy: Pick<Vacancy, 'id' | 'position'>
}

export type QueryType = {
  processExecutions: ProcessExecutionPick[]
}

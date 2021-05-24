import { gql } from '@apollo/client'
import fragments, { ProcessStepDetails } from '../fragments'
import { Process } from '../types'

export default gql`
  query getProcesses($id: ID!) {
    process(id: $id) {
      id
      title
      customer
      type
      steps {
        ...ProcessStepDetails
      }
    }
  }
  ${fragments.ProcessStep.Details}
`

type ProcessPick = Pick<Process, 'id' | 'customer' | 'type' | 'title'> & {
  steps: ProcessStepDetails[]
}

export type QueryType = {
  process: ProcessPick
}

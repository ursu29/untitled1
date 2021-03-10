import gql from 'graphql-tag'
import fragments, { ProcessStepDetails } from '../fragments'
import { Process } from '../types'

export default gql`
  {
    processes {
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
  processes: ProcessPick[]
}

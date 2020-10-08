import gql from 'graphql-tag'
import { WorkspaceType, WorkspacePoolType } from '../types'

export const workspacePoolQuery = gql`
  query workspacePoolQuery($input: GetWorkspacePoolInput) {
    workspacePool(input: $input) {
      id
      workspaces {
        id
        name
      }
    }
  }
`

export const workspaceQuery = gql`
  query workspace($input: GetWorkspaceInput, $bookingsInput: BookingsInput) {
    workspace(input: $input) {
      id
      drawing
      workplaces {
        id
        coordX
        coordY
        number
        bookings(input: $bookingsInput) {
          id
          employeeEmail
          startDate
          finishDate
        }
      }
    }
  }
`

export const workspaceDesignAccessQuery = gql`
  query workspaceDesignAccess {
    workspaceDesignAccess {
      write
    }
  }
`

export const WORKSPACE = {
  create: gql`
    mutation createWorkspace($input: CreateWorkspaceInput) {
      createWorkspace(input: $input) {
        id
        name
      }
    }
  `,
  update: gql`
    mutation updateWorkspace($input: UpdateWorkspaceInput) {
      updateWorkspace(input: $input) {
        id
      }
    }
  `,
  delete: gql`
    mutation deleteWorkspace($input: DeleteWorkspaceInput) {
      deleteWorkspace(input: $input) {
        id
      }
    }
  `,
}

export const WORKPLACE = {
  create: gql`
    mutation createWorkplace($input: CreateWorkplaceInput) {
      createWorkplace(input: $input) {
        id
        coordX
        coordY
      }
    }
  `,
  update: gql`
    mutation updateWorkplace($input: UpdateWorkplaceInput) {
      updateWorkplace(input: $input) {
        id
        coordX
        coordY
        number
      }
    }
  `,
  delete: gql`
    mutation deleteWorkplace($input: DeleteWorkplaceInput) {
      deleteWorkplace(input: $input) {
        id
      }
    }
  `,
}

export const BOOKING = {
  create: gql`
    mutation createWorkplaceBooking($input: CreateWorkplaceBookingInput) {
      createWorkplaceBooking(input: $input) {
        id
        workplace {
          id
        }
        startDate
        finishDate
      }
    }
  `,
  delete: gql`
    mutation deleteWorkplaceBooking($input: DeleteWorkplaceBookingInput) {
      deleteWorkplaceBooking(input: $input) {
        id
      }
    }
  `,
}

export type WorkspaceQueryType = {
  workspace: WorkspaceType
}

export type WorkspacePoolQueryType = {
  workspacePool: WorkspacePoolType
}

export type workspaceDesignAccessQueryType = {
  workspaceDesignAccess: {
    write: boolean
  }
}

import gql from 'graphql-tag'
import { WorkspaceType } from '../types'

export const workspacePoolQuery = gql`
  query workspacePoolQuery($input: WorkspacesInput) {
    workspaces(input: $input) {
      id
      name
    }
  }
`

export const workspaceQuery = gql`
  query workspace($id: ID!, $bookingsInput: BookingsInput) {
    workspace(id: $id) {
      id
      drawing
      workplaces {
        id
        coordX
        coordY
        number
        bookings(input: $bookingsInput) {
          id
          employeeId
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
    mutation deleteWorkspace($id: ID!) {
      deleteWorkspace(id: $id) {
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
    mutation deleteWorkplace($id: ID!) {
      deleteWorkplace(id: $id) {
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
    mutation deleteWorkplaceBooking($id: ID!) {
      deleteWorkplaceBooking(id: $id) {
        id
        startDate
        finishDate
      }
    }
  `,
}

export type WorkspaceQueryType = {
  workspace: WorkspaceType
}

export type WorkspacePoolQueryType = {
  workspaces: WorkspaceType[]
}

export type workspaceDesignAccessQueryType = {
  workspaceDesignAccess: {
    write: boolean
  }
}

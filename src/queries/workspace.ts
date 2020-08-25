import gql from 'graphql-tag'
import { WorkspaceType } from '../types'

export const workspaceQuery = gql`
  query workspace($input: GetWorkspaceInput) {
    workspace(input: $input) {
      id
      drawing
      workplaces {
        id
        coordX
        coordY
        bookings(input: $input) {
          id
          employeeEmail
          startDate
          finishDate
        }
      }
    }
  }
`

export const updateWorkspace = gql`
  mutation updateWorkspace($input: UpdateWorkspaceInput) {
    updateWorkspace(input: $input) {
      id
    }
  }
`

// Workplace

export const createWorkplaceMutation = gql`
  mutation createWorkplace($input: CreateWorkplaceInput) {
    createWorkplace(input: $input) {
      id
      coordX
      coordY
    }
  }
`
export const updateWorkplaceMutation = gql`
  mutation updateWorkplace($input: UpdateWorkplaceInput) {
    updateWorkplace(input: $input) {
      id
      coordX
      coordY
    }
  }
`
export const deleteWorkplaceMutation = gql`
  mutation deleteWorkplace($input: DeleteWorkplaceInput) {
    deleteWorkplace(input: $input) {
      id
    }
  }
`

// Workplace booking

export const createWorkplaceBookingMutation = gql`
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
`

export type WorkspaceQueryType = {
  workspace: WorkspaceType
}

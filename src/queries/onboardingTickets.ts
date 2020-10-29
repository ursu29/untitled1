import gql from 'graphql-tag'
import { OnboardingTicket } from '../types'

export const getOnboardingTickets = gql`
  query onboardingTickets {
    onboardingTickets {
      id
      title
      description
      responsible {
        id
        name
        position
        email
      }
    }
  }
`

export const onboardingAccess = gql`
  query onboardingAccess {
    onboardingAccess {
      read
      write
    }
  }
`

export const employeeOnboardingTickets = gql`
  query employeeOnboardingTickets {
    employeeOnboardingTickets
  }
`

export const createOnboardingTicket = gql`
  mutation createOnboardingTicket($input: CreateOnboardingTicketInput) {
    createOnboardingTicket(input: $input) {
      id
    }
  }
`
export const deleteOnboardingTicket = gql`
  mutation deleteOnboardingTicket($input: DeleteOnboardingTicketInput) {
    deleteOnboardingTicket(input: $input) {
      id
    }
  }
`
export const updateOnboardingTicket = gql`
  mutation updateOnboardingTicket($input: UpdateOnboardingTicketInput) {
    updateOnboardingTicket(input: $input) {
      id
    }
  }
`

export const completeOnboardingTicket = gql`
  mutation completeOnboardingTicket($input: CompleteOnboardingTicketInput) {
    completeOnboardingTicket(input: $input)
  }
`

export type OnboardingTicketsQueryType = {
  onboardingTickets: OnboardingTicket[]
}
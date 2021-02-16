import gql from 'graphql-tag'
import { OnboardingTicket } from '../types'
import fragments, { EmployeeDetails } from '../fragments'

export const getOnboardingTickets = gql`
  query onboardingTickets {
    onboardingTickets {
      ...OnboardingTicketDetails
    }
  }
  ${fragments.OnboardingTicket}
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

export const requestOnboardingTicket = gql`
  mutation requestOnboardingTicket($id: ID!) {
    requestOnboardingTicket(id: $id)
  }
`

export const getEmployeesOnboardingTickets = gql`
  query getEmployeesOnboardingTickets($withResponsible: String) {
    employees {
      ...EmployeeDetails
      requestedOnboardingTickets(withResponsible: $withResponsible) {
        ...OnboardingTicketDetails
      }
    }
  }
  ${fragments.Employee.Details}
  ${fragments.OnboardingTicket}
`

export type OnboardingTicketsQueryType = {
  onboardingTickets: OnboardingTicket[]
}

export type EmployeesOnboardingTicketsQueryType = {
  employees: (EmployeeDetails & { requestedOnboardingTickets: OnboardingTicket[] })[]
}

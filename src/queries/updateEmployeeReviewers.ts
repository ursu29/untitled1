import { gql } from '@apollo/client'

export const updateDevelopmentPlanReviewers = gql`
  mutation updateEmployee($input: ReviewerInput) {
    updateDevelopmentPlanReviewers(input: $input) {
      id
      name
      email
    }
  }
`

export const updateMatricesReviewers = gql`
  mutation updateEmployee($input: ReviewerInput) {
    updateMatricesReviewers(input: $input) {
      id
      name
      email
    }
  }
`

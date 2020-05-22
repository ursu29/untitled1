import gql from 'graphql-tag'

export const updateDevelopmentPlanReviewers = gql`
  mutation updateEmployee($input: ReviewerInput) {
    updateDevelopmentPlanReviewers(input: $input) {
      id
      name
      email
      avatar
    }
  }
`

export const updateMatricesReviewers = gql`
  mutation updateEmployee($input: ReviewerInput) {
    updateMatricesReviewers(input: $input) {
      id
      name
      email
      avatar
    }
  }
`

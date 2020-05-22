import gql from 'graphql-tag'

const getDevelopmentPlanReviewers = gql`
  query getEmployees($email: String!) {
    employeeByEmail(email: $email) {
      id
      developmentPlanReviewers {
        id
        name
        email
        avatar
      }
    }
  }
`

const getMatricesReviewers = gql`
  query getEmployees($email: String!) {
    employeeByEmail(email: $email) {
      id
      matricesReviewers {
        id
        name
        email
        avatar
      }
    }
  }
`

const updateDevelopmentPlanReviewers = gql`
  mutation updateEmployee($input: ReviewerInput) {
    updateDevelopmentPlanReviewers(input: $input) {
      id
      name
      email
      avatar
    }
  }
`

const updateMatricesReviewers = gql`
  mutation updateEmployee($input: ReviewerInput) {
    updateMatricesReviewers(input: $input) {
      id
      name
      email
      avatar
    }
  }
`

export const reviewersQuery = {
  getDevelopmentPlanReviewers,
  getMatricesReviewers,
  updateDevelopmentPlanReviewers,
  updateMatricesReviewers,
}

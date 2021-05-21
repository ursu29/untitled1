import { gql } from "@apollo/client";

const getDevelopmentPlanReviewers = gql`
  query getEmployees($email: String!) {
    employeeByEmail(email: $email) {
      id
      developmentPlanReviewers {
        id
        name
        email
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
    }
  }
`

const updateMatricesReviewers = gql`
  mutation updateEmployee($input: ReviewerInput) {
    updateMatricesReviewers(input: $input) {
      id
      name
      email
    }
  }
`

export const reviewersQuery = {
  getDevelopmentPlanReviewers,
  getMatricesReviewers,
  updateDevelopmentPlanReviewers,
  updateMatricesReviewers,
}

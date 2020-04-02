import gql from 'graphql-tag'

export default gql`
  mutation publishVacancy($input: PublishVacancyInput) {
    publishVacancy(input: $input) {
      id
    }
  }
`

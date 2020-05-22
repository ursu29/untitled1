import gql from 'graphql-tag'

export default gql`
  mutation closeVacancy($input: CloseVacancyInput) {
    closeVacancy(input: $input) {
      id
    }
  }
`

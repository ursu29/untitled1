import gql from 'graphql-tag'

export default gql`
  mutation updateVacancy($input: UpdateVacancyInput) {
    updateVacancy(input: $input) {
      id
    }
  }
`

import { gql } from '@apollo/client'

export default gql`
  mutation updateVacancy($input: UpdateVacancyInput) {
    updateVacancy(input: $input) {
      id
    }
  }
`

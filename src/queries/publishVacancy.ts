import { gql } from '@apollo/client'

export default gql`
  mutation publishVacancy($input: PublishVacancyInput) {
    publishVacancy(input: $input) {
      id
    }
  }
`

import { gql } from "@apollo/client";

export default gql`
  mutation closeVacancy($input: CloseVacancyInput) {
    closeVacancy(input: $input) {
      id
    }
  }
`

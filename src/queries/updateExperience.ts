import gql from 'graphql-tag'

export default gql`
  mutation updateExperience($input: UpdateExperienceInput) {
    updateExperience(input: $input) {
      id
    }
  }
`

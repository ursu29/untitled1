import { gql } from '@apollo/client'

export default gql`
  mutation updateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
    }
  }
`

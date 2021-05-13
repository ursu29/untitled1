import { gql } from "@apollo/client";
import { FileDetails } from '../types'

export const fileDetailsFragment = gql`
  fragment FileDetailsFragment on FileDetails {
    id
    skills {
      id
      name
    }
  }
`

export const updateFileDetails = gql`
  mutation updateFileDetails($input: UpdateFileDetailsInput!) {
    updateFileDetails(input: $input) {
      ...FileDetailsFragment
    }
  }
  ${fileDetailsFragment}
`

export type UpdateFileDetailsMutation = {
  updateFileDetails: FileDetails
}

export type UpdateFileDetailsMutationInput = {
  input: {
    azureId: string
    skills: string[]
  }
}

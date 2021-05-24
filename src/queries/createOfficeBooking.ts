import { gql } from '@apollo/client'

export const createOfficeBooking = gql`
  mutation createOfficeBooking($input: CreateOfficeBookingInput!) {
    createOfficeBooking(input: $input)
  }
`

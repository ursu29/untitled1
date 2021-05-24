import { gql } from '@apollo/client'

export const cancelOfficeBooking = gql`
  mutation cancelOfficeBooking($input: CancelOfficeBookingInput!) {
    cancelOfficeBooking(input: $input)
  }
`

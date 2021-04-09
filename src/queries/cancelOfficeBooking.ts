import gql from 'graphql-tag'

export const cancelOfficeBooking = gql`
  mutation cancelOfficeBooking($input: CancelOfficeBookingInput!) {
    cancelOfficeBooking(input: $input)
  }
`

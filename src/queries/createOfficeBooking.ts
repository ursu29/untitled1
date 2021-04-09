import gql from 'graphql-tag'

export const createOfficeBooking = gql`
  mutation createOfficeBooking($input: CreateOfficeBookingInput!) {
    createOfficeBooking(input: $input)
  }
`

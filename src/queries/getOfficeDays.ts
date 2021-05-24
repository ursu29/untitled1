import { gql } from '@apollo/client'
import { Employee, LOCATION, OfficeDay } from '../types'

export const getOfficeDays = gql`
  query getOfficeDays($input: OfficeDaysInput) {
    officeDays(input: $input) {
      id
      date
      employeeLimit
      location
      employees {
        id
      }
    }
  }
`

type OfficeDayPick = Pick<OfficeDay, 'id' | 'date' | 'employeeLimit'> & {
  location: LOCATION
  employees: Pick<Employee, 'id'>[]
}

export type QueryType = {
  officeDays: OfficeDayPick[]
}

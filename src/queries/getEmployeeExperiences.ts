import gql from 'graphql-tag'
import { Employee } from '../types'
import fragments, { ExperienceDetails } from '../fragments'

export default gql`
  query getEmployeeExperiences($input: EmployeesInput) {
    employees(input: $input) {
      id
      name
      experiences {
        ...ExperienceDetails
      }
      access {
        read
        write
      }
    }
  }
  ${fragments.Experience.Details}
`

type EmployeePick = Pick<Employee, 'id' | 'name' | 'access'> & {
  experiences: ExperienceDetails[]
}

export type QueryType = {
  employees: EmployeePick[]
}

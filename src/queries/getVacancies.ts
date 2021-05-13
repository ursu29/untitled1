import { gql } from "@apollo/client";
import { Vacancy, Project, Employee, LOCATION } from '../types'

export default gql`
  query getVacancies($input: VacanciesInput) {
    vacancies(input: $input) {
      id
      reason
      locations
      position
      responsibilities
      requiredSkills
      additionalSkills
      description
      project {
        id
        name
      }
      customer
      isPublished
      isClosed
      rotateEmployees {
        id
        isMe
      }
      employeeExperience
      englishLevel
      stack
    }
  }
`

export type VacancyPick = Pick<
  Vacancy,
  | 'id'
  | 'reason'
  | 'position'
  | 'responsibilities'
  | 'description'
  | 'requiredSkills'
  | 'employeeExperience'
  | 'englishLevel'
  | 'stack'
  | 'additionalSkills'
  | 'isPublished'
  | 'isClosed'
> & {
  project: Pick<Project, 'id' | 'name'>
  locations: LOCATION[]
  rotateEmployees: Pick<Employee, 'id' | 'isMe'>[]
}

export type QueryType = {
  vacancies: VacancyPick[]
}

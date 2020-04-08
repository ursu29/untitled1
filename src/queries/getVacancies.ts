import gql from 'graphql-tag'
import { Vacancy, Project, Location, Employee } from '../types'

export default gql`
  query getVacancies($input: VacanciesInput) {
    vacancies(input: $input) {
      id
      reason
      locations {
        id
        name
        code
      }
      position
      responsibilities
      requiredSkills
      additionalSkills
      project {
        id
        name
      }
      customer
      isPublished
      rotateEmployees {
        id
        isMe
      }
    }
  }
`

type VacancyPick = Pick<
  Vacancy,
  'id' | 'reason' | 'position' | 'responsibilities' | 'requiredSkills' | 'additionalSkills'
> & {
  project: Pick<Project, 'id' | 'name'>
  locations: Pick<Location, 'id' | 'name' | 'code'>[]
  rotateEmployees: Pick<Employee, 'id' | 'isMe'>[]
}

export type QueryType = {
  vacancies: VacancyPick[]
}

import { gql } from '@apollo/client'
import {
  Employee,
  Experience,
  ProcessStep,
  Vacancy,
  Skill,
  Project,
  Process,
  LOCATION,
} from './types'
import { Level } from './types/graphql'

const fragments = {
  Employee: {
    Details: gql`
      fragment EmployeeDetails on Employee {
        id
        name
        location
        country
        position
        phoneNumber
        email
        isMe
        startDate
        birthday
      }
    `,
  },
  Project: gql`
    fragment ProjectDetails on Project {
      id
      name
      code
      description
    }
  `,
  Experience: {
    Details: gql`
      fragment ExperienceDetails on Experience {
        id
        level
        skill {
          id
          name
          description
          isMatrixOnly
        }
        updatedAt
      }
    `,
  },
  Skill: {
    Details: gql`
      fragment SkillDetails on Skill {
        id
        name
        description
        parent {
          id
        }
        isMatrixOnly
      }
    `,
  },
  Vacancy: {
    Details: gql`
      fragment VacancyDetails on Vacancy {
        id
        reason
        position
        responsibilities
        requiredSkills
        additionalSkills
        locations
        project {
          id
        }
        isPublished
        isClosed
      }
    `,
  },
  ProcessStep: {
    Details: gql`
      fragment ProcessStepDetails on ProcessStep {
        id
        title
        description
        type
        responsibleUsers {
          id
          name
          email
          isMe
        }
        sendToTeamlead
        hasComment
        send24hoursNotification
        isAgileResponsible
        parentSteps {
          id
        }
        process {
          id
          type
        }
      }
    `,
  },
  OnboardingTicket: gql`
    fragment OnboardingTicketDetails on OnboardingTicket {
      id
      title
      description
      responsible {
        id
        name
        position
        email
      }
      isOptional
      isSwissre
      isRequestedByMe
    }
  `,
}

export default fragments

export type EmployeeDetails = Pick<
  Employee,
  | 'id'
  | 'name'
  | 'location'
  | 'country'
  | 'position'
  | 'phoneNumber'
  | 'email'
  | 'isMe'
  | 'startDate'
  | 'birthday'
>

export type ProjectDetails = Pick<Project, 'id' | 'name' | 'code' | 'description'>

export type ExperienceDetails = Pick<Experience, 'id' | 'updatedAt' | 'comment'> & {
  level: Level
  skill: Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>
}

export type SkillDetails = Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'> & {
  parent: Pick<Skill, 'id'>
}

export type VacancyDetails = Exclude<Vacancy, 'locations' | 'project'> & {
  locations: LOCATION[]
  project: Pick<Project, 'id'>
}

export type ProcessStepDetails = Pick<
  ProcessStep,
  | 'id'
  | 'title'
  | 'description'
  | 'type'
  | 'sendToTeamlead'
  | 'isAgileResponsible'
  | 'hasComment'
  | 'send24hoursNotification'
> & {
  responsibleUsers: Pick<Employee, 'id' | 'name' | 'email' | 'isMe'>[] | null
  parentSteps: Pick<ProcessStep, 'id'>[]
  process: Pick<Process, 'id' | 'type'>
}

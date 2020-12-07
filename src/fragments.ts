import gql from 'graphql-tag'
import {
  Employee,
  Experience,
  ProcessStep,
  Vacancy,
  Level,
  Skill,
  Location,
  Project,
  Process,
} from './types'

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
        level {
          id
          index
          name
        }
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
        locations {
          id
        }
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
      isSwissRe
      isRequestedByMe
    }
  `,
}

export default fragments

export type EmployeeDetails = Pick<
  Employee,
  'id' | 'name' | 'location' | 'country' | 'position' | 'phoneNumber' | 'email' | 'isMe'
>

export type ProjectDetails = Pick<Project, 'id' | 'name' | 'code' | 'description'>

export type ExperienceDetails = Pick<Experience, 'id' | 'updatedAt' | 'comment'> & {
  level: Pick<Level, 'id' | 'index' | 'name'>
  skill: Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>
}

export type SkillDetails = Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'> & {
  parent: Pick<Skill, 'id'>
}

export type VacancyDetails = Exclude<Vacancy, 'locations' | 'project'> & {
  locations: Pick<Location, 'id'>
  project: Pick<Project, 'id'>
}

export type ProcessStepDetails = Pick<
  ProcessStep,
  | 'id'
  | 'title'
  | 'description'
  | 'type'
  | 'sendToTeamlead'
  | 'hasComment'
  | 'send24hoursNotification'
> & {
  responsibleUsers: Pick<Employee, 'id' | 'name' | 'email' | 'isMe'>[] | null
  parentSteps: Pick<ProcessStep, 'id'>[]
  process: Pick<Process, 'id' | 'type'>
}

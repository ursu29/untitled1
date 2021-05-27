import { gql } from '@apollo/client'
import { ArchivedDPVersion } from '../types'

export const archiveDP = gql`
  mutation archiveDP($input: ArchiveDPInput) {
    archiveDP(input: $input) {
      compressedData {
        id
      }
    }
  }
`

export const archivedDPVersions = gql`
  query archivedDPVersions($input: ArchiveDPInput) {
    archivedDPVersions(input: $input) {
      id
      createdAt
    }
  }
`

export const getArchivedDP = gql`
  query getArchivedDP($input: GetArchivedDPInput) {
    archivedDP(input: $input) {
      compressedData {
        createdAt
        updatedAt
        developmentRoles {
          webDeveloper
          actuarialBusinessAnalyst
          agileCoach
          automationQA
          devOps
          infrastructureArchitect
          javaDeveloper
          dotnetDeveloper
          manualQA
          mathematician
          scrumMaster
          solutionArchitect
          teamLead
          uxExpert
          productOwner
          dataAnalyst
        }
        guildContribution {
          internalProject
          education
          noContribution
          startup
          custom
        }
        previousGoals {
          id
          description
          successCriteria
          isAchieved
          comment
        }
        actualGoals {
          id
          description
          successCriteria
          isAchieved
          comment
        }
        amountOfTime
        longTermGoals
        lookBackNegative
        lookBackPositive
        lookForward
        lastDiscussed
      }
    }
  }
`

export type ArchivedDPVersions = {
  archivedDPVersions: ArchivedDPVersion[]
}

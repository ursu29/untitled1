import { gql } from '@apollo/client'
import { DevelopmentPlan } from '../types'

export default gql`
  query getDevelopmentPlans($input: DevelopmentPlansInput!) {
    developmentPlans(input: $input) {
      id
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
        supportEngineer
        otherAreas
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
`
type DevelopmentPlanPick = Exclude<DevelopmentPlan, 'employee'>

export type QueryType = {
  developmentPlans: DevelopmentPlanPick
}

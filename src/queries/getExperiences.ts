import { gql } from "@apollo/client";
import fragments, { ExperienceDetails } from '../fragments'

export default gql`
  query getExperiences($input: ExperiencesInput) {
    experiences(input: $input) {
      ...ExperienceDetails
    }
  }
  ${fragments.Experience.Details}
`

export type QueryType = {
  experiences: ExperienceDetails[]
}

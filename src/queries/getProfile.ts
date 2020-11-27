import gql from 'graphql-tag'
import { StrapiGroups } from '../types'

export default gql`
  query getProfile {
    profile {
      id
      strapiId
      email
      strapiGroupsMembership
    }
    isAuthenticated
  }
`

export type ProfileType = {
  profile: {
    id: string
    strapiId: string
    email: string
    strapiGroupsMembership: (keyof typeof StrapiGroups)[]
  }
  isAuthenticated: boolean
}

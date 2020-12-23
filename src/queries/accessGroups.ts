import gql from 'graphql-tag'
import { ArchivedDPVersion } from '../types'

export const getMembersOfAccessGroup = gql`
  query getMembersOf($group: String) {
    getMembersOf(group: $group)
  }
`

export const updateAccessGroup = gql`
  mutation updateAccessGroup($input: UpdateAccessGroupInput) {
    updateAccessGroup(input: $input)
  }
`

export type ArchivedDPVersions = {
  archivedDPVersions: ArchivedDPVersion[]
}

export type GetMembersOfAccessGroupType = { getMembersOf: string[] }

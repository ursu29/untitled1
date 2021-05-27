import { gql } from '@apollo/client'
import { Employee, ArchivedDPVersion } from '../types'

export const getMembersOfAccessGroup = gql`
  query getMembersOf($group: String) {
    getMembersOf(group: $group) {
      id
    }
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

export type GetMembersOfAccessGroupType = { getMembersOf: Employee[] }

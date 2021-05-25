import { gql } from "@apollo/client";
import { Guild } from '../types'
import fragments from '../fragments'

export const getGuild = gql`
  query getGuild($input: GuildInput) {
    guild(input: $input) {
      id
      azureDisplayName
      azureId
      title
      description
      shortDescription
      skills {
        id
        name
        description
      }
      leaders {
        ...EmployeeDetails
      }
      accessWrite
    }
  }
  ${fragments.Employee.Details}
`

export const getGuilds = gql`
  query getGuilds {
    guilds {
      id
      azureDisplayName
      title
      description
      shortDescription
      leaders {
        id
        email
        name
      }
      skills {
        id
        name
        description
      }
    }
  }
`

export const updateGuild = gql`
  mutation updateGuild($input: UpdateGuildInput) {
    updateGuild(input: $input) {
      azureDisplayName
    }
  }
`

export type GuildQueryType = {
  guild: Guild
}

export type GuildsQueryType = {
  guilds: Guild[]
}

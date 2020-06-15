import gql from 'graphql-tag'
import { Guild } from '../types'

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
      accessWrite
    }
  }
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
        avatar
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

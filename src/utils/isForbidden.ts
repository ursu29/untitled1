import { ApolloError } from '@apollo/client'

export default function isForbidden(error: ApolloError | undefined) {
  return error?.graphQLErrors.map(i => i.extensions?.code).includes('FORBIDDEN')
}

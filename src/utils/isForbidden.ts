import { ApolloError } from 'apollo-client'

export default function (error: ApolloError | undefined) {
  return error?.graphQLErrors.map((i) => i.extensions?.code).includes('FORBIDDEN')
}

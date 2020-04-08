import { message } from 'antd'

const GRAPHQL_PREFIX_1 = 'GraphQL error: Unexpected error value: '
const GRAPHQL_PREFIX_2 = 'Error: GraphQL error: '
const trimError = (data: any) => {
  const text = data.toString()
  if (text.includes(GRAPHQL_PREFIX_1)) {
    return text.substring(text.indexOf(GRAPHQL_PREFIX_1) + GRAPHQL_PREFIX_1.length, text.length - 1)
  }
  if (text.includes(GRAPHQL_PREFIX_2)) {
    return text.substring(text.indexOf(GRAPHQL_PREFIX_2) + GRAPHQL_PREFIX_2.length, text.length - 1)
  }
  return text
}

const key = 'replace'

const success = (content: string) => message.success({ content, key })
const warning = (error: any) => message.warning({ content: trimError(error), key })
const error = (error: any) => message.error({ content: trimError(error), key })
const loading = (content: string) => message.loading({ content, key })

export default {
  success,
  warning,
  error,
  loading,
}

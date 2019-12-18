import { message } from 'antd'

const GRAPHQL_PREFIX = 'GraphQL error: Unexpected error value: "'
const trimError = (data: any) => {
  const text = data.toString()
  if (text.includes(GRAPHQL_PREFIX)) {
    return text.substring(text.indexOf(GRAPHQL_PREFIX) + GRAPHQL_PREFIX.length, text.length - 1)
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

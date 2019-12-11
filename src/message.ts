import { message } from 'antd'

const GRAPHQL_PREFIX = 'GraphQL error: Unexpected error value: "'
const trimError = (data: any) => {
  console.log(data)
  const text = data.toString()
  if (text.includes(GRAPHQL_PREFIX)) {
    return text.substring(text.indexOf(GRAPHQL_PREFIX) + GRAPHQL_PREFIX.length, text.length - 1)
  }
  return text
}

const key = 'replace'

const success = (content: string) => message.success({ content, key })
const warning = (error: any) => message.warning({ content: trimError(error), key })
const error = (error: any) => message.error(trimError(error))
const loading = (content: any) => message.loading({ content, key })

export default {
  success,
  warning,
  error,
  loading,
}

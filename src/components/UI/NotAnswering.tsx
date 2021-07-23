import { CloseCircleOutlined } from '@ant-design/icons'
import { ApolloError } from '@apollo/client'
import { Result, Typography } from 'antd'
import React from 'react'

const { Paragraph } = Typography

function NotAnswering({ error }: { error?: ApolloError }) {
  let errorMsg
  if (
    error?.graphQLErrors[0]?.extensions?.response?.url?.includes('strapi') &&
    error?.graphQLErrors[0]?.extensions?.code === 'FORBIDDEN'
  ) {
    errorMsg = 'Strapi connection failure'
  }
  if (error?.networkError?.message?.includes('Failed to fetch')) {
    errorMsg = 'Server is not answering'
  }
  //@ts-ignore
  if (!!error?.networkError?.response?.status) {
    //@ts-ignore
    errorMsg = error?.networkError?.response?.statusText || ''
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Result
        status="500"
        title="An error was ocurred."
        subTitle="Sorry, something went wrong, try to open this page later."
      >
        {!!error && (
          <Paragraph>
            <CloseCircleOutlined style={{ color: 'red' }} />{' '}
            {(!!errorMsg ? errorMsg + ' - ' : '') + error.toString()}
          </Paragraph>
        )}
      </Result>
    </div>
  )
}

export default React.memo(NotAnswering)

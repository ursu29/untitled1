import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import NotFound from './NotFound'
import Error from './Error'
import useOffset from '../../utils/useOffset'
import Skeleton from './Skeleton'

const Container = styled.div<{ offset: number; small: number; noBottom: boolean; noTop: boolean }>`
  padding: ${props => `${props.offset}px`};
  padding-bottom: ${props => (props.noBottom ? `${props.small}px` : `${props.offset}px`)};
  padding-top: ${props => (props.noTop ? `${props.small}px` : `${(2 * props.offset) / 3}px`)};
`

interface Props {
  error?: any
  loading?: boolean
  notFound?: boolean
  notFoundMessage?: string
  noBottom: boolean
  noTop: boolean
  style: any
}

export default function PageContent(props: Props & PropsWithChildren<any>) {
  const { error, loading, notFound, notFoundMessage, noBottom, noTop } = props
  const { offset, offsets } = useOffset()

  return (
    <Container offset={offset} small={offsets.SMALL} noBottom={noBottom} noTop={noTop}>
      {loading ? (
        <Skeleton loading={loading} />
      ) : error ? (
        <Error error={error} />
      ) : notFound ? (
        <NotFound message={notFoundMessage} />
      ) : (
        props.children
      )}
    </Container>
  )
}

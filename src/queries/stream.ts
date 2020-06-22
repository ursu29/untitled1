import gql from 'graphql-tag'
import { Stream } from '../types'

export const getStream = gql`
  query getStream($input: StreamsInput, $inputCount: TotalStreamsCountInput) {
    streams(input: $input) {
      id
      videoId
      name
      description
      duration
      privacyMode
      likes
      views
      comments
      publishedDate
      posterImageUrl
      creatorName
      creatorMail
      skills {
        id
        name
        description
      }
    }
    totalStreamsCount(input: $inputCount)
  }
`

export const updateStream = gql`
  mutation updateStream($input: UpdateStreamInput) {
    updateStream(input: $input) {
      id
    }
  }
`

export type StreamQueryType = {
  streams: Stream[]
  totalStreamsCount: number
}

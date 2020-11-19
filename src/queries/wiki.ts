import gql from 'graphql-tag'
import { WikiPage, WikiRootSection } from '../types'

export const getWikiRootSections = gql`
  query getWikiRootSections {
    wikiRootSections {
      id
      title
      description
      icon
      path
    }
  }
`

export const getWikiPage = gql`
  query getWikiPage($input: WikiPageInput) {
    wikiPage(input: $input) {
      id
      title
      body
      path
    }
  }
`

export const getPaths = gql`
  query getPaths($rootPath: String) {
    wikiPagesPaths(rootPath: $rootPath)
  }
`

export const updateWikiPage = gql`
  mutation updateWikiPage($input: UpdateWikiPageInput) {
    updateWikiPage(input: $input) {
      id
    }
  }
`

export const createWikiPage = gql`
  mutation createWikiPage($input: CreateWikiPageInput) {
    createWikiPage(input: $input) {
      path
    }
  }
`

export const removeWikiPage = gql`
  mutation removeWikiPage($input: RemoveWikiPageInput) {
    removeWikiPage(input: $input) {
      path
    }
  }
`

export type WikiPageQueryType = {
  wikiPage: WikiPage
}

export type WikiRootSectionQueryType = {
  wikiRootSections: [WikiRootSection]
}

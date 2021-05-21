import { useQuery, useMutation } from "@apollo/client";
import React from 'react'
import { getWikiPage, WikiPageQueryType, updateWikiPage } from '../../queries/wiki'
import { useLocation } from 'react-router-dom'
import PageContent from '../UI/PageContent'
import TitleEditable from '../UI/TitleEditable'
import MarkdownEditable from '../UI/MarkdownEditable'
import message from '../../message'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import Search from './Search'
import PageHeader from '../UI/PageHeader'

export default function Page() {
  const location = useLocation()
  const variables = { input: { path: location.pathname } }

  const writeWikiPageAccess = useStrapiGroupCheck('WIKI_EDITORS')
  const writeAccess = location.pathname.startsWith('/guilds-info') ? true : writeWikiPageAccess

  // Get page
  const { data, loading, error } = useQuery<WikiPageQueryType>(getWikiPage, {
    variables,
  })

  // Update page
  const [update] = useMutation(updateWikiPage, {
    onCompleted: () => message.success('Page has been updated'),
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getWikiPage, variables }],
    onError: message.error,
  })

  const handleSave = (value: any) => {
    update({ variables: { input: { id: data?.wikiPage?.id, ...value } } })
  }

  return (
    <>
      <PageHeader title="Wiki" withBack extra={[<Search />]} />
      <PageContent error={error} loading={loading} notFound={!data?.wikiPage}>
        <TitleEditable
          data={data?.wikiPage?.title || ''}
          editable={writeAccess}
          handleSave={(data: string) => handleSave({ title: data })}
        />
        <MarkdownEditable
          data={data?.wikiPage?.body || ''}
          editable={writeAccess}
          handleSave={(data: string) => handleSave({ body: data })}
        />
      </PageContent>
    </>
  )
}

import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { getWikiPage, WikiPageQueryType, updateWikiPage } from '../../queries/wiki'
import { useLocation } from 'react-router-dom'
import Controls from '../UI/Controls'
import PageContent from '../UI/PageContent'
import Back from '../UI/Back'
import TitleEditable from '../UI/TitleEditable'
import MarkdownEditable from '../UI/MarkdownEditable'
import message from '../../message'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'

export default function Page() {
  const location = useLocation()
  const variables = { input: { path: location.pathname } }

  const writeAccess = useStrapiGroupCheck(
    location.pathname.startsWith('/guilds-info') ? 'TECH_PORTAL' : 'HR_RU',
  )

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
    <PageContent error={error} loading={loading} notFound={!data?.wikiPage}>
      <Controls back={<Back />} />
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
  )
}

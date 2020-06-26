import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  getWikiPage,
  WikiPageQueryType,
  updateWikiPage,
  wikiEditingAccess,
} from '../../queries/wiki'
import { useLocation, RouteComponentProps, withRouter } from 'react-router-dom'
import Controls from '../UI/Controls'
import PageContent from '../UI/PageContent'
import Back from '../UI/Back'
import TitleEditable from '../UI/TitleEditable'
import MarkdownEditable from '../UI/MarkdownEditable'
import message from '../../message'

export default withRouter(({ history }: RouteComponentProps) => {
  const location = useLocation()
  const variables = { input: { path: location.pathname } }

  // Get editing access
  const { data: dataEditing } = useQuery(wikiEditingAccess)

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

  useEffect(() => {
    const openLink = (e: any) => {
      if (e.target && 'href' in e.target && e.target.tabIndex !== -1) {
        e.preventDefault()

        //@ts-ignore
        const link = e.target.href

        if (link.startsWith(window.location.origin)) {
          history.push('/' + link.split('/client/').slice(1).join(''))
        } else {
          window.open(link)
        }
      }
    }

    document.getElementById('markdown_editable')?.addEventListener('click', openLink)
    return () =>
      document.getElementById('markdown_editable')?.removeEventListener('click', openLink)
  })

  return (
    <PageContent error={error} loading={loading} notFound={!data?.wikiPage}>
      <Controls back={<Back />} />
      <TitleEditable
        data={data?.wikiPage?.title || ''}
        editable={dataEditing?.wikiEditingAccess.write}
        handleSave={(data: string) => handleSave({ title: data })}
      />
      <div id="markdown_editable" style={{ maxWidth: '600px' }}>
        <MarkdownEditable
          data={data?.wikiPage?.body || ''}
          editable={dataEditing?.wikiEditingAccess.write}
          handleSave={(data: string) => handleSave({ body: data })}
        />
      </div>
    </PageContent>
  )
})

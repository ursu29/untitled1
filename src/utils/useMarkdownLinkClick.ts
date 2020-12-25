import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export default function useMarkdownLinkClick(
  history: RouteComponentProps['history'],
  markdownId: string,
) {
  useEffect(() => {
    const openLink = (e: any) => {
      if (e.target && 'href' in e.target && e.target.tabIndex !== -1) {
        e.preventDefault()

        //@ts-ignore
        const link = e.target.href

        if (link.startsWith(window.location.origin)) {
          history.push(link.split(window.location.origin).slice(1).join(''))
        } else {
          window.open(link)
        }
      }
    }

    document.getElementById(markdownId)?.addEventListener('click', openLink)
    return () => document.getElementById(markdownId)?.removeEventListener('click', openLink)
  })
}

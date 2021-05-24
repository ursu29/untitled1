import React from 'react'
import { Helmet as ReactHelmet } from 'react-helmet'

export default function Helmet({ title, children }: { title?: string; children?: JSX.Element }) {
  return (
    <ReactHelmet title={`${title ? title + ' –' : ''} Syncretis Portal`}>{children}</ReactHelmet>
  )
}

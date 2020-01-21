import React from 'react'
import { GATEWAY } from '../../config'
import { DevelopmentPlan } from '../../types'
import Button from '../UI/Button'

type Props = {
  plan: DevelopmentPlan
}

export default function ExportMatrixToExcel({ plan }: Props) {
  const handleExport = () => {
    const url = `${GATEWAY}/export-development-plan`
    import('file-saver').then(({ saveAs }) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
        }),
      })
        .then(res => res.arrayBuffer())
        .then(data => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          })
          saveAs(blob, `development_plan_${new Date().toLocaleDateString()}.docx`)
        })
    })
  }
  return <Button onClick={handleExport}>Export</Button>
}

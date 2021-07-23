import React from 'react'
import { GATEWAY } from '../../config'
import { DevelopmentPlan, Employee } from '../../types'
import Button from '../UI/Button'

type Props = {
  plan: DevelopmentPlan
  employee: Pick<Employee, 'name'>
}

export default function ExportMatrixToExcel({ plan, employee }: Props) {
  const handleExport = () => {
    const url = `${GATEWAY}/export-development-plan`
    import('file-saver').then(({ saveAs }) => {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
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
          saveAs(blob, `development_plan_${employee.name}_${new Date().toLocaleDateString()}.docx`)
        })
    })
  }
  return <Button onClick={handleExport}>Export</Button>
}

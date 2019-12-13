import React from 'react'
import { Matrix, Employee } from '../../types'
import Button from '../UI/Button'
import { GATEWAY } from '../../config'

type Props = {
  matrix: Exclude<Matrix, 'access'>
  employee?: Pick<Employee, 'id' | 'name' | 'experiences'>
}

export default function ExportMatrixToExcel({ matrix, employee }: Props) {
  if (!employee) return null
  const experiences = employee.experiences
  const handleExport = () => {
    const url = `${GATEWAY}/export`
    import('file-saver').then(({ saveAs }) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matrix,
          experiences,
        }),
      })
        .then(res => res.arrayBuffer())
        .then(data => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          })
          saveAs(blob, `${matrix.title}_${employee.name}_${new Date().toLocaleDateString()}.xlsx`)
        })
    })
  }
  return <Button onClick={handleExport}>Export to excel</Button>
}

import React from 'react'
import { GATEWAY } from '../../config'
import { Employee, Evaluation, EvaluationAttribute, EvaluationReviewer } from '../../types'
import Button from '../UI/Button'

type Props = {
  evaluations?: Evaluation[]
  evaluationAttributes?: EvaluationAttribute[]
  employee: Pick<Employee, 'name'>
  reviewers?: {
    id: EvaluationReviewer['id']
    fromWho: Pick<Employee, 'id' | 'name' | 'isMe'>
    toWhom: Pick<Employee, 'id' | 'name'>
  }[]
}

export default function ExportEvaluations({
  evaluationAttributes,
  evaluations,
  employee,
  reviewers,
}: Props) {
  const handleExport = () => {
    const url = `${GATEWAY}/export-evaluations`
    import('file-saver').then(({ saveAs }) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          evaluationAttributes,
          evaluations,
          reviewers,
          employee,
        }),
      })
        .then(res => res.arrayBuffer())
        .then(data => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          })
          saveAs(
            blob,
            `self_evaluation_form_${employee.name}_${new Date().toLocaleDateString()}.docx`,
          )
        })
    })
  }
  return (
    <Button disabled={!evaluations} onClick={handleExport}>
      Export
    </Button>
  )
}

import React from 'react'
import { Table, Rate, Icon } from 'antd'
import { EvaluationAttribute, EvaluationReviewer, Evaluation, Employee } from '../../types'

const parent: { title: string; key: string; children?: any }[] = [
  {
    title: 'Quality of work',
    key: 'quality_of_work',
  },
  {
    title: 'Job Competence',
    key: 'job_competence',
  },
  {
    title: 'Communcation skills',
    key: 'communication_skills',
  },
  {
    title: 'Problem solving and decision making',
    key: 'problem_solving',
  },
  {
    title: 'Planning and organizational skills',
    key: 'planning',
  },
  {
    title: 'Time management',
    key: 'time_management',
  },
  {
    title: 'Initiative and resourcefulness',
    key: 'initiative',
  },
]

interface Props {
  evaluationAttributes?: Exclude<EvaluationAttribute, 'evaluations'>[]
  evaluations?: Evaluation[]
  employee: Pick<Employee, 'id' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
  reviewers?: {
    id: EvaluationReviewer['id']
    fromWho: Pick<Employee, 'id' | 'name'>
    toWhom: Pick<Employee, 'id' | 'name'>
  }[]
  onEvaluate: (value: { toWhom: string; evaluation: number; evaluationAttribute: string }) => void
  DeleteEmployeeReviewer: any
  editable: boolean
}

export default function EvaluationTable({
  evaluationAttributes,
  onEvaluate,
  employee,
  evaluations,
  editable,
  DeleteEmployeeReviewer,
  reviewers = [],
}: Props) {
  if (!evaluationAttributes?.length) return <div>Attributes are not found</div>

  const tree = parent
    .map(i => {
      const attributes = (evaluationAttributes || [])
        .filter(attribute => attribute.group === i.key)
        .map(i => ({ ...i, key: i.id }))
        .sort((a, b) => a.index - b.index)
      return {
        ...i,
        children: attributes.length ? attributes : null,
      }
    })
    .filter(i => i.children)

  const columns: any = [
    {
      title: 'Attribute description',
      dataIndex: 'title',
      width: 400,
      render: (text: any, item: any) => {
        if (item.children) return <strong>{item.title}</strong>

        const myEvaluation =
          evaluations?.find(i => {
            return i.evaluationAttribute.id === item.id && i.fromWho.id === employee.id
          })?.evaluation || 0

        const myManagerEvaluation =
          evaluations?.find(i => {
            return i.evaluationAttribute.id === item.id && i.fromWho.id === employee.manager.id
          })?.evaluation || 0

        return (
          <div key={item.key} style={{ paddingLeft: 16, display: 'flex', alignItems: 'center' }}>
            <Icon
              type="exclamation"
              style={{
                color: '#FAAD14',
                fontSize: '150%',
                fontWeight: 'bold',
                visibility: myEvaluation !== myManagerEvaluation ? 'visible' : 'hidden',
              }}
            />
            {item.title}
          </div>
        )
      },
    },
    {
      title: 'You',
      align: 'center',
      width: 120,
      render: (text: any, item: any) => {
        if (item.children) return null
        const evaluation = evaluations?.find(i => {
          return i.evaluationAttribute.id === item.id && i.fromWho.id === employee.id
        })
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <Rate
              disabled={!employee.isMe}
              onChange={value => {
                onEvaluate({
                  toWhom: employee.id,
                  evaluation: value,
                  evaluationAttribute: item.id,
                })
              }}
              count={3}
              value={evaluation?.evaluation || 0}
            />
          </div>
        )
      },
    },
    {
      title: (
        <div>
          Team Lead<div>{employee.manager.name}</div>
        </div>
      ),
      align: 'center',
      width: 120,
      render: (text: any, item: any) => {
        if (item.children) return null
        const evaluation = evaluations?.find(i => {
          return i.evaluationAttribute.id === item.id && i.fromWho.id === employee.manager.id
        })
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <Rate
              disabled={!employee.manager.isMe}
              onChange={value => {
                onEvaluate({
                  toWhom: employee.id,
                  evaluation: value,
                  evaluationAttribute: item.id,
                })
              }}
              count={3}
              value={evaluation?.evaluation || 0}
            />
          </div>
        )
      },
    },
    ...reviewers?.map(reviewer => {
      return {
        title: editable ? <DeleteEmployeeReviewer reviewer={reviewer} /> : reviewer.fromWho.name,
        align: 'center',
        width: 120,
        render: (text: any, item: any) => {
          if (item.children) return null
          const evaluation = evaluations?.find(i => {
            return i.evaluationAttribute.id === item.id && i.fromWho.id === employee.manager.id
          })
          return (
            <div style={{ whiteSpace: 'nowrap' }}>
              <Rate
                disabled={!employee.manager.isMe}
                onChange={value => {
                  onEvaluate({
                    toWhom: employee.id,
                    evaluation: value,
                    evaluationAttribute: item.id,
                  })
                }}
                count={3}
                value={evaluation?.evaluation || 0}
              />
            </div>
          )
        },
      }
    }),
  ]

  return (
    <div>
      <Table
        style={{ maxWidth: 1100 }}
        expandIconAsCell={false}
        expandIconColumnIndex={-1}
        defaultExpandAllRows
        columns={columns}
        scroll={{ x: 500 }}
        dataSource={tree}
        pagination={false}
      />
    </div>
  )
}

import React from 'react'
import { Table, Rate, Icon, Input } from 'antd'
import {
  EvaluationAttribute,
  EvaluationComment,
  EvaluationReviewer,
  Evaluation,
  Employee,
} from '../../types'

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
  comments?: Exclude<EvaluationComment, 'employee'>[]
  employee: Pick<Employee, 'id' | 'name' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
  reviewers?: {
    id: EvaluationReviewer['id']
    fromWho: Pick<Employee, 'id' | 'name' | 'isMe'>
    toWhom: Pick<Employee, 'id' | 'name'>
  }[]
  onEvaluate: (value: { toWhom: string; evaluation: number; evaluationAttribute: string }) => void
  onComment: (value: { body: string; evaluationAttribute?: string }) => void
  DeleteEmployeeReviewer: any
  editable: boolean
}

export default function EvaluationTable({
  evaluationAttributes,
  onEvaluate,
  onComment,
  employee,
  evaluations,
  comments,
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

  const showBaseColumns = editable || employee.isMe

  let columns: any = [
    {
      title: 'Attribute description',
      dataIndex: 'title',
      width: 400,
      render: (text: any, item: any) => {
        if (item.children) return <strong>{item.title}</strong>

        const filtered = evaluations?.filter(i => i.evaluationAttribute.id === item.id) || []

        let showMark = false

        if (filtered.length !== 2 + reviewers.length) {
          // me + teamlead + reviewers
          showMark = true
        }

        if (filtered.length < 2) {
          showMark = true
          if (filtered.every(i => i.evaluation === 0)) {
            showMark = false
          }
        } else {
          if (filtered.some(i => i.evaluation !== filtered[0].evaluation)) {
            showMark = true
          }
        }

        const comment = comments?.find(i => {
          return i.evaluationAttribute?.id === item.id
        })

        return (
          <div style={{ paddingLeft: 16 }}>
            <div key={item.key} style={{ display: 'flex', alignItems: 'center' }}>
              {showBaseColumns && (
                <Icon
                  type="exclamation"
                  style={{
                    color: '#FAAD14',
                    fontSize: '150%',
                    fontWeight: 'bold',
                    visibility: showMark ? 'visible' : 'hidden',
                  }}
                />
              )}
              {item.title}
            </div>
            {showMark && (
              <Input
                placeholder="Comment"
                defaultValue={comment?.body}
                onChange={e => {
                  onComment({
                    evaluationAttribute: item.key,
                    body: e.target.value,
                  })
                }}
                style={{ marginTop: 8 }}
              />
            )}
          </div>
        )
      },
    },
  ]

  if (showBaseColumns) {
    columns.push({
      title: employee.isMe ? 'You' : employee.name,
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
    })

    if (employee.manager) {
      columns.push({
        title: (
          <div>
            Team Lead<div>{employee.manager?.name}</div>
          </div>
        ),
        align: 'center',
        width: 120,
        render: (text: any, item: any) => {
          if (item.children) return null
          const evaluation = evaluations?.find(i => {
            return i.evaluationAttribute.id === item.id && i.fromWho.id === employee.manager?.id
          })
          return (
            <div style={{ whiteSpace: 'nowrap' }}>
              <Rate
                disabled={!employee.manager?.isMe}
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
      })
    }
  }

  columns = columns.concat(
    reviewers?.map(reviewer => {
      return {
        title: editable ? <DeleteEmployeeReviewer reviewer={reviewer} /> : reviewer.fromWho.name,
        align: 'center',
        width: 120,
        render: (text: any, item: any) => {
          if (item.children) return null
          const evaluation = evaluations?.find(i => {
            return i.evaluationAttribute.id === item.id && i.fromWho.id === reviewer.fromWho.id
          })
          return (
            <div style={{ whiteSpace: 'nowrap' }}>
              <Rate
                disabled={!reviewer.fromWho.isMe}
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
  )

  const comment = comments?.find(i => !i.evaluationAttribute)

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
      <Input.TextArea
        placeholder="Overall comment"
        defaultValue={comment?.body}
        rows={4}
        onChange={e => {
          onComment({
            body: e.target.value,
          })
        }}
        style={{ marginTop: 8 }}
      />
    </div>
  )
}

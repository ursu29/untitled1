import React, { useState, useEffect } from 'react'
import { Table, Rate, Icon, Input, Tooltip, Modal } from 'antd'
import {
  EvaluationAttribute,
  EvaluationComment,
  EvaluationReviewer,
  Evaluation,
  Employee,
} from '../../types'
import { CommentEmpty, CommentFill } from './Icons'

import './style.css'

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
    title: 'Communication skills',
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
  onEvaluate: (value: {
    toWhom: string
    evaluation: number
    comment: string
    evaluationAttribute: string
  }) => void
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
  const [shownCommentCode, setShownCommentCode] = useState('')
  const [hoveredCommentCode, setHoveredCommentCode] = useState('')

  const initialCommentModal = {
    visible: false,
    evaluation: 0,
    evaluationAttribute: '',
    comment: '',
  }
  const [addCommentModal, setAddCommentModal] = useState(initialCommentModal)

  useEffect(() => {
    const addCommentCode = (e: any) => {
      //@ts-ignore
      setShownCommentCode(e?.target.id)
    }

    const removeCommentCode = (e: any) => {
      setHoveredCommentCode('')
      setShownCommentCode('')
    }

    Array.from(document.getElementsByClassName('table_cell')).forEach(e => {
      e?.addEventListener('mouseenter', addCommentCode)
      e?.addEventListener('mouseleave', removeCommentCode)
    })

    return () =>
      Array.from(document.getElementsByClassName('table_cell')).forEach(e => {
        e?.removeEventListener('mouseenter', addCommentCode)
        e?.removeEventListener('mouseleave', removeCommentCode)
      })
  })

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

  const TableCell = ({
    rateDisabled,
    itemId,
    cellCode,
    rateValue,
    comment,
  }: {
    rateDisabled: boolean
    itemId: string
    cellCode: string
    rateValue: number
    comment: string | undefined
  }) => {
    const commentHandleClick = () => {
      setAddCommentModal({
        visible: true,
        evaluation: rateValue,
        evaluationAttribute: itemId,
        comment: comment || '',
      })
      setHoveredCommentCode('')
      setShownCommentCode('')
    }

    return (
      <div
        className={comment?.length ? '' : 'table_cell'}
        id={cellCode}
        style={{
          width: '150px',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Rate
          disabled={rateDisabled}
          onChange={value => {
            onEvaluate({
              toWhom: employee.id,
              evaluation: value,
              comment: comment || '',
              evaluationAttribute: itemId,
            })
          }}
          count={3}
          value={rateValue}
        />

        {!rateDisabled && (
          <div
            style={{
              marginLeft: '90px',
              marginTop: '7px',
              cursor: 'pointer',
              position: 'absolute',
            }}
            onMouseOver={() => {
              setHoveredCommentCode(cellCode)
            }}
            onMouseOut={() => setHoveredCommentCode('')}
            onClick={commentHandleClick}
          >
            <CommentEmpty
              fill={
                hoveredCommentCode === cellCode && shownCommentCode === cellCode
                  ? 'gray'
                  : 'lightgray'
              }
            />
          </div>
        )}

        {comment && (
          <Tooltip title={comment} overlayClassName="styled_tooltip">
            <div
              onClick={() => {
                if (!rateDisabled) commentHandleClick()
              }}
              style={{
                marginLeft: '90px',
                marginTop: '7px',
                cursor: 'pointer',
                position: 'absolute',
              }}
            >
              <CommentFill />
            </div>
          </Tooltip>
        )}
      </div>
    )
  }

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

        // const comment = comments?.find(i => {
        //   return i.evaluationAttribute?.id === item.id
        // })

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
          </div>
        )
      },
    },
  ]

  if (showBaseColumns) {
    columns.push({
      title: employee.isMe ? 'You' : employee.name,
      width: 120,
      render: (text: any, item: any) => {
        if (item.children) return null
        const evaluation = evaluations?.find(i => {
          return i.evaluationAttribute.id === item.id && i.fromWho.id === employee.id
        })
        return (
          <TableCell
            rateDisabled={!employee.isMe}
            itemId={item.id}
            cellCode={item.id + ' you'}
            rateValue={evaluation?.evaluation || 0}
            comment={evaluation?.comment}
          />
        )
      },
    })

    if (employee.manager) {
      columns.push({
        title: (
          <div>
            Agile Manager<div>{employee.manager?.name}</div>
          </div>
        ),
        width: 120,
        render: (text: any, item: any) => {
          if (item.children) return null
          const evaluation = evaluations?.find(i => {
            return i.evaluationAttribute.id === item.id && i.fromWho.id === employee.manager?.id
          })
          return (
            <TableCell
              rateDisabled={!employee.manager?.isMe}
              itemId={item.id}
              cellCode={item.id + ' agile'}
              rateValue={evaluation?.evaluation || 0}
              comment={evaluation?.comment}
            />
          )
        },
      })
    }
  }

  columns = columns.concat(
    reviewers?.map((reviewer, index) => {
      return {
        title: editable ? <DeleteEmployeeReviewer reviewer={reviewer} /> : reviewer.fromWho.name,
        width: 120,
        render: (text: any, item: any) => {
          if (item.children) return null
          const evaluation = evaluations?.find(i => {
            return i.evaluationAttribute.id === item.id && i.fromWho.id === reviewer.fromWho.id
          })
          return (
            <TableCell
              rateDisabled={!reviewer.fromWho.isMe}
              itemId={item.id}
              cellCode={item.id + ' reviewer' + index}
              rateValue={evaluation?.evaluation || 0}
              comment={evaluation?.comment}
            />
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
        disabled={employee.isMe || !editable}
        onChange={e => {
          onComment({
            body: e.target.value,
          })
        }}
        style={{ marginTop: 8 }}
      />
      <Modal
        title="Comment"
        visible={addCommentModal.visible}
        onOk={() => {
          onEvaluate({
            toWhom: employee.id,
            evaluation: addCommentModal.evaluation,
            //@ts-ignore
            comment: document.getElementById('comment_text_area').value,
            evaluationAttribute: addCommentModal.evaluationAttribute,
          })
          setAddCommentModal(initialCommentModal)
        }}
        onCancel={() => setAddCommentModal(initialCommentModal)}
        okText="Post"
        cancelText="Cancel"
        centered
        closable={false}
        destroyOnClose
        style={{ maxWidth: '400px' }}
      >
        <Input.TextArea
          id="comment_text_area"
          autoSize={{ minRows: 4, maxRows: 4 }}
          rows={4}
          defaultValue={addCommentModal.comment}
        />
      </Modal>
    </div>
  )
}

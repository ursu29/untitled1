import React, { useState, useEffect } from 'react'
import { ExclamationOutlined } from '@ant-design/icons'
import { Table, Rate, Input, Tooltip } from 'antd'
import {
  EvaluationAttribute,
  EvaluationComment,
  EvaluationReviewer,
  Evaluation,
  Employee,
} from '../../types'
import { CommentEmpty, CommentFill } from './Icons'
import CommentModal from '../UI/CommentModal'

import './style.css'

const parent: { title: string; key: string; children?: any }[] = [
  {
    title: 'Quality of work',
    key: 'QUALITY_OF_WORK',
  },
  {
    title: 'Job Competence',
    key: 'JOB_COMPETENCE',
  },
  {
    title: 'Communication skills',
    key: 'COMMUNICATION_SKILLS',
  },
  {
    title: 'Problem solving and decision making',
    key: 'PROBLEM_SOLVING',
  },
  {
    title: 'Planning and organizational skills',
    key: 'PLANNING',
  },
  {
    title: 'Time management',
    key: 'TIME_MANAGEMENT',
  },
  {
    title: 'Initiative and resourcefulness',
    key: 'INITIATIVE',
  },
  {
    title: 'Free estimate',
    key: 'FREE_ESTIMATE',
  },
]

interface Props {
  evaluationAttributes?: Exclude<EvaluationAttribute, 'evaluations'>[]
  evaluations?: Evaluation[]
  comments?: Exclude<EvaluationComment, 'employee'>[]
  employee: Pick<Employee, 'id' | 'name' | 'isMe'> & {
    agileManager: Pick<Employee, 'id' | 'name' | 'isMe'>
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
  isArchivedChosen?: boolean
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
  isArchivedChosen,
  reviewers = [],
}: Props) {
  const [shownCommentCode, setShownCommentCode] = useState('')
  const [hoveredCommentCode, setHoveredCommentCode] = useState('')

  const initialCommentModal = {
    visible: false,
    evaluation: 0,
    evaluationAttribute: '',
    comment: '',
    title: '',
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

  const showBaseColumns = true // TODO: check access on upper level with evaluationReviewersAccess.read

  const TableCell = ({
    rateDisabled,
    isArchivedChosen,
    itemId,
    cellCode,
    rateValue,
    comment,
    textOnly,
    isTitle,
  }: {
    rateDisabled: boolean
    isArchivedChosen: boolean
    itemId: string
    cellCode: string
    rateValue: number
    comment: string | undefined
    textOnly: boolean
    isTitle?: boolean
  }) => {
    const commentHandleClick = (title: string) => {
      setAddCommentModal({
        visible: true,
        evaluation: rateValue,
        evaluationAttribute: itemId,
        comment: comment || '',
        title,
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
        {!textOnly && !isTitle ? (
          <>
            <Rate
              disabled={rateDisabled || isArchivedChosen}
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

            {!rateDisabled && !isArchivedChosen && (
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
                onClick={() => commentHandleClick('Comment')}
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
              <Tooltip title={comment} overlayClassName="styled_tooltip" color="white">
                <div
                  onClick={() => {
                    if (isArchivedChosen) return
                    if (!rateDisabled) commentHandleClick('Comment')
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
          </>
        ) : cellCode.split(' ')[1] === 'you' ? (
          <div
            style={{
              color: 'lightgray',
              width: '100%',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            -
          </div>
        ) : comment ? (
          <div
            onClick={() => {
              if (isArchivedChosen) return
              if (!rateDisabled) commentHandleClick('Your feedback')
            }}
            style={{
              maxWidth: '150px',
              maxHeight: '300px',
              overflowY: 'auto',
              whiteSpace: 'pre-line',
              cursor: 'pointer',
            }}
          >
            {comment}
          </div>
        ) : (
          !rateDisabled &&
          !isTitle && (
            <div
              onClick={() => {
                if (isArchivedChosen) return
                if (!rateDisabled) commentHandleClick('Your feedback')
              }}
              style={{
                color: 'lightgray',
                cursor: 'pointer',
                fontStyle: 'italic',
              }}
            >
              (feedback)
            </div>
          )
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

        if (['FREE_ESTIMATE'].includes(item.group)) showMark = false

        // const comment = comments?.find(i => {
        //   return i.evaluationAttribute?.id === item.id
        // })

        return (
          <div style={{ paddingLeft: 16 }}>
            <div key={item.key} style={{ display: 'flex', alignItems: 'center' }}>
              {showBaseColumns && (
                <ExclamationOutlined
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

  /**
   * If archive version was chosen
   */
  if (isArchivedChosen) {
    const title = (name: string | any) =>
      React.createElement('div', { key: name }, [
        `${parseName(name) || '(undefined)'}`,
        React.createElement(
          'div',
          { key: name, style: { fontSize: '13px', fontWeight: 100, color: 'gray' } },
          `${name}`,
        ),
      ])

    columns = columns.concat(
      Array.from(new Set(evaluations?.map(e => e.fromWho)))?.map((name, index) => {
        return {
          title: title(name),
          width: 120,
          render: (text: any, item: any) => {
            const evaluation = evaluations?.find(i => {
              return i.evaluationAttribute === item.id && i.fromWho === name
            })
            return (
              <TableCell
                rateDisabled={false}
                isArchivedChosen={!!isArchivedChosen}
                itemId={item.id}
                cellCode={item.id + ' archive' + index}
                rateValue={evaluation?.evaluation || 0}
                comment={evaluation?.comment}
                textOnly={['FREE_ESTIMATE'].includes(item.group) || false}
                isTitle={item.children}
              />
            )
          },
        }
      }),
    )
  }

  /**
   * If NOT archive version was chosen
   */
  if (!isArchivedChosen) {
    if (showBaseColumns) {
      columns.push({
        title: employee?.isMe ? 'You' : employee?.name,
        width: 120,
        render: (text: any, item: any) => {
          if (item.children) return null
          const evaluation = evaluations?.find(i => {
            return (
              i.evaluationAttribute.id === item.id &&
              i.fromWho?.id.toLowerCase() === employee.id.toLowerCase()
            )
          })

          return (
            <TableCell
              rateDisabled={!employee?.isMe}
              isArchivedChosen={!!isArchivedChosen}
              itemId={item.id}
              cellCode={item.id + ' you'}
              rateValue={evaluation?.evaluation || 0}
              comment={evaluation?.comment}
              textOnly={['FREE_ESTIMATE'].includes(item.group) || false}
            />
          )
        },
      })

      if (employee.agileManager) {
        columns.push({
          title: (
            <div>
              Agile Manager<div>{employee.agileManager?.name}</div>
            </div>
          ),
          width: 120,
          render: (text: any, item: any) => {
            if (item.children) return null
            const evaluation = evaluations?.find(i => {
              return (
                i.evaluationAttribute.id === item.id &&
                i.fromWho?.id.toLowerCase() === employee.agileManager?.id.toLowerCase()
              )
            })
            return (
              <TableCell
                rateDisabled={!employee.agileManager?.isMe}
                isArchivedChosen={!!isArchivedChosen}
                itemId={item.id}
                cellCode={item.id + ' agile'}
                rateValue={evaluation?.evaluation || 0}
                comment={evaluation?.comment}
                textOnly={['FREE_ESTIMATE'].includes(item.group) || false}
              />
            )
          },
        })
      }
    }

    columns = columns.concat(
      reviewers?.map((reviewer, index) => {
        return {
          title: editable ? (
            <DeleteEmployeeReviewer reviewer={reviewer} />
          ) : (
            reviewer.fromWho?.name || '(undefined)'
          ),
          width: 120,
          render: (text: any, item: any) => {
            if (item.children) return null
            const evaluation = evaluations?.find(i => {
              return (
                i.evaluationAttribute.id === item.id &&
                i.fromWho?.id.toLowerCase() === reviewer.fromWho?.id.toLowerCase()
              )
            })
            return (
              <TableCell
                rateDisabled={!reviewer.fromWho?.isMe}
                isArchivedChosen={!!isArchivedChosen}
                itemId={item.id}
                cellCode={item.id + ' reviewer' + index}
                rateValue={evaluation?.evaluation || 0}
                comment={evaluation?.comment}
                textOnly={['FREE_ESTIMATE'].includes(item.group) || false}
              />
            )
          },
        }
      }),
    )
  }

  const comment = comments?.find(i => !i.evaluationAttribute)

  return (
    <div>
      <Table
        style={{ maxWidth: 1100 }}
        expandIconColumnIndex={-1}
        defaultExpandAllRows
        columns={columns}
        scroll={{ x: 500 }}
        dataSource={tree}
        pagination={false}
      />
      {isArchivedChosen ? (
        comment?.body && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              marginTop: '20px',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>Comment: </div>
            {comment?.body}
          </div>
        )
      ) : (
        <Input.TextArea
          placeholder="Overall comment"
          autoSize={{ minRows: 4 }}
          defaultValue={comment?.body}
          rows={4}
          disabled={employee?.isMe || !editable}
          onChange={e => {
            onComment({
              body: e.target.value,
            })
          }}
          style={{ marginTop: 8 }}
        />
      )}

      <CommentModal
        title={addCommentModal.title}
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
        defaultComment={addCommentModal.comment}
      />
    </div>
  )
}

function parseName(email: string | any) {
  const re = /^.*@/i
  const fullName = re.exec(email)?.[0].replace('@', '')
  return fullName
    ?.split('.')
    .map((e, i) => (i === 0 ? e[0].toUpperCase() + '.' : e[0].toUpperCase() + e.slice(1)))
    .join(' ')
}

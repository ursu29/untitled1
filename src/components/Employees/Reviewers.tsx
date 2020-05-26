import React, { useState, PropsWithChildren } from 'react'
import EmployeeSelect from './EmployeeSelect'
import { Employee } from '../../types'
import { Avatar, Tooltip } from 'antd'
import Button from '../UI/Button'

interface Props extends PropsWithChildren<any> {
  reviewers: Pick<Employee, 'id' | 'name' | 'email' | 'avatar'>[] | null
  isAvatarsShown: boolean
  isAddButtonShown: boolean
  selectIsLoading: boolean
  onBlur: any
}

export default function Reviewers(props: Props) {
  const { reviewers, isAvatarsShown, isAddButtonShown, selectIsLoading, onBlur } = props
  const [isAddReviewerSelectOpen, setIsAddReviewerSelectOpen] = useState(false)
  const [isSpanShown, setIsSpanShown] = useState(false)
  const [values, setValues] = useState([''])

  React.useEffect(() => {
    setValues(reviewers?.map(reviewer => reviewer.email) || [])
  }, [reviewers])

  if (!isAvatarsShown && !isAddButtonShown) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {!!reviewers?.length && (
        <div
          style={{
            marginRight: '8px',
            fontSize: '15px',
            opacity: isSpanShown ? 1 : 0,
            transition: '0.3s opacity',
          }}
        >
          Page reviewers
        </div>
      )}

      {isAvatarsShown && (
        <div
          style={{ display: 'flex' }}
          onMouseEnter={() => setIsSpanShown(true)}
          onMouseLeave={() => setIsSpanShown(false)}
        >
          {reviewers?.map(reviewer => (
            <div key={reviewer.id} style={{ marginLeft: '3px' }}>
              <Tooltip key={reviewer.id} placement="top" title={reviewer.name}>
                <Avatar src={reviewer.avatar} shape="circle" size="small" />
              </Tooltip>
            </div>
          ))}
        </div>
      )}

      {isAddButtonShown && (
        <div style={{ marginLeft: '8px' }}>
          {isAddReviewerSelectOpen ? (
            <EmployeeSelect
              onBlur={() => {
                setIsAddReviewerSelectOpen(false)
                onBlur(values)
              }}
              defaultOpen
              autoFocus
              loading={selectIsLoading}
              mode="multiple"
              keyName="email"
              value={values}
              onChange={(value: any) => setValues(value)}
              withoutMe
              style={{ width: 200 }}
            />
          ) : (
            <Button onClick={() => setIsAddReviewerSelectOpen(true)}>Add reviewer</Button>
          )}
        </div>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { Checkbox, Space, DatePicker } from 'antd'
import moment from 'moment'

interface Props {
  dateRange: { startDate: string; finishDate: string }
  setDateRange: any
}

export default function WorkTools({ dateRange, setDateRange }: Props) {
  const [isPeriodChosen, setIsPeriod] = useState(false)

  return (
    <div style={{ padding: '5px' }}>
      <Space>
        {isPeriodChosen ? (
          <DatePicker.RangePicker
            defaultValue={
              dateRange.startDate && dateRange.finishDate
                ? [moment(dateRange.startDate), moment(dateRange.finishDate)]
                : undefined
            }
            onChange={(dates: any, dateStrings: any) =>
              setDateRange({ startDate: dateStrings[0], finishDate: dateStrings[1] })
            }
          />
        ) : (
          <DatePicker
            defaultValue={dateRange.startDate ? moment(dateRange.startDate) : undefined}
            onChange={(date: any, dateString: any) =>
              setDateRange({ startDate: dateString, finishDate: dateString })
            }
          />
        )}
        <Checkbox onChange={e => setIsPeriod(e.target.checked)}>Period</Checkbox>
      </Space>
    </div>
  )
}

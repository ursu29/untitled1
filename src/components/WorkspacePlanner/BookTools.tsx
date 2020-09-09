import React, { useState } from 'react'
import { Checkbox, Space, DatePicker } from 'antd'
import moment from 'moment'

interface Props {
  dateRange: { startDate: string; finishDate: string }
  setDateRange: any
  disabled: boolean
}

export default function BookTools({ dateRange, setDateRange, disabled }: Props) {
  const [isPeriodChosen, setIsPeriod] = useState(false)

  return (
    <div>
      <Space>
        {isPeriodChosen ? (
          <DatePicker.RangePicker
            disabled={disabled}
            defaultValue={
              dateRange.startDate && dateRange.finishDate
                ? [
                    moment(dateRange.startDate, 'DD.MM.YYYY'),
                    moment(dateRange.finishDate, 'DD.MM.YYYY'),
                  ]
                : undefined
            }
            onChange={(dates: any, dateStrings: any) =>
              setDateRange({ startDate: dateStrings[0], finishDate: dateStrings[1] })
            }
            format="DD.MM.YYYY"
          />
        ) : (
          <DatePicker
            disabled={disabled}
            defaultValue={
              dateRange.startDate ? moment(dateRange.startDate, 'DD.MM.YYYY') : undefined
            }
            onChange={(date: any, dateString: any) =>
              setDateRange({ startDate: dateString, finishDate: dateString })
            }
            format="DD.MM.YYYY"
          />
        )}
        <Checkbox
          disabled={disabled}
          onChange={e => {
            setIsPeriod(e.target.checked)
            if (!e.target.checked)
              setDateRange({ startDate: dateRange.startDate, finishDate: dateRange.startDate })
          }}
        >
          Period
        </Checkbox>
      </Space>
    </div>
  )
}

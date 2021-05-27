import { useMutation, gql } from '@apollo/client'
import { Button, DatePicker, Input, Modal, Select, Space } from 'antd'
import moment, { Moment } from 'moment'
import React, { useState, useEffect } from 'react'
import message from '../../message'
import { LOCATION } from '../../types'
import getLocationName from '../../utils/getLocationName'
import './OfficePlannerPage.css'
import { ConfigProvider } from 'antd'
import ru_RU from 'antd/lib/locale-provider/ru_RU'
import 'moment/locale/ru'

const { RangePicker } = DatePicker

const updateOfficeDaysMutation = gql`
  mutation update($input: UpdateOfficeDaysInput!) {
    updateOfficeDays(input: $input)
  }
`

const DEFAULT_LIMIT = 10

export default function EditOfficeLimits({
  refetchQueries,
  currentLocation,
}: {
  refetchQueries: any
  currentLocation: LOCATION
}) {
  const [location, setLocation] = useState<LOCATION>(currentLocation)
  const [dateStart, setDateStart] = useState<Moment | undefined>(undefined)
  const [dateEnd, setDateEnd] = useState<Moment | undefined>(undefined)
  const [limit, setLimit] = useState<number | undefined>(DEFAULT_LIMIT)
  const [isModalVisible, setShowModal] = useState(false)

  const [updateDays, { loading }] = useMutation(updateOfficeDaysMutation, {
    awaitRefetchQueries: true,
    refetchQueries,
    onError: message.error,
    onCompleted: () => {
      setDateStart(undefined)
      setDateEnd(undefined)
      setLimit(DEFAULT_LIMIT)
      setShowModal(false)
    },
  })

  useEffect(() => {
    setLocation(currentLocation)
  }, [currentLocation])

  return (
    <ConfigProvider locale={ru_RU}>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Edit limits
      </Button>
      <Modal
        title="Confirm"
        visible={isModalVisible}
        confirmLoading={loading}
        onOk={() => {
          updateDays({
            variables: {
              input: {
                dateStart: moment(dateStart).format('YYYY-MM-DD'),
                employeeLimit: limit,
                location: currentLocation,
                dateEnd: moment(dateEnd).format('YYYY-MM-DD'),
              },
            },
          })
        }}
        onCancel={() => {
          setShowModal(false)
        }}
      >
        <Space direction="vertical">
          <Space>
            <Select
              value={location}
              onChange={value => {
                setLocation(value)
              }}
            >
              <Select.Option value={LOCATION.SAINT_PETERSBURG}>
                {getLocationName(LOCATION.SAINT_PETERSBURG)}
              </Select.Option>
              <Select.Option value={LOCATION.TOMSK}>
                {getLocationName(LOCATION.TOMSK)}
              </Select.Option>
              <Select.Option value={LOCATION.KALININGRAD}>
                {getLocationName(LOCATION.KALININGRAD)}
              </Select.Option>
            </Select>
            <Input
              type="number"
              value={limit}
              onChange={e => {
                setLimit(Number(e.target.value))
              }}
              defaultValue={DEFAULT_LIMIT}
              placeholder="Limit"
              min="0"
              max="100"
            />
          </Space>
          <RangePicker
            value={[moment(dateStart), moment(dateEnd)]}
            onChange={(value: any) => {
              setDateStart(value[0])
              setDateEnd(value[1])
            }}
          />
        </Space>
      </Modal>
    </ConfigProvider>
  )
}

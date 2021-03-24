import React, { Children } from 'react'
import { ToolbarProps } from 'react-big-calendar'
import moment from 'moment'
import {
  ExclamationCircleTwoTone,
  LeftOutlined,
  RightOutlined,
  FilterOutlined,
} from '@ant-design/icons'
import { Tooltip, Button, Radio, Space, Select, Badge } from 'antd'
import { CalendarEvent } from '../../types'

const COLORS = {
  EVENT_INTERNAL: '#a1e8ff',
  EVENT_INTERNAL_IMPORTANT: '#51abff',
  EVENT_EXTERNAL: '#bdff9c',
  EVENT_EXTERNAL_IMPORTANT: '#76e042',
  TODAY_BACKGROUND: '#f7fcff',
}

const { Option } = Select

export const DateCellWrapper = ({ children, value }: any) => {
  const isToday =
    moment(value).dayOfYear() === moment(new Date()).dayOfYear() &&
    moment(value).year() === moment(new Date()).year()

  return React.cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: isToday ? COLORS.TODAY_BACKGROUND : '',
      borderTop: isToday ? '4px solid #b4dbff' : '',
    },
  })
}

export const EventWrapper = ({
  view,
  event,
  children,
}: {
  view: any
  children?: any
  event: CalendarEvent
}) => {
  const backgroundColor = event.isExternal
    ? event.importance === 'HIGH'
      ? COLORS.EVENT_EXTERNAL_IMPORTANT
      : COLORS.EVENT_EXTERNAL
    : event.importance === 'HIGH'
    ? COLORS.EVENT_INTERNAL_IMPORTANT
    : COLORS.EVENT_INTERNAL

  let style = {
    backgroundColor,
    padding: '4px 6px',
    borderRadius: '4px',
    color: 'black',
    display: 'block',
    overflow: 'hidden',
  } as any

  return (
    <div style={{ display: 'flex', maxWidth: children.props.style.maxWidth }}>
      {event.importance === 'HIGH' && view === 'month' && (
        <div
          onClick={() => children.props.onClick()}
          style={{
            cursor: 'pointer',
            backgroundColor,
            borderRadius: '4px 0 0 4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px',
            fontSize: '1rem',
            marginRight: '-3px',
          }}
        >
          <Tooltip placement="top" title="Important Event">
            <ExclamationCircleTwoTone twoToneColor="red" />
          </Tooltip>
        </div>
      )}
      {React.cloneElement(children, { style: { ...children.props.style, ...style } })}
    </div>
  )
}

export const ToolbarWrapper = (
  props: ToolbarProps & {
    cities: string[]
    isFilterBarOpened: any
    setIsFilterBarOpened: any
    filters: any
    setFilters: any
  },
) => {
  const { cities, isFilterBarOpened, setIsFilterBarOpened, filters, setFilters } = props

  const navigateStyle = {
    width: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const filterSelectStyle = {
    width: '150px',
  }

  return (
    <div style={{ marginBottom: '8px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <Space direction="horizontal">
          <Button onClick={() => props.onNavigate('PREV')} style={navigateStyle}>
            <LeftOutlined />
          </Button>
          <Button onClick={() => props.onNavigate('NEXT')} style={navigateStyle}>
            <RightOutlined />
          </Button>
          <Button onClick={() => props.onNavigate('TODAY')}>Current</Button>
          {moment(props.date).format('MMMM YYYY')}
        </Space>
        <div style={{ display: 'flex' }}>
          {isFilterBarOpened && (
            <Space>
              <Select
                allowClear={true}
                placeholder="Is Internal?"
                style={filterSelectStyle}
                value={filters.isInternal}
                onChange={value =>
                  setFilters({
                    ...filters,
                    isInternal: value,
                  })
                }
              >
                <Option value="internal">Internal</Option>
                <Option value="external">External</Option>
              </Select>
              <Select
                allowClear={true}
                placeholder="Is Online?"
                style={filterSelectStyle}
                value={filters.isOnline}
                onChange={value => setFilters({ ...filters, isOnline: value })}
              >
                <Option value="online">Online</Option>
                <Option value="offline">Offline</Option>
              </Select>
              <Select
                allowClear={true}
                placeholder="City"
                style={filterSelectStyle}
                value={filters.city}
                onChange={value => setFilters({ ...filters, city: value })}
              >
                {cities.map(city => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </Space>
          )}
          <Badge
            count={!isFilterBarOpened && Object.values(filters).filter(e => e).length ? '!' : null}
            size="small"
            offset={[-30, 0]}
            style={{ backgroundColor: '#1890FF' }}
          >
            <Radio.Button
              checked={isFilterBarOpened}
              onClick={() => setIsFilterBarOpened(!isFilterBarOpened)}
              style={{ ...navigateStyle, marginLeft: '16px' }}
            >
              <FilterOutlined />
            </Radio.Button>
          </Badge>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          {makeTip('External event', COLORS.EVENT_EXTERNAL)}
          {makeTip('Internal event', COLORS.EVENT_INTERNAL)}
          {makeTip('Important', undefined, true)}
        </div>
        <Radio.Group
          defaultValue="month"
          value={props.view}
          onChange={event => props.onView(event.target.value)}
        >
          <Radio.Button value="month">Month</Radio.Button>
          <Radio.Button value="week">Week</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  )
}

/**
 * UTILS
 */

function makeTip(text: string, backgroundColor?: string, isImportant?: boolean) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '24px' }}>
      {isImportant ? (
        <ExclamationCircleTwoTone
          twoToneColor="red"
          style={{ fontSize: '16px', marginRight: '8px' }}
        />
      ) : (
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor,
            marginRight: '8px',
          }}
        ></div>
      )}
      <div style={{ fontSize: '13px' }}>{text}</div>
    </div>
  )
}

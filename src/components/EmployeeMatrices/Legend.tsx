import React from 'react'
import { Employee } from '../../types/graphql'
import { getFirstWord } from '../../utils/cypress'
import { CircleButton, circleButtonsPallette } from '../Matrices/CircleButton'
import AboutTooltip from '../UI/AboutTooltip'
import AttachMatrix from './AttachMatrix'
import DetachMatrix from './DetachMatrix'

interface Props {
  currentTab?: string
  employee?: Pick<Employee, 'id' | 'isMe'>
}

export default function Legend({ currentTab, employee }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }} data-cy="legend-buttons">
      {' '}
      <div style={{ display: 'flex' }}>
        {circleButtonsPallette.map((button, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', marginRight: '19px' }}
            data-cy={getFirstWord(button.title)}
          >
            <CircleButton
              backgroundColor={button.backgroundColor}
              borderColor={button.borderColor}
              style={{ width: '18px', height: '18px', margin: '0 8px 0 0' }}
            />
            <span>{button.title}</span>
            {i === 0 ? (
              ''
            ) : (
              <AboutTooltip
                questionIconStyle={{ paddingLeft: '8px' }}
                placement="top"
                title={
                  i === 1
                    ? 'There is knowledge of this area, but there is still a lot to be learned in order to start practicing. Or ready to start practicing, but there was no opportunity so far.'
                    : 'Strong theoretical knowledge of the field. You have any practical experience and can share your expertise.'
                }
              ></AboutTooltip>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <AttachMatrix employee={employee} />
        <DetachMatrix matrix={currentTab} employee={employee} />
      </div>
    </div>
  )
}

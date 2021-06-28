import React from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as Rate1 } from '../../svg/rate1.svg'
import { ReactComponent as Rate2 } from '../../svg/rate2.svg'
import { ReactComponent as Rate3 } from '../../svg/rate3.svg'

const Description = styled.span`
  display: inline-flex;
  align-items: center;
  margin: 0 24px 8px 0;
  svg {
    margin-right: 8px;
  }
`

const rateIconMixin = css`
  svg {
    color: #000;

    // uses class from svg file for styling
    .rate-bg {
      fill: none;
      stroke: #000;
    }
  }
`

const rateIconActiveMixin = css`
  svg {
    color: #fff;

    // uses class from svg file for styling
    .rate-bg {
      fill: #1890ff;
      stroke: #1890ff;
    }
  }
`

const RateButton = styled.button<{ active: boolean }>`
  border: none;
  background: none;
  line-height: 0;
  padding: 0;
  outline: none;
  transition: transform 0.3s;
  :hover {
    transform: scale(1.1);
  }

  & + & {
    margin-left: 8px;
  }

  ${rateIconMixin}
  :not(:disabled) {
    cursor: pointer;
    :hover,
    :focus {
      ${rateIconActiveMixin}
    }
  }
  ${props => props.active && rateIconActiveMixin}
`

const icons = [
  {
    key: 1,
    icon: <Rate1 />,
    description: 'Needs Improvement',
    dataCy: 'needs',
  },
  {
    key: 2,
    icon: <Rate2 />,
    description: 'Meets requirements',
    dataCy: 'meets',
  },
  {
    key: 3,
    icon: <Rate3 />,
    description: 'Exceeds requirements',
    dataCy: 'exceeds',
  },
] as const

export const EvaluationRateDescription = () => (
  <div>
    {icons.map(({ key, icon, description }) => (
      <Description key={key}>
        {icon} {description}
      </Description>
    ))}
  </div>
)

export const EvaluationRate = (props: {
  disabled?: boolean
  onChange: (value: 0 | 1 | 2 | 3) => void
  value: number
}) => {
  return (
    <div>
      {icons.map(({ key, icon, dataCy }) => (
        <RateButton
          data-cy={dataCy}
          key={key}
          type="button"
          onClick={() => {
            props.onChange(props.value === key ? 0 : key)
          }}
          disabled={props.disabled}
          active={props.value === key}
        >
          {icon}
        </RateButton>
      ))}
    </div>
  )
}

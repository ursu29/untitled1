import React from 'react'
import { Rate } from 'antd'
import { RateProps } from 'antd/lib/rate'
import styled from 'styled-components'
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

const RateIcon = styled(Rate)`
  color: #fff;

  // uses class from svg file for styling
  .rate-bg {
    fill: #1890ff;
    stroke: #1890ff;
  }

  .ant-rate-star.ant-rate-star-zero {
    .ant-rate-star-first,
    .ant-rate-star-second {
      color: #000;

      // uses class from svg file for styling
      .rate-bg {
        fill: none;
        stroke: #000;
      }
    }
  }
`

const icons = [
  {
    key: 'rate1',
    icon: <Rate1 />,
    description: 'Needs Improvement',
  },
  {
    key: 'rate2',
    icon: <Rate2 />,
    description: 'Meets requirements',
  },
  {
    key: 'rate3',
    icon: <Rate3 />,
    description: 'Exceeds requirements',
  },
]

export const EvaluationRateDescription = () => (
  <div>
    {icons.map(({ key, icon, description }) => (
      <Description key={key}>
        {icon} {description}
      </Description>
    ))}
  </div>
)

export const EvaluationRate = (props: RateProps) => (
  <RateIcon character={({ index }: { index: number }) => icons[index].icon} {...props} />
)

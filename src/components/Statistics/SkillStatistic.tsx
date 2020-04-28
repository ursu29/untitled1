import { Tooltip } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { useEffect, useRef, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled, { keyframes } from 'styled-components/macro'

const StyledContainer = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

interface SmartTooltipProps {
  children: any
  tooltipTitle: string
}

export const isEllipsisActive = (element: HTMLElement): boolean =>
  element.offsetWidth < element.scrollWidth

const SmartTooltip = ({ children, tooltipTitle }: SmartTooltipProps) => {
  const [hasEllipsis, setHasEllipsis] = useState(false)
  const [isTooltipVisible, setTooltipVisibility] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const containerEl = containerRef.current
    if (!containerEl) return

    setHasEllipsis(isEllipsisActive(containerEl))
  }, [setHasEllipsis])

  return (
    <StyledContainer ref={containerRef}>
      <Tooltip title={tooltipTitle} visible={isTooltipVisible}>
        {React.cloneElement(children, {
          onMouseOver: () => {
            if (hasEllipsis) setTooltipVisibility(true)
          },
          onMouseLeave: () => setTooltipVisibility(false),
        })}
      </Tooltip>
    </StyledContainer>
  )
}

const percentageOf = (total: number) => (value: number) => (value / total) * 100

const DEFAULT_ROW_COLOR = '#1890ff'
const MAX_BAR_WIDTH = 500

const StyledBarAnimation = keyframes`
  0% {
    max-width: 0;
  }
  100% {
    max-width: ${MAX_BAR_WIDTH}px;
  }
`

const StyledPercentageAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const StyledChartRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const StyledRowValues = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 150px;
  text-align: right;

  .label {
    font-weight: 700;
  }
  .amount {
    flex-shrink: 0;
  }
  .bold {
    font-weight: 700;
  }
`

const StyledBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: ${MAX_BAR_WIDTH}px;
  padding-right: 50px;
`

const StyledBar = styled.div<{ barWidth: number; barColor: string }>`
  margin: 0 5px;
  padding-left: 5px;
  height: 14px;
  flex-shrink: 0;
  width: ${({ barWidth }) => barWidth}%;
  animation-name: ${StyledBarAnimation};
  animation-timing-function: ease-in-out;
  animation-duration: 0.6s;
  animation-delay: 0.3s;
  animation-fill-mode: backwards;
  background-color: ${({ barColor }) => barColor};
`

const StyledPercentage = styled.span`
  font-weight: 700;
  animation-name: ${StyledPercentageAnimation};
  animation-timing-function: ease-in-out;
  animation-duration: 0.6s;
  animation-delay: 0.5s;
  animation-fill-mode: backwards;
`

interface ChartRowProps extends RouteComponentProps {
  title: string
  value: number
  id: string
  link: string
  highestValue: number
  itemsCount: number
  rowColor?: string
}

const ChartRow = withRouter(
  ({
    title,
    link,
    value,
    highestValue,
    itemsCount,
    history,
    rowColor = DEFAULT_ROW_COLOR,
  }: ChartRowProps) => {
    const calcBarWidth = percentageOf(highestValue)
    const calcPercentage = percentageOf(itemsCount)

    return (
      <StyledChartRow data-cy="ChartRow">
        <StyledRowValues>
          <SmartTooltip tooltipTitle={title}>
            <span onClick={() => history.push(link)}>{title}</span>
          </SmartTooltip>
          <span className="amount">&nbsp;({value})</span>
        </StyledRowValues>
        <StyledBarWrapper>
          <StyledBar barWidth={calcBarWidth(value)} barColor={rowColor} />
          <StyledPercentage>{calcPercentage(value).toFixed(1)}%</StyledPercentage>
        </StyledBarWrapper>
      </StyledChartRow>
    )
  },
)

interface Props {
  items: { name: string; rate: number; link: string }[]
  title?: string
  itemsSliceCount?: number
}

export default ({ items, title = '', itemsSliceCount = 30 }: Props) => {
  const highestValue = items[0].rate

  if (highestValue === 0 || !items.length)
    return <div style={{ padding: 16 }}>No statistic collected</div>

  return (
    <section style={{ padding: '0 16px' }}>
      <Title level={4} style={{ marginLeft: 50 }}>
        {title}
      </Title>
      {items.slice(0, itemsSliceCount).map(({ name, rate, link }) => (
        <ChartRow
          key={name}
          title={name || 'Unnamed'}
          id={name}
          link={link}
          value={rate}
          itemsCount={items.length}
          highestValue={highestValue}
        />
      ))}
    </section>
  )
}

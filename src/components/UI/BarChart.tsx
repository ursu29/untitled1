import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer, Text } from 'recharts'
import { Tooltip } from 'antd'

interface Props {
  data: Array<object>
  dataKey: string
  color: string
  marginLeft: string
}

export default withRouter(
  ({ data, dataKey, color, marginLeft, history }: Props & RouteComponentProps) => {
    const isLabelRotate = useMediaQuery({ maxWidth: 960 }) // rotate labels when thin screen
    const leaveOnlyFirstWordInLabel = useMediaQuery({ maxWidth: 520 }) // cutting all words in label except the first one

    const customLabel = (props: any) => {
      const { x, y, width, height } = props
      const [name, link] = props.value.split('_')

      const MAX_WORD_LENGTH = 10 // length over which words will be cutting
      const labelAngle = (960 - document.documentElement.clientWidth) * 0.3 // angle for labels rotation on thin screen

      const isNameSingleWord = name.split(' ').length === 1 // label is a single word
      const isFirstWordOverLength = name.split(' ')[0].length > MAX_WORD_LENGTH // first word in label is over length

      const nameTooLong =
        Math.max.apply(
          null,
          name.split(' ').map((word: any) => word.length),
        ) > MAX_WORD_LENGTH // any of words in then label is over length

      const cuttingName = name
        .split(' ')
        .slice(0, leaveOnlyFirstWordInLabel ? 1 : isLabelRotate ? 2 : 100)
        .map((word: any) =>
          word.trim().length
            ? word.length > MAX_WORD_LENGTH
              ? word.slice(0, MAX_WORD_LENGTH - 3) + '... '
              : word + ' '
            : '',
        )
        .join('') // general new label with replacement of over length with ellipsis

      const cuttingFirstWordEllipsis = name.split(' ')[0].slice(0, MAX_WORD_LENGTH - 3) + '... ' // only first word of the label with ellipsis

      const labeledLink = () => (
        <g onClick={() => history.push(link)} style={{ cursor: 'pointer' }}>
          <Text
            x={isLabelRotate ? (labelAngle < 60 ? x + width / 2 : x + width) : x}
            y={height + y + 35}
            width={20}
            angle={isLabelRotate ? (labelAngle <= 90 ? labelAngle : 90) : 0}
            textAnchor="start"
            verticalAnchor="start"
            fill="#1890FF"
            fontFamily="Segoe UI, Arial"
            fontSize="14px"
          >
            {leaveOnlyFirstWordInLabel &&
            ((isNameSingleWord && isFirstWordOverLength) || !isNameSingleWord)
              ? cuttingFirstWordEllipsis
              : cuttingName}
          </Text>
        </g>
      )

      return nameTooLong ? (
        <Tooltip placement="bottomRight" title={name}>
          {labeledLink()}
        </Tooltip>
      ) : (
        labeledLink()
      )
    }

    return (
      <div style={{ width: '100%', height: isLabelRotate ? 330 : 300, marginLeft }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            width={900}
            height={200}
            barSize={30}
            maxBarSize={980}
            margin={{ right: 20 }}
          >
            <XAxis
              dataKey={dataKey}
              axisLine={false}
              tickLine={false}
              height={isLabelRotate ? 110 : 80}
              tick={{ fontSize: '18px', fontFamily: 'Segoe UI, Arial' }}
            />
            <Bar dataKey={dataKey} fill={color} radius={2}>
              <LabelList dataKey={(skill) => `${skill.name}_${skill.link}`} content={customLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  },
)

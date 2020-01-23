import React, { useState } from 'react'
import { Button, Rate, Typography, Card } from 'antd'
import styled from 'styled-components'

const { Paragraph, Title } = Typography

const Helper = styled.div`
  padding-bottom: 16px;
  /* max-width: 550px; */
  animation: fadeIn 1s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

function EvaluationHelper() {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button
        type="link"
        onClick={() => setShow(!show)}
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        How to use?
      </Button>
      {show && (
        <Helper>
          <Card>
            <Paragraph>
              This form should help to assess yourself and see which area to improve. Usually the.
              form correlates with your Goals. Also is should help to get feedback about your work
              from TeamLeads, your coworkers with comments – which fields to improve.
            </Paragraph>
            <Paragraph>
              The evaluation focus is on the employee’s ability to perform the job duties listed  in
              the job description. Use the following scale
            </Paragraph>
            <Title level={4}>Use the following scale</Title>
            <div>
              <Rate count={3} value={1} /> Needs Improvement
            </div>
            <div>
              <Rate count={3} value={2} /> Meets requirements
            </div>
            <div>
              <Rate count={3} value={3} /> Exceeds requirements
            </div>
          </Card>
        </Helper>
      )}
    </>
  )
}

export default EvaluationHelper

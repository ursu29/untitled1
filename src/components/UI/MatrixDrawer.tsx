import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Button, Drawer } from 'antd'
import { IconProps } from 'antd/lib/icon'
import React, { useState } from 'react'
import styled from 'styled-components'
import MatrixForm from '../Matrices/MatrixForm'

const Controls = styled.div`
  /* margin-bottom: 8px; */
  display: flex;
  justify-content: flex-end;
`

interface Props {
  loading: boolean
  togglerLabel: string
  drawerLabel: string
  data?: any
  icon?: IconProps['type']
  onSubmit: (data: any, onDone: () => void) => void
}

export default function SkillDrawer(props: Props) {
  const [visible, toggleVisibility] = useState(false)
  return (
    <Controls>
      <Button
        icon={<LegacyIcon type={props.icon} />}
        size="small"
        title={props.togglerLabel}
        onClick={() => toggleVisibility(true)}
      >
        {props.togglerLabel}
      </Button>
      <Drawer
        maskClosable={false}
        title={props.drawerLabel}
        width={480}
        onClose={() => toggleVisibility(false)}
        visible={visible}
      >
        <MatrixForm
          loading={props.loading}
          data={props.data}
          onSubmit={matrix => {
            props.onSubmit(matrix, () => toggleVisibility(false))
          }}
        />
      </Drawer>
    </Controls>
  )
}

import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import SkillForm, { Props as FormProps } from './SkillForm'
import { Skill } from '../../types'
import styled from 'styled-components'
import { IconProps } from 'antd/lib/icon'

const Wrapper = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-end;
`

interface Props {
  loading: boolean
  togglerLabel: string
  drawerLabel: string
  skill?: FormProps['skill']
  icon?: IconProps['type']
  onSubmit: (skill: FormProps['skill'], onDone: () => void) => void
}

export default function SkillDrawer(props: Props) {
  const [visible, toggleVisibility] = useState(false)
  return (
    <Wrapper>
      <Button
        icon={props.icon}
        title={props.togglerLabel}
        onClick={() => toggleVisibility(true)}
      ></Button>
      <Drawer
        maskClosable={false}
        title={props.drawerLabel}
        width={480}
        onClose={() => toggleVisibility(false)}
        visible={visible}
      >
        <SkillForm
          loading={props.loading}
          skill={props.skill}
          onSubmit={skill => {
            props.onSubmit(skill, () => toggleVisibility(false))
          }}
        />
      </Drawer>
    </Wrapper>
  )
}

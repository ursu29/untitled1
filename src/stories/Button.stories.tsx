import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import { Button } from 'antd'
import 'antd/dist/antd.css'

export default {
  title: 'Example/Button',
  component: Button,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta

const Template: Story = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  children: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary',
  children: 'Button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  type: 'primary',
  children: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  type: 'primary',
  children: 'Button',
}

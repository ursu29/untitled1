import { Button, Col, Form, Row } from 'antd'
import React from 'react'
import { SharedFileFragmentFragment } from '../../queries/getSharedFiles'
import { UpdateSharedFileInput, SharedFile } from '../../types/graphql'
import SkillMultiSelect, { SkillPick } from '../Skills/SkillMultiSelect'

export interface Props {
  file: SharedFileFragmentFragment
  onSubmit: (values: UpdateSharedFileInput, reset?: () => void) => void
  loading: boolean
}

const FileForm = ({ file, onSubmit, loading }: Props) => {
  const [form] = Form.useForm()

  const onSkillsChange = (skills: SkillPick[]) => {
    form.setFieldsValue({ skills })
  }

  const onFinish = ({ skills }: Pick<SharedFile, 'skills'>) => {
    onSubmit({
      id: file.id,
      skills: skills?.map(i => i.id),
    })
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{
        skills: file.skills || [],
      }}
    >
      <Form.Item label="Skills" name="skills">
        <SkillMultiSelect onChange={onSkillsChange} />
      </Form.Item>
      <Row>
        <Col>
          <Button loading={loading} type="primary" htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default React.memo(FileForm)

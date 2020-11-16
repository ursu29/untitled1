import { Button, Col, Form, Row } from 'antd'
import React from 'react'
import { FilesPick } from '../../queries/getSharedFiles'
import { UpdateFileDetailsMutationInput } from '../../queries/updateFileDetails'
import { FileDetails } from '../../types'
import SkillTreeSelect from '../Skills/SkillTreeSelect'

export interface Props {
  file: FilesPick
  onSubmit: (values: UpdateFileDetailsMutationInput['input'], reset?: () => void) => void
  loading: boolean
}

const FileForm = ({ file, onSubmit, loading }: Props) => {
  const [form] = Form.useForm()

  const onFinish = ({ skills }: Pick<FileDetails, 'skills'>) => {
    onSubmit({
      azureId: file.id,
      skills: skills.map(i => i.id),
    })
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{
        skills: file.details?.skills || [],
      }}
    >
      <Form.Item label="Skills" name="skills">
        <SkillTreeSelect />
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

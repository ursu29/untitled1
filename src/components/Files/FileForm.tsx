import { Button, Col, Form, Row } from 'antd'
import React from 'react'
import { FilesPick } from '../../queries/getSharedFiles'
import { FileDetails } from '../../types'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import TagSelect from '../Tags/TagSelect'

export interface Props {
  file: FilesPick
  onSubmit: (values: any, reset?: () => void) => void
  loading: boolean
}

const FileForm = ({ file, onSubmit, loading }: Props) => {
  const [form] = Form.useForm()

  const onFinish = ({ tags, skills }: Pick<FileDetails, 'tags' | 'skills'>) => {
    onSubmit({
      azureId: file.id,
      tags: tags.map(i => i.id),
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
        tags:
          file.details?.tags?.map(tag => ({
            key: tag.name,
            label: tag.name,
            id: tag.id,
            name: tag.name,
          })) || [],
      }}
    >
      <Form.Item label="Skills" name="skills">
        <SkillTreeSelect />
      </Form.Item>
      <Form.Item label="Tags" name="tags">
        <TagSelect allowAddNew multiple />
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

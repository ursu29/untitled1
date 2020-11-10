import { Button, Col, Form, Row } from 'antd'
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { FilesPick } from '../../queries/getSharedFiles'
import {
  updateFileDetails,
  fileDetailsFragment,
  UpdateFileDetailsMutation,
  UpdateFileDetailsMutationInput,
} from '../../queries/updateFileDetails'
import message from '../../message'
import { FileDetails } from '../../types'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import TagSelect from '../Tags/TagSelect'

export interface Props {
  file: FilesPick
}

const FileForm = ({ file }: Props) => {
  const [updateFile, { loading }] = useMutation<
    UpdateFileDetailsMutation,
    UpdateFileDetailsMutationInput
  >(updateFileDetails, {
    onError: message.error,
    onCompleted: () => message.success('File is updated'),
    update: (cache, { data }) => {
      const cacheId = `FileDetails:${file.id}`
      const currentFile = cache.readFragment<FileDetails>({
        id: cacheId,
        fragment: fileDetailsFragment,
      })
      if (data && currentFile) {
        cache.writeData({
          id: cacheId,
          data: data.updateFileDetails,
        })
      }
    },
  })
  const [form] = Form.useForm()

  const onFinish = ({ tags, skills }: Pick<FileDetails, 'tags' | 'skills'>) => {
    const input = {
      azureId: file.id,
      tags: tags.map(i => i.id),
      skills: skills.map(i => i.id),
    }
    updateFile({ variables: { input } })
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

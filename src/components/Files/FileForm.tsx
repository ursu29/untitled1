import { Button, Col, Row, Form } from 'antd'
import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { FilesPick } from '../../queries/getSharedFiles'
import updateSharedFile, { UpdateSharedFileMutation } from '../../queries/updateSharedFile'
import message from '../../message'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import TagSelect from '../Tags/TagSelect'

type SharedFileFragment = Pick<FilesPick, 'tags' | 'skills'> & { id: string }

const sharedFileFragment = gql`
  fragment SharedFileFragment on AzureFile {
    skills {
      id
      name
    }
    tags {
      id
      name
    }
  }
`

export interface Props {
  file: FilesPick
}

const FileForm = ({ file }: Props) => {
  const [updateFile, { loading }] = useMutation<UpdateSharedFileMutation>(updateSharedFile, {
    onError: message.error,
    onCompleted: () => message.success('File is updated'),
    update: (cache, { data }) => {
      const cacheId = `AzureFile:${file.id}`
      const currentFile = cache.readFragment<SharedFileFragment>({
        id: cacheId,
        fragment: sharedFileFragment,
      })
      if (data && currentFile) {
        console.log(data.updateSharedFile, file)
        cache.writeData({
          id: cacheId,
          data: data.updateSharedFile,
        })
      }
    },
  })
  const [form] = Form.useForm()

  const onFinish = ({ tags, skills }: Pick<FilesPick, 'tags' | 'skills'>) => {
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
        skills: file?.skills || [],
        tags:
          file?.tags?.map(tag => ({
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

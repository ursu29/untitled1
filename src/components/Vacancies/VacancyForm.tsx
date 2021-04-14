import { Button, Col, Divider, Form, Input, Popconfirm, Row, Select, notification } from 'antd'
import React from 'react'
import { VacancyPick } from '../../queries/getVacancies'
import LocationSelect from '../Locations/LocationSelect'
import ProjectSelect from '../Projects/ProjectSelect'
import MarkdownEditor from '../UI/MarkdownEditor'

interface Props {
  vacancy: VacancyPick
  onClose: (i: any) => void
  onSave: (i: any) => void
  onPublish: (i: VacancyPick) => void
}

export default function VacancyForm({ vacancy, onClose, onSave, onPublish }: Props) {
  const [form] = Form.useForm()
  return (
    <Form layout="vertical" form={form}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Должность"
            name="position"
            initialValue={vacancy.position}
            rules={[{ required: true, message: 'Должность - обязательное поле' }]}
          >
            <Input placeholder="Add position" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Причина"
            name="reason"
            initialValue={vacancy.reason}
            tooltip="Внутреннее поле. Не выводится в публичной вакансии"
          >
            <Input placeholder="Provide the reason" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Проект"
            name="project"
            initialValue={vacancy.project?.id}
            tooltip="Внутреннее поле. Не выводится в публичной вакансии"
          >
            <ProjectSelect wide />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Локации"
            name="locations"
            initialValue={vacancy.locations}
            required
            rules={[
              {
                required: true,
                message: 'Поле "Локации" не заполнено',
              },
            ]}
          >
            <LocationSelect wide mode="multiple" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Уровень английского"
            name="englishLevel"
            required
            rules={[
              {
                required: true,
                message: 'Поле "Уровень английского" не заполнено',
              },
            ]}
            initialValue={vacancy.englishLevel}
          >
            <Select placeholder="Выберите уровень английского" data-cy="level">
              <Select.Option value="Elementary">Elementary</Select.Option>
              <Select.Option value="Intermediate+">Intermediate+</Select.Option>
              <Select.Option value="Upper-Intermediate">Upper-Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Опыт работы"
            name="employeeExperience"
            initialValue={vacancy.employeeExperience || 'С опытом работы 1-3 года'}
            required
          >
            <Select placeholder="Provide the experience" data-cy="experience">
              <Select.Option value="Без опыта">Без опыта</Select.Option>
              <Select.Option value="С опытом работы от года">С опытом работы от года</Select.Option>
              <Select.Option value="С опытом работы 1-3 года">
                С опытом работы 1-3 года
              </Select.Option>
              <Select.Option value="С опытом работы 3-5 лет">С опытом работы 3-5 лет</Select.Option>
              <Select.Option value="С опытом работы от 5 лет">
                С опытом работы от 5 лет
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 8 }}>
        <Col span={12}>
          <Form.Item
            data-cy="description"
            label="Внешнее описание"
            name="description"
            required
            rules={[
              {
                required: true,
                message: 'Поле "Внешнее описание" не заполнено',
              },
            ]}
            initialValue={vacancy.description}
            tooltip="Поле используется для описания проекта/вакансии на внешнем сайте. Обязательно для заполнения перед публикацией!"
          >
            <MarkdownEditor short id="description" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            data-cy="workDescription"
            label="Чем предстоит заниматься"
            name="responsibilities"
            required
            rules={[
              {
                required: true,
                message: 'Поле "Чем предстоит заниматься" не заполнено',
              },
            ]}
            initialValue={vacancy.responsibilities}
          >
            <MarkdownEditor short id="responsibilities" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 8 }}>
        <Col span={12}>
          <Form.Item
            data-cy="skills"
            label="Что мы ждём от кандидатов"
            name="requiredSkills"
            required
            rules={[
              {
                required: true,
                message: 'Поле "Что мы ждём от кандидатов" не заполнено',
              },
            ]}
            initialValue={vacancy.requiredSkills}
          >
            <MarkdownEditor short id="requiredSkills" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            data-cy="plus"
            label="Что будет плюсом"
            name="additionalSkills"
            initialValue={vacancy.additionalSkills}
          >
            <MarkdownEditor short id="additionalSkills" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            data-cy="stack"
            label="Технологии (stack)"
            name="stack"
            initialValue={vacancy.stack}
            tooltip="По умолчанию заполняется из поля Technologies выбранного проекта. Используйте это поле для того, чтобы переписать значение по умолчанию"
          >
            <Input.TextArea rows={3} placeholder="Git, Javascript, Angular, Azure DevOps" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end" align="middle">
        {vacancy.isPublished && (
          <Popconfirm
            title="Are you sure you want to close this vacancy?"
            onConfirm={() => onClose(vacancy)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Terminate vacancy</Button>
          </Popconfirm>
        )}
        <Button
          data-cy="saveForm"
          onClick={() => {
            if (vacancy.isPublished) {
              form
                .validateFields()
                .then(values => {
                  onPublish({
                    ...vacancy,
                    ...values,
                  })
                })
                .catch(errors => {
                  notification.warning({
                    message: errors.errorFields.map((i: any) => i.errors.toString()).join(', '),
                  })
                })
            } else {
              const values = form.getFieldsValue()
              onSave({
                ...vacancy,
                ...values,
              })
            }
          }}
          style={{ marginLeft: '10px' }}
        >
          Save
        </Button>
        {!vacancy.isPublished && (
          <>
            <Divider type="vertical" />
            <Button
              data-cy="publish"
              onClick={() => {
                form
                  .validateFields()
                  .then(values => {
                    onPublish({
                      ...vacancy,
                      ...values,
                    })
                  })
                  .catch(errors => {
                    notification.warning({
                      message: errors.errorFields.map((i: any) => i.errors.toString()).join(', '),
                    })
                  })
              }}
              type="primary"
            >
              Publish
            </Button>
          </>
        )}
      </Row>
    </Form>
  )
}

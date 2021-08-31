import { Checkbox, Col, Form, Input, Row, Select, Typography } from 'antd'
import React, { useEffect } from 'react'
import message from '../../message'
import { CurriculumVitae, Employee } from '../../types/graphql'
import { useUpdateCvMutation } from '../../queries/cv'
import employeeCVLanguagesParser, { LangObject } from './employeeCVLanguagesParser'
import { LANGUAGE_LEVELS, LANGUAGES } from '../../constants'

const DEFAULT_LEVEL: keyof typeof LANGUAGE_LEVELS = 'elementary'

const { Title } = Typography
const { Option } = Select

type Language = keyof typeof LANGUAGES
type Level = keyof typeof LANGUAGE_LEVELS
type EmployeePick = Pick<Employee, 'id'>
type CVPick = Pick<CurriculumVitae, 'id' | 'languages'>

type FormProps = {
  editable?: boolean
  employee: EmployeePick
  cv?: CVPick | null
}

const EmployeeCVLanguages = ({ editable, employee, cv }: FormProps) => {
  const [form] = Form.useForm()
  const [optional, json, stringifyLangData] = employeeCVLanguagesParser(cv?.languages)
  const [update, { loading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Languages have been updated'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating languages')
    }
  }, [loading])

  const handleSubmit = () => {
    const optional = form.getFieldValue('optional')
    const formValues = { ...form.getFieldsValue() }
    delete formValues.languages

    const obj = formDataToString(formValues)
    const langString = stringifyLangData(optional, obj)

    update({
      variables: {
        input: {
          id: cv?.id,
          employee: employee.id,
          languages: langString,
        },
      },
    })
  }

  const handleCheckboxChange = (e: any, langCode: Language) => {
    form.setFieldsValue({ [`${langCode}_checked`]: e.target.checked })
    form.setFieldsValue({ [`${langCode}_level`]: e.target.checked ? DEFAULT_LEVEL : null })
    handleSubmit()
  }

  const handleSelectChange = (lvl: Level, langCode: Language) => {
    form.setFieldsValue({ [`${langCode}_level`]: lvl })
    handleSubmit()
  }

  return (
    <>
      <Title level={4} style={{ marginBottom: 16 }} data-cy="cvLanguage">
        Languages
      </Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {(Object.keys(LANGUAGES) as Array<Language>).map(lang => (
          <Row key={lang}>
            <Col style={{ width: 130, marginRight: 'auto' }}>
              <Form.Item
                name={`${lang}_checked`}
                initialValue={!!json[lang]}
                style={{ marginBottom: 16 }}
              >
                <Checkbox
                  disabled={!editable}
                  checked={!!json[lang]}
                  onChange={(e: any) => handleCheckboxChange(e, lang)}
                >
                  {LANGUAGES[lang]}
                </Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ display: !json[lang] ? 'none' : '' }}>
              <Form.Item
                name={`${lang}_level`}
                initialValue={json[lang]}
                style={{ marginBottom: 16 }}
              >
                <Select
                  disabled={!json[lang] || !editable}
                  placeholder=""
                  allowClear
                  style={{ width: 200 }}
                  onChange={(lvl: Level) => handleSelectChange(lvl, lang)}
                >
                  {(Object.keys(LANGUAGE_LEVELS) as Array<Level>).map(skill => (
                    <Option key={skill} value={skill}>
                      {LANGUAGE_LEVELS[skill]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ))}
        <Form.Item required={false} label="Optional" name="optional" initialValue={optional}>
          <Input onBlur={handleSubmit} disabled={!editable} />
        </Form.Item>
      </Form>
    </>
  )
}

type FormDataLang = `${Language}_${'checked' | 'level'}`

const formDataToString = (formData: Record<FormDataLang, Language | boolean>): LangObject => {
  const result = {} as LangObject
  const formDataKeys = Object.keys(formData) as Array<FormDataLang>

  formDataKeys.forEach(key => {
    const langCode = key.split('_')[0] as Language
    const keyLevel: FormDataLang = `${langCode}_level`
    if (formData[key] === true) {
      result[langCode] = formData[keyLevel] as Level
    }
  })

  return result
}

export default EmployeeCVLanguages

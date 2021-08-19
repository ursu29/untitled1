import {getAllFiles, getAllSkills, updateFileDetails} from '../../support/getData'

describe('Add new skill to file details (Knowledge -> Files)', () => {

  let skillId, skillName, fileSkills, fileId

  before(() => {
    cy.setToken('employee')
    cy.post(getAllFiles()).then(res => {
      const {sharedFiles} = res.body.data
      fileId = sharedFiles[0].id
      cy.post(updateFileDetails({"id": fileId, "skills": []}))
    })

    cy.post(getAllSkills()).then(res => {
      const {skills} = res.body.data
      skillId = skills[0].id
      skillName = skills[0].name
      })
  })

  after(() => {
    cy.post(updateFileDetails({"id": fileId, "skills": []}))
  })

  it('Check whether the file has any skills', () => {

    cy.post(getAllFiles()).then(res => {
      const { sharedFiles } = res.body.data
      fileSkills = sharedFiles[0].skills
      expect(fileSkills).is.empty
    })
  })

  it('Add new skill to existing file', () => {
    cy.post(updateFileDetails({"id": fileId, "skills": [skillId]})).then(res => {
      const {updateSharedFile} = res.body.data
      const updatedFileId = updateSharedFile.id
      const updatedFileSkillId = updateSharedFile.skills[0].id
      const updatedFileSkillName = updateSharedFile.skills[0].name
      const updatedFileSkillsQuantity = updateSharedFile.skills.length
      expect(updatedFileId).equals(fileId)
      expect(updatedFileSkillsQuantity).equals(1)
      expect(updatedFileSkillId).equals(skillId)
      expect(updatedFileSkillName).equals(skillName)
    })
  })
})
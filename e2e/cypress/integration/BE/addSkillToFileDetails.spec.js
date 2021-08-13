import {getAllFiles, getAllSkills, updateFileDetails} from '../../support/getData'

describe('Add new skill to file details (Knowledge -> Files)', () => {

  let skillId, fileSkills, fileId, skillIdArrUpdated
  let skillIdArr = []

  before(() => {
    cy.setToken('employee')
    cy.post(getAllFiles()).then(res => {
      const {sharedFiles} = res.body.data
      fileId = sharedFiles[1177].id
      fileSkills = sharedFiles[1177].skills
      fileSkills.forEach(el => skillIdArr.push(el.id))
    })
    cy.post(getAllSkills()).then(res => {
      const {skills} = res.body.data
      skillId = skills[1164].id
    })
  })

  after(() => {
    cy.post(updateFileDetails({"id": fileId, "skills": skillIdArr}))
  })

  it('Check whether the new skill is not already comprised in the file skill array. If it is, change the file ID at getAllFiles()', () => {
    expect(skillIdArr).not.include(skillId)
  })

  it('Add new skill to existing file', () => {
    skillIdArrUpdated = skillIdArr.slice()
    skillIdArrUpdated.push(skillId)
    cy.post(updateFileDetails({"id": fileId, "skills": skillIdArrUpdated})).then(res => {
      const updatedFileData = res.body.data.updateSharedFile
      const updatedFileId = updatedFileData.id
      let fileNewSkills = []
      updatedFileData.skills.forEach(el => fileNewSkills.push(el.id))
      expect(updatedFileId).equal(fileId)
      expect(fileNewSkills.length).is.not.equal(skillIdArr.length)
      expect(fileNewSkills.length).equal(skillIdArr.length + 1)
      expect(fileNewSkills).include(skillId)
    })
  })
})
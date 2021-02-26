import { evaluationAttributesData, archivedSEFVersion } from '../../support/client/selfEvaluation'

describe(`Check employee Self Evaluation Form`, () => {
  beforeEach(() => {
    cy.setToken('employee')
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })
  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Attributes response', () => {
    cy.getResponse(['getEvaluationReviewers', 'id', 'title'], 'alias')
    cy.visit('/profile/evaluation')
    cy.wait(`@alias`).then(val => {
      const response = val.response.body.data
      const { evaluationAttributes } = response
      const firstAttribute = evaluationAttributes[0]

      expect(evaluationAttributes).to.be.a('array')
      cy.compareObjectsKeys(firstAttribute, evaluationAttributesData)
      expect(firstAttribute.__typename).equal(evaluationAttributesData.__typename)
    })
  })

  it('getEvaluations response', () => {
    cy.getResponse(['archivedSEFVersions'], 'alias')
    cy.visit('/profile/evaluation')
    cy.wait(`@alias`).then(val => {
      const response = val.response.body.data
      const { archivedSEFVersions } = response
      const firstArchived = archivedSEFVersions[0]

      expect(archivedSEFVersions).to.be.a('array')
      cy.compareObjectsKeys(firstArchived, archivedSEFVersion)
      expect(firstArchived.__typename).equal(archivedSEFVersion.__typename)
    })
  })
})

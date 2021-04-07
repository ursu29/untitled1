import * as getData from "../../../support/getData";

describe('check wiki response data', () => {
    let wikiData

    beforeEach(() => {
        cy.setToken('employee')
        cy.post(getData.getWikiRootSections())
            .then(req => wikiData = req.body.data.wikiRootSections)
    })

    ;['path', 'id'].forEach(name => {
        it(`${name} should not be empty`, () => {
            wikiData.forEach(el => expect(el[name].length).to.be.greaterThan(0))
        })
    })
})
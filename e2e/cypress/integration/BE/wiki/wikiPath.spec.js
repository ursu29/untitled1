import * as getData from "../../../support/getData";

describe('check getPaths data', () => {
    let wikiPagesPaths

    beforeEach(() => {
        cy.setToken('employee')
        cy.post(getData.getPaths())
            .then(req => wikiPagesPaths = req.body.data.wikiPagesPaths)
    })

    it(`${name} should not be empty`, () => {
        wikiPagesPaths.forEach(el => {
            expect(el.length).to.be.greaterThan(0)
            expect(el).to.be.a('string')
        })
    })
})
import {getWikiRootSections} from "../../../support/getData";
import {menuEl} from "../../../support/locators";

describe('Check all wiki pages (wiki)', () => {
    let wikiData

    before(() => {
        cy.setToken('manager')
        cy.setImgToken('manager')

        cy.visit('/wiki')
        cy.post(getWikiRootSections())
            .then(res => wikiData = res.body.data.wikiRootSections)
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
    })
    afterEach(() => {
        cy.saveLocalStorage()
    })

    it('Rendering all descriptions and title correct', () => {
            wikiData.forEach(el =>{
                cy.get('div').contains(el.description).should('be.visible')
                cy.get('div').contains(el.title).should('be.visible')
            })
    })

    it('Check all link', () => {
        wikiData.forEach(el =>{
            if(!el.path.includes('http')) {
                if(el.title !== 'Hobbies') {
                    cy.get('div').contains(el.title).click()
                    cy.getElement('title').should('contain.text', el.title)
                    cy.getIcon(menuEl.back).click()
                }
            }
        })
    })
})

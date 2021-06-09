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

    it('Check all link', () => {
        wikiData.forEach(el =>{
            if(!el.path.includes('http') && el.title !== 'Hobbies') {
                cy.get('div').contains(el.title).click()
                cy.getElement('title').should('contain.text', el.title)
                cy.getIcon(menuEl.back).click()
            }
        })
    })
})

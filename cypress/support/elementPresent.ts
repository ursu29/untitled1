import {getElement} from "./mainCommands";

export const checkIfElementPresent = (visibleEl: string, text: string) => {
    cy.document().then(doc => {
        if (doc.querySelectorAll(`[data-cy=${visibleEl}]`).length) {
            getElement(visibleEl).should('have.text', text)

            return
        }
        getElement(visibleEl).should('not.exist')
    })
}

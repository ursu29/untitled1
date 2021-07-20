import {table, spinner} from '../../../support/locators'
import {createWorkplaceBooking, deleteWorkplaceBooking, workspace, workspacePoolQuery} from "../../../support/getData";

describe('update Office planner day (office-planner)', () => {
    let locationId, workplaceId, workplaceBookingId, text

    before(() => {
        cy.setToken('employee')
        cy.post(workspacePoolQuery()).then(req => locationId = req.body.data.workspaces[0].id)

        cy.visit('/office-planner')

        cy.get(table.activeTab).then(el => text = el.text())
    })

    beforeEach(() => {
        cy.addHeadersAuth()
    })
    afterEach(() => {
        cy.addHeadersAuth()
    })

    after(() => {
        cy.post(deleteWorkplaceBooking(workplaceBookingId)).then(req => {
            expect(workplaceBookingId).equal(req.body.data.deleteWorkplaceBooking.id)
        })
    })

    it('get a workspace', () => {
        cy.post(workspace(locationId))
            .then(req => workplaceId = req.body.data.workspace.workplaces[0].id)
    })

    it('book place', () => {
        cy.post(createWorkplaceBooking(workplaceId))
            .then(req =>workplaceBookingId = req.body.data.createWorkplaceBooking.id)
    })

    it('book one day', () => {
        cy.visit('/office-planner')

        cy.get(spinner.active).should('be.visible')
        cy.get(spinner.active).should('not.exist')
        cy.get(table.activeTab).then(el => expect(el.text()).not.equal(text))
    })
})

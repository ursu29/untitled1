import {planData} from "../../support/client/devPlan";
import {employeeData} from "../../support/client/employeeData";
import {getArchivedDPVersions} from "../../support/getData";

describe('check archivedDPVersions response', () => {
    let response

    beforeEach(() => {
        cy.setToken('employee')
        cy.post(getArchivedDPVersions(employeeData.employee.email)).then(res => response = res.body.data)
    })

    it('Check archivedDPVersions', () => {
        const { archivedDPVersions } = response

        archivedDPVersions.forEach(el => {
            cy.compareObjectsKeys(el, planData)
            expect(el.__typename).equal(planData.__typename)
        })
        expect(archivedDPVersions).to.be.a('array')
    })
})
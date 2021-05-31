import {getAllBirthdays, getNotifications} from "../../../support/getData";
import {getDayAndMonth} from "../../../support/officePlanner/officeDays";

describe('get notification data', () => {
    const allData = []
    const allDates = [getDayAndMonth(0), getDayAndMonth(1), getDayAndMonth(2)]

    before(() => {
        cy.setToken('employee')
        cy.post(getNotifications()).as('notification')
        cy.post(getAllBirthdays()).then(req => {
            req.body.data.employees.map(el => allDates.includes(el.birthday) ? allData.push(el.birthday) : null)
        })
    })

    it('get all notifications', () => {
        cy.get('@notification').should(res => {
            expect(allData.length).equal(res.body.data.notifications.length)
        })
    })
})
import {checkKeyValueExist} from "../../support/complexLocators";
import {employeeData} from "../../support/client/employeeData";

describe('Check Employee',() => {

    before(() => {
        cy.setToken('employee')
        cy.setImgToken('manager')
    })

    const {
        bonuses,
        country,
        email,
        id,
        isMe,
        location,
        name,
        phoneNumber,
        position,
        status,
        __typename,
    } = employeeData.employee

    it('getEmployee response', () => {
        cy.getResponse(['getEmployee', 'agileManager'], 'alias')
        cy.visit('/profile')

        cy.wait('@alias').then(req => {
            const { data } = req.response.body

            checkKeyValueExist(data.employeeByEmail, {
                bonuses,
                country,
                email,
                id,
                isMe,
                location,
                name,
                phoneNumber,
                position,
                status,
                __typename,
            })
        })
    })
});

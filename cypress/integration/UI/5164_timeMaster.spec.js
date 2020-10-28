export const notificationEl = {
  title: '.ant-notification-notice-message',
  logButton: '.ant-btn',
  errIframe: 'tm_iframe',
}

describe('Adding Skills in the Users Profile', () => {
  const message = "If timemaster is not available, probably you're not authorized";

  before(() => {
    cy.setToken('employee');
    cy.visit('/');
  });

  it('Click on the "Timemaster"', () => {
    cy.getElement('timemaster').click();

    cy.get(notificationEl.title).should('be.visible');
    cy.get(notificationEl.title).should('have.text', message);
    cy.get(notificationEl.logButton).should('be.visible')
    cy.get(notificationEl.logButton).should('have.text', 'Login')
    cy.getElement(notificationEl.errIframe).should('be.visible')
  });

});

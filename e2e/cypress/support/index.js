// import '@cypress/code-coverage/support'
import addContext from 'mochawesome/addContext'

import './commands'
import './getData'
import './authorization'

Cypress.on("test:after:run", (test, runnable) => {
    if (test.state === "failed") {
        const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
        addContext({ test }, screenshot);
    }
});



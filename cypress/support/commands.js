
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {

    cy.get('#firstName').type('Gabriel');
    cy.get('#lastName').type('Jundurian');
    cy.get('#email').type('example@example.com');
    cy.get('#open-text-area').type('ahahaha');
})

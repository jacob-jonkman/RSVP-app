describe('Login test', function() {
  it('Tests correct login and logging out', function() {
    cy.visit('http://localhost:4200');
    cy.get('#email')
      .type('usertest@test.com')
      .should('have.value', 'usertest@test.com');
    cy.get('#password')
      .type('passwordtest');
    cy.get('#login-button')
      .click();
    cy.url().should('include', 'activities');
    cy.get('#logout-button')
      .click();
    cy.url().should('not.contain', 'activities');
    cy.get('#logout-button').should('not.exist');
  });

  it('Tests incorrect login', function() {
    cy.visit('http://localhost:4200');
    cy.get('#email')
      .type('usertest@test.com')
      .should('have.value', 'usertest@test.com');
    cy.get('#password')
      .type('incorrectpassword');
    cy.get('#login-button')
      .click();
    cy.url().should('not.contain', 'activities');
  });

  it('Tests if user can not visit activities page while not logged in', function() {
    cy.visit('http://localhost:4200/activities');
    cy.url().should('not.contain', 'activities');
  });
})

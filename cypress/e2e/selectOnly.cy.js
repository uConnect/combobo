describe('selectOnly', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('index'));
  });

  it('should select the option matching the first letter', () => {
    cy.get('#combobox-select-only-as-input-combobo').type('a{enter}');

    cy.get('#combobox-select-only-as-input-combobo').should(
      'have.value',
      'April'
    );
  });

  it('should select the option matching the second month matching the letter', () => {
    cy.get('#combobox-select-only-as-input-combobo').type('j j j{enter}');

    cy.get('#combobox-select-only-as-input-combobo').should(
      'have.value',
      'July'
    );
  });

  it('should not select an option when pressing esc', () => {
    cy.get('#combobox-select-only-as-input-combobo').type('j{esc}');

    cy.get('#combobox-select-only-as-input-combobo').should('be.empty');
  });
});

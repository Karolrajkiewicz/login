/// <reference types="Cypress" />

const SELECTORS = {
  submitButton: ".form__button",
  emailInputId: "#mat-input-0",
  passwordInputId: "#mat-input-1",
  errorMessageEmail: "#mat-error-2",
  errorMessagePassword: "#mat-error-1",
  wrongCredentials: ".error > span",
  menuIcon: ".header__icon > .mat-icon",
  privacyFooter: ".privacy",
  languageEN: ".mat-menu-content > :nth-child(1)",
  languagePL: ".mat-menu-content > :nth-child(2)",
  languageHU: ".mat-menu-content > :nth-child(3)",
  languageRO: ".mat-menu-content > :nth-child(4)",
  languageCZ: ".mat-menu-content > :nth-child(5)",
  languageSK: ".mat-menu-content > :nth-child(6)",
};

describe("Login form", () => {
  beforeEach(() => {
    cy.visit("https://PMI:Wx3BTD4BJhWGXukCtFGU@rc.mlwtour.pl");
    cy.get('.cookies-popup__button > .mat-ripple > .ng-star-inserted').click();
  });

  it("should show validation errors when submiting an empty form", () => {
    //when
    cy.get(SELECTORS.submitButton).click();

    //then
    cy.contains(SELECTORS.errorMessageEmail,"Required field").should("be.visible");
    cy.contains(SELECTORS.errorMessagePassword,"Required field").should("be.visible");
  });

  it("should show validation errors when submiting an form without accepting Terms&Conditions", () => {
   //when
    cy.get(SELECTORS.submitButton).click();

   //then
    cy.contains(SELECTORS.errorMessagePassword,"Required field").should("be.visible");
  });

  it("should login user when correct credentials are provided", () => {
    //given
    const correctUsername = "1337testertesttester+117@gmail.com";
    const correctPassword = "Test1313";

    //when
    cy.get(SELECTORS.emailInputId).type(correctUsername);
    cy.get(SELECTORS.passwordInputId).type(correctPassword);
    cy.get('.mat-checkbox-inner-container').click();
    cy.get(SELECTORS.submitButton).click();
    //then

    cy.url().should("include", "/events/calendar");
    cy.contains("Mon").should("be.visible");
  });

  it("should display an error when incorrect password is provided", () => {
    //given
    const correctUsername = "1337testertesttester+117@gmail.com";
    const incorrectPassword = "password";

    //when
    cy.get(SELECTORS.emailInputId).type(correctUsername);
    cy.get(SELECTORS.passwordInputId).type(incorrectPassword);
    cy.get('.mat-checkbox-inner-container').click();
    cy.get(SELECTORS.submitButton).click();
    //then

    cy.contains(SELECTORS.wrongCredentials,"Wrong credentials. Try again.").should("be.visible");
  });

  it("should display error when provided email is not valid", () => {
    //given
    const incorrectEmailAddress = "karolrajkiewicz95";
    const password = "password";
    //when

    cy.get(SELECTORS.emailInputId).type(incorrectEmailAddress);
    cy.get(SELECTORS.passwordInputId).type(password);
    cy.get('.mat-checkbox-inner-container').click();
    cy.get(SELECTORS.submitButton).click();
    //then

    cy.contains(SELECTORS.wrongCredentials,"Wrong credentials. Try again.").should("be.visible");
  });

  it("language should be set to PL", () =>{
      //when
      cy.get(SELECTORS.menuIcon).click();
      cy.get('.language__image').click();
      cy.get(SELECTORS.languagePL).click();
      cy.get(SELECTORS.menuIcon).click();

      //then
      cy.contains(SELECTORS.privacyFooter, "W razie problemów z logowaniem").should("be.visible");
  });

  it("language should be set to HU", () =>{
    //when
    cy.get(SELECTORS.menuIcon).click();
    cy.get('.language__image').click();
    cy.get(SELECTORS.languageHU).click();
    cy.get(SELECTORS.menuIcon).click();

    //then
    cy.contains(SELECTORS.privacyFooter, "A bejelentkezéssel vagy regisztrációval").should("be.visible");
});

  it("language should be set to RO", () =>{
  //when
  cy.get(SELECTORS.menuIcon).click();
  cy.get('.language__image').click();
  cy.get(SELECTORS.languageRO).click();
  cy.get(SELECTORS.menuIcon).click();

  //then
  cy.contains(SELECTORS.privacyFooter, "În cazul problemelor legate de autentificare").should("be.visible");
});
  it("language should be set to CZ", () =>{
  //when
  cy.get(SELECTORS.menuIcon).click();
  cy.get('.language__image').click();
  cy.get(SELECTORS.languageCZ).click();
  cy.get(SELECTORS.menuIcon).click();

  //then
  cy.contains(SELECTORS.privacyFooter, "V případě problémů s přihlášením nebo").should("be.visible");
});
  it("language should be set to SK", () =>{
  //when
  cy.get(SELECTORS.menuIcon).click();
  cy.get('.language__image').click();
  cy.get(SELECTORS.languageSK).click();
  cy.get(SELECTORS.menuIcon).click();
  
  //then
  cy.contains(SELECTORS.privacyFooter, "V prípade problémov s prihlásením alebo").should("be.visible");
});



});
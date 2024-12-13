class SeedListPage {
  // Selectors
  seedListTab = 'li.mat-ripple'; // Tab to select the Seed List
  seedIntervalInput = "input.mat-input-element[type='number']"; // Input field for seed interval
  manualOption = "input.mat-radio-input[type='radio']"; // Manual option radio button
  emailTextarea = "textarea[rows='8']"; // Textarea to enter email addresses
  associateListButton = '.app-button-success > .mat-button-wrapper'; // Button to associate the list
  confirmAssociateButton = '.dialog-actions > .app-button-success'; // Button to confirm associate list action
  okAlertButton = '.dialog-actions > .mat-focus-indicator'; // OK button on the associate list alert
  FeedAlert = ".dialog-actions > .app-button-success";
  browseFromFTP = "Browse From FTP"
  

  // Actions
  selectSeedListTab() {
    cy.get(this.seedListTab).eq(7).click();
    cy.wait(1000);
  }

  setSeedInterval(interval) {
    cy.get(this.seedIntervalInput).type(interval.toString());
    cy.wait(1000);
  }

  selectManualOption() {
    cy.get(this.manualOption).eq(4).click({ force: true });
    cy.wait(1000);
  }

  enterEmailAddresses(email) {
    cy.get(this.emailTextarea).type(email);
    cy.wait(3000);
  }

  clickOnAssociateList() {
    cy.get(this.associateListButton).click({ force: true });
    cy.wait(1000);
    //cy.get(this.confirmAssociateButton).click({ force: true });
    // cy.wait(1000);
    // cy.get(this.okAlertButton).click({ force: true });
    // cy.wait(2000);
  }
  handleFeedAlert(){
    cy.get('.dialog-actions > .app-button-success').click();
    cy.wait(7000)
  }
  clickOnBrowseFromFTP(){
    cy.contains(this.browseFromFTP).click({force:true})
  }

  clickOnAssociateAlerts(){
    cy.get(this.okAlertButton)
    .then((elements) => {
    if (elements.length > 1) {
      cy.wrap(elements).first().click();
      cy.wait(5000);
      cy.get(this.okAlertButton).click();
           
    } else {
      cy.get(this.okAlertButton).click();
    }
    
  });

  }


}

export default new SeedListPage();
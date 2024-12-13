class SendTestPage {
  // Selectors
  sendTestTab = 'Send Test'; // Used with `cy.contains`
  manualOption = 'Manual'; // Used with `cy.contains`
  emailTextArea = 'textarea';
  sendTestButton = '.tx-align-c > .mat-focus-indicator > .mat-button-wrapper';
  closePopupButton = '.mat-focus-indicator[type= button]';
  statusText = 'span.ng-star-inserted';
  refreshButton = 'button.mat-focus-indicator';
  approveCampaignButton = 'button.mat-focus-indicator'; // Use with `.eq(2)`
  approvePopupOkButton = "button.mat-focus-indicator[type='button']";
  sendTestText = 'div.content.ng-star-inserted';

  // Actions
  openSendTestTab() {
    cy.contains(this.sendTestTab).click();
  }

  selectManualOption() {
    cy.contains(this.manualOption).click();
  }

  enterEmail(email) {
    cy.get(this.emailTextArea).type(email);
  }

  clickSendTestButton() {
    cy.get(this.sendTestButton).click();
  }

  assertSendTestPopUp() {
    cy.get(this.sendTestText)
      .should('exist') // Ensure the element exists
      .should('have.text', 'SendTest Performed successfully.');
  }
  

  assertApproveTestPopUp(){
    cy.get(this.sendTestText).should('have.text', 'Campaign Approved Successfully');
  }

  closeSendTestPopup() {
    cy.get(this.closePopupButton).click();
  }

  checkStatus(maxWaitTime = 100000, refreshInterval = 2000) {
    let totalWaitTime = 0;

    const checkStatusRecursively = () => {
      cy.get(this.statusText).eq(1).invoke('text').then((statusText) => {
        if (statusText.trim() === 'Completed') {
          cy.log('Status is Completed!');
        } else if (totalWaitTime < maxWaitTime) {
          cy.get(this.refreshButton).eq(8).click(); // Click the refresh button
          cy.wait(refreshInterval);
          totalWaitTime += refreshInterval;
          checkStatusRecursively(); // Recursive check
        } else {
          cy.log('Timed out waiting for status to change to Completed');
        }
      });
    };

    checkStatusRecursively();
  }

  verifyStatusCompleted() {
    cy.get(this.statusText).eq(1).should('contain.text', 'Completed');
  }

  approveCampaign() {
    //cy.wait(2000)
    cy.get(this.approveCampaignButton).eq(2).click();
  }

  confirmApproveCampaignPopup() {
    //cy.wait(4000)
    cy.get(this.approvePopupOkButton).click({ force: true });
  }
}

export default new SendTestPage();

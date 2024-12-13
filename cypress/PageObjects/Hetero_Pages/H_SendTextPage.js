class H_SendTextPage {

    //elements
    emailTextArea = 'textarea';
    statusText = 'span.ng-star-inserted';
    refreshButton = 'button.mat-focus-indicator';




    //methods

    enterEmail(email) {
        cy.get(this.emailTextArea).eq(1).type(email);
    }


    checkStatuses(maxWaitTime = 100000, refreshInterval = 2000) {
        let totalWaitTime = 0;
    
        const checkStatusesRecursively = () => {
            cy.get(this.statusText).then((statusElements) => {
                const status1Text = Cypress.$(statusElements).eq(13).text().trim(); // Use Cypress.$ for jQuery handling
                const status2Text = Cypress.$(statusElements).eq(16).text().trim(); // Adjust the second index if necessary
    
                if (status1Text === 'Completed' && status2Text === 'Completed') {
                    cy.log('Both statuses are Completed!');
                } else if (totalWaitTime < maxWaitTime) {
                    cy.get(this.refreshButton).eq(9).click(); // Click the refresh button
                    cy.wait(refreshInterval);
                    totalWaitTime += refreshInterval;
                    checkStatusesRecursively(); // Recursive check
                } else {
                    cy.log('Timed out waiting for both statuses to change to Completed');
                }
            });
        };
    
        checkStatusesRecursively();
    }
    
      verifyStatusCompleted() {
        cy.get(this.statusText).eq(13).should('contain.text', 'Completed');
        cy.get(this.statusText).eq(16).should('contain.text', 'Completed');
    }
    




}

export default new H_SendTextPage();
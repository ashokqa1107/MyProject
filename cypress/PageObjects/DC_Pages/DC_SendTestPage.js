class H_SendTextPage {

    //elements
    emailTextArea = 'textarea';
    statusText = '(//table[1]/tbody[1]/tr/td)';
    refreshButton = 'button.mat-focus-indicator';




    //methods

    enterEmail(email) {
        cy.get(this.emailTextArea).eq(1).type(email);
    }


    checkStatuses(maxWaitTime = 100000, refreshInterval = 4000) {
        let totalWaitTime = 0;
    
        const checkStatusesRecursively = () => {
            cy.xpath(this.statusText).then((statusElements) => {
                const status1Text = Cypress.$(statusElements).eq(12).text().trim(); // Use Cypress.$ for jQuery handling
                const status2Text = Cypress.$(statusElements).eq(25).text().trim(); // Adjust the second index if necessary
    
                if (status1Text === 'Completed' && status2Text === 'Completed') {
                    cy.log('Both statuses are Completed!');
                } else if (totalWaitTime < maxWaitTime) {
                    cy.get(this.refreshButton).eq(9).click(); // Click the refresh button
                    cy.log('SendTest status1:', status1Text);
                    cy.log('SendTest status2:', status2Text);
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
        cy.xpath(this.statusText).eq(12).should('contain.text', 'Completed');
        cy.xpath(this.statusText).eq(25).should('contain.text', 'Completed');
    }
    




}

export default new H_SendTextPage();
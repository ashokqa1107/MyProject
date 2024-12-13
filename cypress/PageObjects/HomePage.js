class HomePage {

    //elements
    inputField = 'input[aria-autocomplete="list"]';
    dropdownOption = '.mat-option-text';
    affiliateDropDown = '.affiliateIdInput';
    affiliate = '.menu-container';







    selectOffer(offer) {
        cy.get(this.inputField).then(($element) => {
            cy.wrap($element.eq(0)).type(offer);
        });
        cy.wait(1000);
        cy.get(this.dropdownOption).first().click();
    }


    selectTemplate(index) {
        cy.get(this.inputField).then(($element) => {
            cy.wrap($element.eq(1)).click();
        });
        cy.wait(1000);
        cy.get(this.dropdownOption).eq(index).click();
    }


    selectDomains(DomainName) {
        cy.get(this.inputField).then(($element) => {
            cy.wrap($element.eq(2)).type(DomainName);
        });
        cy.wait(1000);
        cy.get(this.dropdownOption).first().click({ force: true });
    }



}
export default new HomePage();
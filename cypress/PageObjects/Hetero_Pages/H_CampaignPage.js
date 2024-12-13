class H_CampaignPage{

//elements
inputField = 'input[aria-autocomplete="list"]';
dropdownOption = '.mat-option-text';
affiliateDropDown = '.affiliateIdInput';
affiliate = '.menu-container';







selectOffer(offer) {
    cy.get(this.inputField).then(($element) => {
      cy.wrap($element.eq(0)).type(offer);
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).first().click();
  }


  selectCreative(index) {
    cy.get(this.inputField).then(($element) => {
      cy.wrap($element.eq(1)).click();
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).eq(index).click();
  }


  selectSubjectLine(index) {
    cy.get(this.inputField).then(($element) => {
      cy.wrap($element.eq(2)).click();
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).eq(index).click();
  }

  selectDisplayName(index) {
    cy.get(this.inputField).then(($element) => {
      cy.wrap($element.eq(3)).click();
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).eq(index).click({force:true});
  }

  selectDomains(DomainName) {
    cy.get(this.inputField).then(($element) => {
      cy.wrap($element.eq(4)).type(DomainName, {Delay:0});
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).first().click({force:true});
  }

  selectAffiliate(dropdownIndex){
    cy.get(this.affiliateDropDown).then(($element) => {
        cy.wrap($element.eq(dropdownIndex)).click({force:true});
        cy.get(this.affiliate).first().click();        
      });
  }



}

export default new H_CampaignPage();
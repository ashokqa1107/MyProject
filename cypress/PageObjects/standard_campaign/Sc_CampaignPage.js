class CampaignPage {
  // Selectors
  createStandardCampaignButton = "i[title='Create Standard Campaign']";
  inputField = 'input[aria-autocomplete="list"]';
  dropdownOption = '.mat-option-text';
  affiliateInputField = 'input.mat-input-element[autocomplete="off"]';
  affiliateDropdownOption = '.menu-container > ul > .mat-ripple';
  saveButton = 'span.mat-button-wrapper';
  alertCloseButton = "button.mat-focus-indicator[type='button']";
  campaignErrors = "div[class='custom-snackbar'] > i[title='Close']";
  lastPage = "//button[@aria-label='Last page']//span[@class='mat-button-wrapper']//*[name()='svg']";
  fistCampaingInTable = "i[title='Edit Campaign']";
  campiagn = "input.middletext";
  CampaignSearch = "[placeholder='Enter Campaign Name']";
  //cpm
  cpm = "(//div[@class='mat-radio-outer-circle'])[2]";


// Actions

//click on cpm radio button
  clickOnCpmRadioBtn(){
    cy.xpath(this.cpm).click({force:true});
  }

//enter campaign name
  entercampaignName(CName){
    cy.get(this.campiagn).type(CName)
  }

  searchCampaignName(enterCName){
    cy.get(this.CampaignSearch).type(`${enterCName}{enter}`);
    //cy.wait(2000)
  }

  clickOnLastPageArrowMark(){
    cy.xpath(this.lastPage).click({force:true});
    //cy.wait(3000);
  }

  clickOnFirstCampaignInTable(){
    cy.get(this.fistCampaingInTable).click({force:true});
  }


  clickCreateStandardCampaign() {
    cy.get(this.createStandardCampaignButton).click({ force: true });
    //cy.wait(1000);

  }

  handleCampaignErrors(){
    cy.handleCampaignErrors(this.campaignErrors)
  }


  selectDomain(domain) {
    cy.get(this.inputField).first().type(domain);
    //cy.wait(1000);
    cy.get(this.dropdownOption).first().click();

  }

  selectOffer(offer) {
    cy.get(this.inputField).then(($element) => {
      cy.wrap($element.eq(1)).type(offer);
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).first().click();
  }

  selectAffiliate() {
    cy.get(this.affiliateInputField).then(($element) => {
      cy.wrap($element.eq(2)).click();
    });
    //cy.wait(1000);
    cy.get(this.affiliateDropdownOption).first().click();
  }

  selectCreative(index) {
    cy.get(this.affiliateInputField).then(($element) => {
      cy.wrap($element.eq(3)).click();
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).eq(index).click();
  }

  selectSubjectLine() {
    cy.get(this.affiliateInputField).then(($element) => {
      cy.wrap($element.eq(4)).click();
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).eq(4).click();
  }

  selectDisplayName(index) {
    cy.get(this.affiliateInputField).then(($element) => {
      cy.wrap($element.eq(5)).click();
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).eq(index).click({force:true});
  }

  selectDisplayNameForRLtp() {
    cy.get(this.affiliateInputField).then(($element) => {
      cy.wrap($element.eq(5)).click();
    });
    //cy.wait(1000);
    cy.get(this.dropdownOption).eq(1).click({force:true});
  }

  saveCampaign() {
    cy.get(this.saveButton).then(($element) => {
      cy.wrap($element.eq(1)).click();
    });
  }

  handleAlert() {
    cy.get(this.alertCloseButton).click({ force: true });
  }
}

export default new CampaignPage();

class ListPage {

  // Selectors    
  listTab = 'li.mat-ripple';
  //FTP
  ftpButton = "i.fa-solid[title='Add From FTP']";
  folderPathInput = "input.ng-pristine[placeholder='Enter Folder Path']";
  folderItem = 'li.ng-star-inserted';
  okButton = 'button.mat-focus-indicator';

  //LPT AND FEED RESPONDER 
  lptResponderButton = "i.fa-solid[title='Add Domain Responder/LPT List']"; // Button to add LPT Responder List
  feedResponderButton = "i.fa-solid[title='Add Feed Responder List']"; // Button to add Feed Responder List
  LPTdropdown = "select.ng-pristine";
  //"(//select[@class='ng-pristine ng-valid ng-touched'])[1]"; // Dropdown for list type selection (e.g., Till Date)
  feedDropdownButton = 'select.ng-pristine'; // Button to open feed selection dropdown
  feedOption = 'input.mat-ripple';
  feedSearch = "//input[@placeholder='Search ']";
  feedOptiondropDown = ".mat-focus-indicator.ng-star-inserted > .w-full";// Option in the feed selection dropdown
  volumeInputField = "input.ng-pristine[placeholder='Volume']"; // Input field for volume value

  //RLTP
  rltpButton = "//i[@title='Add RLTP List']";
  rltpRequestsDropDown = "(//mat-select[@role='combobox'])[1]";
  requestsListFromDropDown = "span.mat-option-text";
  TillDateDropDown = ".cl-2 > .ng-pristine";
  saveRLTPBtn = "//span[normalize-space()='Save']";
  //Wormup_List
  warmupCheckbox = "div.mat-checkbox-inner-container"; // Checkbox for warm-up
  wormup_ftpButton = "li[title='Upload from FTP']"; // Button to upload from FTP
  folderPathInput = "input.ng-pristine[placeholder='Enter Folder Path']"; // Input field for folder path
  folderOption = 'li.ng-star-inserted'; // Folder option in the list
  okButton = ".dialog-actions > .app-button-success"; // OK button in the dialog
  initialIntervalInput = "input.ng-valid[placeholder='Initial Interval']"; // Input field for initial interval
  warmupIntervalInput = "input.ng-valid[placeholder='WarmUp Interval']"; // Input field for warm-up interval

  associateListText = 'div.content.ng-star-inserted';



  assertAssociateTestPopUp() {
    // Wait for the element to appear, then assert
    cy.get(this.sendTestText, { timeout: 10000 }) // Extend timeout to handle delays
      .should('be.visible') // Ensure the element is visible
      .and('have.text', 'List(s) associated with campaign successfully');
  }

  //RLTP

  clickOnRLTPBtn(){
    cy.xpath(this.rltpButton).click({force:true});
  }

  clickOnRLTPRequestDropdown(){
    cy.xpath(this.rltpRequestsDropDown).trigger('mouseover').click({force:true});
    //cy.wait(2000)
  }

  selectRequestFromDropdown(){
    cy.get(this.requestsListFromDropDown).first().click();
  }

  //select Till Date in RLTP DROPDOWN
  clickOnTillDateDropDownFromRLTP(){
    cy.get(this.TillDateDropDown).select(10);
  }

  clickOnSaveRLTP(){
    cy.xpath(this.saveRLTPBtn).click({force:true});
  }



  // FTP 
  clickListTab() {
    cy.get(this.listTab).eq(4).click();
    //cy.wait(6000); // Wait for the List tab to load
  }

  clickFTPButton() {
    cy.get(this.ftpButton).click({ force: true });
  }

  enterFolderPath(path) {
    cy.get(this.folderPathInput).type(`${path}{enter}`);
    //cy.wait(1000); // Wait for folder selection to appear
  }

  selectFolder(fileName) {
    cy.get(this.folderItem).contains(fileName).click({ force: true });
    //cy.wait(1000); // Wait after folder selection
  }

  selectMultipleFiles(fileNames) {
    // Loop through each file name and select the folder
    fileNames.forEach((fileName) => {
      cy.get(this.folderItem).contains(fileName).click({ force: true });
    });
  }



  clickOkButton() {
    cy.get(this.okButton).click({ force: true });
    //cy.wait(1000); // Wait for confirmation action
  }


  //LPT AND FEED RESPONDER ACTIONS

  addLPTList(selectDate) {
    cy.get(this.lptResponderButton).click({ force: true });
    //cy.wait(3000); 
    cy.get(this.LPTdropdown).eq(4).select(selectDate);
  }

  changeLPTList(selectDate) {
    cy.get(this.LPTdropdown).eq(4).select(selectDate);
  }

  addFeedResponderList($volume) {
    //cy.wait(1000);
    cy.get(this.feedResponderButton).click({ force: true });
    //cy.wait(2000);
    cy.get(this.feedDropdownButton).eq(4).select('Till Date');
    cy.get(this.feedOption).eq(1).click();
    cy.xpath(this.feedSearch).type('100000099{enter}')
    //cy.wait(1000)
    cy.get(this.feedOptiondropDown).click();
    cy.get(this.volumeInputField).type($volume);

  }


  //Wormup Actions

  selectWarmupCheckbox() {
    cy.get(this.warmupCheckbox).eq(1).click({ force: true });
    //cy.wait(1000);
  }

  uploadFromFTP(folderPath, fileName1, fileName2 ) {
    cy.get(this.wormup_ftpButton).click();
    //cy.wait(3000);
    cy.get(this.folderPathInput).type(`${folderPath}{enter}`);
    //cy.wait(1000);
    cy.get(this.folderOption).contains(fileName1).click({ force: true });
    //cy.wait(1000);
    cy.get(this.folderOption).contains(fileName2).click({ force: true });
    cy.get(this.okButton).click({ force: true });
    //cy.wait(2000);
  }

  setWarmupIntervals(initialInterval, warmupInterval) {
    cy.get(this.initialIntervalInput).type(initialInterval);
    //cy.wait(1000);
    cy.get(this.warmupIntervalInput).type(warmupInterval);
    //cy.wait(1000);
  }

  uploadSeedListFromFTP(folderPath, fileName) {
    cy.get(this.folderPathInput).type(`${folderPath}{enter}`);
    //cy.wait(1000);
    cy.get(this.folderOption).contains(fileName).click({ force: true });
    //cy.wait(1000);
    cy.get(this.okButton).trigger('mouseover').click({ force: true });
    cy.wait(2000);
  }

}

export default new ListPage();
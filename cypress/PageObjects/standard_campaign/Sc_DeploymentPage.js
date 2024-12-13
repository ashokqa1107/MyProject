class DeploymentPage {
  // Selectors
  deploymentTab = 'li.mat-ripple'; // Deployment tab
  scheduleNameInput = "input.mat-input-element[title='ScheduleName']"; // Input for schedule name
  ListCheckbox = 'div.mat-checkbox-inner-container'; // Checkboxes for schedule selection
  deployButton = ".w-full > .mat-focus-indicator"; // Deploy button
  deployAlertButton = "//span[normalize-space()='Close']"; // Deploy alert confirmation button
  reportsButton = "[title='Goto Reports']"; // Button to go to reports
  getReportBtn = ":nth-child(5) > .mat-focus-indicator > .mat-button-wrapper";
  Deploymentstatus = "//tbody/tr/td[3]";
  wormupbtn = "input[value='W']";
  feedAlert = ".dialog-actions > .app-button-success";
  seedListCheckBox = "#mat-checkbox-15 > .mat-checkbox-layout > .mat-checkbox-inner-container";
  includWormupCheckBox = "div.mat-checkbox-inner-container";
  campaignErrors = "div[class='custom-snackbar'] > i[title='Close']";

  //RealTime
  realtimeRadioBtn = "div.mat-radio-outer-circle"; //real time radio btn
  ispFilterDropDown = "tr.ng-star-inserted > :nth-child(2) > app-searchdropdwon > :nth-child(1) > .dropdown > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #ispFilterDropDown" //real time onday isp_filterdropdown
  SearchIsps = "input[placeholder='Search ISP(s)']" //search 
  responderTypeDropdown = "mat-select[role='combobox']"; //responder dropdown
  ResponderType = "span.mat-option-text"; //select responder type
  dayQuata = ".mat-form-field-infix > .mat-input-element"

  //multi Schedule
  multiScheduleRadioBtn = "(//div[@class='mat-radio-outer-circle'])[2]";
  addNewScheduleBtn = "//span[normalize-space()='Add New Schedule']";
  addAndCloseBtn = "//span[normalize-space()='Add & Close']";
  multiScheNowBtn = "//div[@class='mat-radio-outer-circle']";
  multiScheAllRadioBtns = "//div[@class='mat-radio-outer-circle']"
  multiScConfirmBtn = "//div[@class='mat-radio-outer-circle']";
  MultiScAlertBtn = ".dialog-actions > button";
  MultiScWormupRadioBtn = "(//div[@class='mat-radio-outer-circle'])[4]"
  scheduleStatusBtn = "(//div[@class='mat-radio-outer-circle'])[10]"
  mSRealTimeTextBoxes = "input.mat-input-element";
  closeDeployAlert = "footer.dialog-actions > button.mat-focus-indicator";

  //deployment reports page
  listTypeDropdown = ".inlineElement.ng-star-inserted > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix";
  selectWormup = ".mat-option-text"
  sentStatus = "(//tbody//tr//td[20])";

  //un expected alerts
  ltpAlert = "div.dialog-actions > button"


  // Actions
  openDeploymentTab() {
    cy.get(this.deploymentTab).eq(5).click();
    //cy.wait(1000); // Wait for tab to load
  }

  handleUnexpectAlertWindows() {
    cy.clickIfExists(this.ltpAlert);
  }

  handleMsUnexpectedAlertWindows(){
    cy.mSclickIfExists(this.closeDeployAlert);
  }


  //MultiSchedule

  clickOnMultiScheduleRadioBtn() {
    cy.xpath(this.multiScheduleRadioBtn).click({ force: true });
  }

  clickOnAddNewSchedule() {
    cy.xpath(this.addNewScheduleBtn).click({ force: true });
  }

  clickOnAddAndCloseBtn() {
    cy.xpath(this.addAndCloseBtn).click({ force: true });
  }

  clickOnNowRadioBtn() {
    cy.xpath(this.multiScheNowBtn).eq(6).click({ force: true });
  }

  clickOnMSConfirmBtn() {
    cy.xpath(this.multiScConfirmBtn).eq(10).click({ force: true });
  }

  clickOnScheduleAlertConfirmBtn() {
    cy.get(this.MultiScAlertBtn).trigger('mouseover').click({force:true});
  }

  clickOnMultiScWormupRadioBtn() {
    cy.xpath(this.MultiScWormupRadioBtn).click({ force: true });
  }

  clickOnScheduleStatusBtn() {
    cy.xpath(this.scheduleStatusBtn).click({ force: true });
  }

  clickOnMultiScheRadioBtnOf(index) {
    cy.xpath(this.multiScheAllRadioBtns).eq(index).click({ force: true })
  }

  enterTextIntoRealtimeTextBox(index, entertext) {
    cy.get(this.mSRealTimeTextBoxes).eq(index).type(entertext);
  }

  clickOnMSAlertDeployBtn(){
    cy.get(this.closeDeployAlert).click({force:true})
  }








  clickOnRealTimeRadioBtn() {
    cy.get(this.realtimeRadioBtn).eq(5).click({ force: true });
  }

  clickOnDayIspDropDown() {
    cy.get(this.ispFilterDropDown).click({ force: true })
  }

  clickOnSearchForIsp(IspName) {
    cy.get(this.SearchIsps).type(IspName);
  }

  clickOnResponderTypeDropDown() {
    cy.get(this.responderTypeDropdown).eq(0).click({ force: true });
  }

  selectResponderTypeInDropDown() {
    cy.get(this.ResponderType).eq(1).click();
  }


  enterScheduleName(scheduleName) {
    cy.get(this.scheduleNameInput).clear().type(scheduleName);
    //cy.wait(1000); // Wait for input action
  }

  selectListByIndex(index) {
    cy.get(this.ListCheckbox)
      .eq(index)
      .click({ force: true })
  }
  clickDeploy() {
    cy.get(this.deployButton).click({ force: true });
    //cy.wait(5000); // Wait for deploy process
  }

  multiScDeployClick() {
    cy.get(this.deployButton).eq(2).click({ force: true });
    //cy.wait(5000);

  }

  handleFeedAlerts() {
    cy.get(this.feedAlert).click();
    //cy.wait(3000);
  }

  enterTextIntoDayQuataSC(enterNum) {
    cy.get(this.dayQuata).eq(4).type(enterNum, { force: true });
  }

  enterTextIntoDayQuata(enterNum) {
    cy.get(this.dayQuata).eq(2).type(enterNum, { force: true });
  }

  confirmDeployAlert() {
    cy.xpath(this.deployAlertButton).trigger('mouseover').click({ force: true })
  }

  goToReports() {
    cy.get(this.reportsButton).click();

  }

  checkMultipleDeploymentStatus(maxWaitTime, refreshInterval, index) {
    let totalWaitTime = 0;
    cy.get(this.getReportBtn).click({ force: true });

    const checkStatusRecursively = () => {
      cy.xpath(this.Deploymentstatus)
        .eq(index)
        .invoke('text')
        .then((statusText) => {
          const trimmedStatus = statusText.trim();

          if (trimmedStatus === 'Completed') {
            cy.log(`${index}) Row Status is Completed!`);

            // Verify status is 'Completed'
            cy.xpath(this.Deploymentstatus)
              .eq(index)
              .should('have.text', 'Completed');

            //cy.wait(1000);

            // Check that 'Sent Status' is not '0'
            // cy.xpath(this.sentStatus)
            //   .eq(index)
            //   .should('not.have.text', '0');

            // Log the sent status
            cy.xpath(this.sentStatus)
              .eq(index)
              .invoke('text')
              .then((sentStatusText) => {
                const trimmedSent = sentStatusText.trim();
                cy.log(`Sent status is: ${trimmedSent}`);
                // cy.xpath(this.sentStatus).eq(index).tringger('mouseover').click({ force: true })
                //cy.wait(3000);
              });

          }
          else if (trimmedStatus === 'Errored') {
            cy.log(`Status is Errored for row ${index}. Continuing the test but marking the status as failed.`);
            expect(trimmedStatus).to.not.equal('Errored');
            return;

          } else if (totalWaitTime < maxWaitTime) {
            cy.log(`Current status: ${trimmedStatus}. Retrying...`);

            // Refresh the status by clicking the button
            cy.get(this.getReportBtn).click();

            // Wait and retry
            cy.wait(refreshInterval);
            totalWaitTime += refreshInterval;
            checkStatusRecursively();

          } else {
            // Timeout case
            cy.log('Timed out waiting for status to change to Completed.');
          }
        });
    };

    // Start the recursive check
    checkStatusRecursively();
  }



  checkDeploymentStatus(maxWaitTime, refreshInterval) {
    let totalWaitTime = 0;

    const checkStatusRecursively = () => {
      cy.xpath(this.Deploymentstatus).invoke('text').then((statusText) => {
        const trimmedStatus = statusText.trim();
        if (trimmedStatus === 'Completed') {
          cy.log($index, ') Row Status is Completed!');
          cy.xpath(this.Deploymentstatus).should('have.text', 'Completed');
        } else if (totalWaitTime < maxWaitTime) {
          cy.log(`Current status: ${trimmedStatus}. Retrying...`);
          cy.get(this.getReportBtn).click(); // Click the refresh button
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



  clickOnGetReport() {
    const iterations = 22;
    for (let i = 0; i < iterations; i++) {
      cy.wait(2000);
      cy.get(this.getReportBtn).click({ force: true });
      cy.handleCampaignErrors(this.campaignErrors);
      
    }

  }

  clickOnWormupRadioBtn() {
    cy.get(this.wormupbtn).click({ force: true })
  }


  selectWormupInListTypeDropDown() {
    cy.get(this.listTypeDropdown).click();
    cy.get(this.selectWormup).eq(2).click({force:true});
  }

  selectSeedInListTypeDropDown() {
    cy.get(this.listTypeDropdown).click();
    cy.get(this.selectWormup).eq(2).click({force:true});
  }

  clickOnSeedListCheckBox() {
    cy.get('#mat-checkbox-15 > .mat-checkbox-layout > .mat-checkbox-inner-container').click({ force: true });
  }

  clickOnWormupCheckBox() {
    //cy.wait(4000)
    cy.get(this.includWormupCheckBox).eq(4).click({ force: true })
  }








}

export default new DeploymentPage();

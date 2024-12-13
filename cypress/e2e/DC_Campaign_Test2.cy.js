import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved, checkStatusAndRefresh } from '../support/common_prop';
import Login from "../PageObjects/LoginPage.js";
import CampaignPage from '../PageObjects/standard_campaign/Sc_CampaignPage.js';
import H_CampaignPage from '../PageObjects/Hetero_Pages/H_CampaignPage.js';
import SendTestPage from '../PageObjects/standard_campaign/Sc_SendTestPage.js';
import ListPage from '../PageObjects/standard_campaign/Sc_ListPage.js';
import SeedListPage from '../PageObjects/standard_campaign/Sc_SeedListPage.js';
import H_DeploymentPage from '../PageObjects/Hetero_Pages/H_DeploymentPage.js';
import H_SendTextPage from '../PageObjects/Hetero_Pages/H_SendTextPage.js';
import H_ListPage from '../PageObjects/Hetero_Pages/H_ListPage.js';
import DC_CampaignPage from '../PageObjects/DC_Pages/DC_CampaignPage.js';
import DC_SendTestPage from '../PageObjects/DC_Pages/DC_SendTestPage.js';
import DC_DeploymentPage from '../PageObjects/DC_Pages/DC_DeploymentPage.js';


describe('Hetero_campaign_Specs', () => {

    let campaignName;
    before(() => {
        cy.generateRandom3DigitString().then((randomString) => {
            campaignName = 'DC_Campaign_MS_' + randomString;
            cy.log('Campaign Name: ' + campaignName);
        });
        console.log(`Running test file: ${Cypress.spec.name}`); // Print the name of the current cy.js file
        cy.log(`Running test file: ${Cypress.spec.name}`)
    });


    beforeEach(() => {
        console.log(`Test Started: ${Cypress.currentTest.title}`);
        cy.log(`${Cypress.currentTest.title} Test is Started`);
        cy.fixture("standard_campaign").then((data) => {
            //Login
            const ln = new Login();
            cy.visit(data.url);
            cy.wait(5000);
            ln.setUserName(data.username);
            ln.setPassword(data.password);
            cy.contains(' Log In ').click();
            // cy.wait(1000)
            cy.url().should('contain', 'campaign/campaignlist');
            cy.log('user successfully login into GreenMailer');
            cy.wait(3000);
            // handle campaign errors popups
            CampaignPage.handleCampaignErrors()
            // cy.wait(2000);
            //select the usergroup
            selectUsergroup(data.groupName);
        });
    });

    afterEach(function () {
        const status = this.currentTest.state === 'passed' ? 'Passed' : 'Failed';
        console.log(`Test "${this.currentTest.title}" is ${status}`); // Print if the test passed or failed
        cy.log(`Test "${this.currentTest.title}" is ${status}`);
    });

    after(() => {
        cy.log(`Test file ${Cypress.spec.name} has completed.`); // Print that the current cy.js test is completed
    });





    //1.upto SendText
    it('Hetero_Campaign_Upto_SendTest', () => {

        cy.fixture("standard_campaign").then((data) => {
            //Campaign Page
            cy.get("[title='Create Dynamic Content Campaign']").click({ force: true });
            CampaignPage.entercampaignName(campaignName);
            cy.wait(2000)
            H_CampaignPage.selectOffer('80000029');
            DC_CampaignPage.selectTemplate(0);
            DC_CampaignPage.selectDomains("technologyinfohub.com_test - NetInternet2 - ZXDEV (Shared)");
            DC_CampaignPage.selectDomains("bestmoneyfunds.com_18 - DEVPMTA - ZXDEV (Shared)");
            CampaignPage.saveCampaign();
            CampaignPage.handleAlert();
            // cy.wait(1000)
            // Send Test Process
            SendTestPage.openSendTestTab();
            // cy.wait(1000);
            SendTestPage.selectManualOption();
            // cy.wait(1000);
            H_SendTextPage.enterEmail('gimandi@zetaglobal.com');
            // cy.wait(1000);
            SendTestPage.clickSendTestButton();
            // cy.wait(7000);
            SendTestPage.closeSendTestPopup();
            // cy.wait(1000);
            // Wait and check status
            DC_SendTestPage.checkStatuses(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            DC_SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            // cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();


        });
    });

    //2.upto Lists
    it('Hetero_Campaign_Upto_Lists', () => {

        cy.fixture("standard_campaign").then((data) => {

            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            // cy.wait(5000)
            //ListPage
            ListPage.clickListTab();

            //Giving List through LPT and Feed Responder
            // cy.wait(1000)
            H_ListPage.addLPTList("Till Date");
            cy.wait(2000);
            H_ListPage.addFeedResponderList(2);

            //FTP 
            //select the file through FTP
            H_ListPage.clickFirstFTPButton();
            H_ListPage.enterFolderPath(data.FTP_PATH);
            H_ListPage.DragAndDropTheFile(data.FTP_filename[0]);
            H_ListPage.DragAndDropTheFile(data.FTP_filename[1]);
            H_ListPage.DragAndDropTheFileToSecondDomain(data.FTP_filename[2]);
            H_ListPage.DragAndDropTheFileToSecondDomain(data.FTP_filename[3]);
            ListPage.clickOkButton();

            //seed list
            SeedListPage.selectSeedListTab();
            SeedListPage.setSeedInterval(1);
            SeedListPage.clickOnBrowseFromFTP();
            ListPage.uploadSeedListFromFTP(data.FTP_PATH_FOR_SEEDLIST, data.FTP_filename_for_Seed[0]);
            //CLICK ON ASSOCIATE LIST
            SeedListPage.clickOnAssociateList();
            // cy.wait(5000);
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
        });

    });




    //5.Deployment(Test-)
    it('Deploying Hetero Campaign-Test-3(Main)', () => {
        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000)
            CampaignPage.clickOnFirstCampaignInTable();
            //Deployment
            H_DeploymentPage.openDeploymentTab();
            // cy.wait(5000)
            H_DeploymentPage.clickonMultiScheduleRadioBtn();
            cy.wait(2000)
            H_DeploymentPage.clickonMultiScheduleRadioBtn();
            H_DeploymentPage.clickOnAddNewSchedule();
            // cy.wait(1000)
            H_DeploymentPage.enterScheduleName('Main');
            H_DeploymentPage.selectListByIndex(22);
            //check fTP
            H_DeploymentPage.selectListByIndex(23);
            //check LTP
            H_DeploymentPage.selectListByIndex(24);
            //uncheck FEED
            H_DeploymentPage.selectListByIndex(30);
            //uncheck SEED
            H_DeploymentPage.selectListByIndex(31);
            //uncheck warmup
            H_DeploymentPage.selectListByIndex(32);
            // cy.wait(1000)
            //now radio btn
            DC_DeploymentPage.clickOnNowRadioBtn();
            cy.wait(1000)
            //schedule status
            DC_DeploymentPage.clickOnScheduleStatusBtn();
            // cy.wait(1000)
            //add and close btn
            H_DeploymentPage.clickOnAddAndCloseBtn();
            cy.wait(1000)
            //select schedule
            H_DeploymentPage.selectListByIndex(1);
            cy.wait(1000)
            H_DeploymentPage.multiScDeployClick();
            cy.wait(3000);
            H_DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            H_DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000);
            H_DeploymentPage.clickOnScheduleAlertConfirmBtn();
            cy.wait(1000);
            H_DeploymentPage.goToReports();
            H_DeploymentPage.clickOnGetReport();
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);

        });

    });




    it('Deploying Hetero Campaign-Test-4(Ftp_RealTime)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000)
            CampaignPage.clickOnFirstCampaignInTable();
            // cy.wait(5000)
            //Deployment
            H_DeploymentPage.openDeploymentTab();
            H_DeploymentPage.clickOnAddNewSchedule();
            // cy.wait(1000)
            H_DeploymentPage.enterScheduleName('FTP_RealTime');
            H_DeploymentPage.selectListByIndex(22);
            // cy.wait(1000)
            H_DeploymentPage.selectListByIndex(26);
            //uncheck warmup and other 2
            H_DeploymentPage.selectListByIndex(31);
            H_DeploymentPage.selectListByIndex(32);
            H_DeploymentPage.clickOnMultiScheRadioBtnOf(4);
            cy.wait(1000)
            //handle Isp dropdown
            H_DeploymentPage.clickonMultiSchetroRealTimeDropDown();
            H_DeploymentPage.hetro_selectMultiRealtime("gmail.com");
            H_DeploymentPage.selectListByIndex(35);
            H_DeploymentPage.clickOnResponderTypeDropDown();
            H_DeploymentPage.selectResponderTypeInDropDown();
            H_DeploymentPage.enterTextIntoRealtimeTextBox(6, "random");
            H_DeploymentPage.enterTextIntoRealtimeTextBox(7, "1");
            //now radio btn
            H_DeploymentPage.clickOnMultiScheRadioBtnOf(5);
            // cy.wait(2000)
            //schedule status
            H_DeploymentPage.clickOnMultiScheRadioBtnOf(8);
            // cy.wait(2000)
            //add and close btn
            H_DeploymentPage.clickOnAddAndCloseBtn();
            cy.wait(1000)
            //select schedule
            H_DeploymentPage.selectListByIndex(1);
            // cy.wait(2000)
            H_DeploymentPage.multiScDeployClick();
            cy.wait(3000);
            H_DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            H_DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000);
            H_DeploymentPage.clickOnScheduleAlertConfirmBtn();
            cy.wait(1000);
            H_DeploymentPage.goToReports();
            H_DeploymentPage.clickOnGetReport();
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);


        });

    });


   

});

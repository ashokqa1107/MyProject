import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved, checkStatusAndRefresh } from '../support/common_prop';
import Login from "../PageObjects/LoginPage.js";
import CampaignPage from '../PageObjects/standard_campaign/Sc_CampaignPage.js';
import CreativePage from '../PageObjects/standard_campaign/Sc_CreativePage.js';
import SendTestPage from '../PageObjects/standard_campaign/Sc_SendTestPage.js';
import ListPage from '../PageObjects/standard_campaign/Sc_ListPage.js';
import SeedListPage from '../PageObjects/standard_campaign/Sc_SeedListPage.js';
import DeploymentPage from '../PageObjects/standard_campaign/Sc_DeploymentPage.js';

//Deploy StandardCampaign MultiSchedule

describe('Deploy_StandardCampaign_MultiSchedule', () => {
    let campaignName = 'standard_MS-111';
    before(() => {
        // cy.generateRandom3DigitString().then((randomString) => {
        //     campaignName = 'Standard_MS_' + randomString;
        //     cy.log('Campaign Name: ' + campaignName);
        // });
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
            cy.wait(3000)
            ln.setUserName(data.username);
            ln.setPassword(data.password);
            cy.contains(' Log In ').click();
            //cy.wait(3000)
            cy.url().should('contain', 'campaign/campaignlist');
            cy.log('user successfully login into GreenMailer');
            cy.wait(3000);
            // handle campaign errors popups
            CampaignPage.handleCampaignErrors()
            //cy.wait(2000);
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
    it('standard campaign multiSchedule-upto-SendText', () => {

        cy.fixture("standard_campaign").then((data) => {
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.entercampaignName(campaignName);
            //cy.wait(2000)
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative(5);
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName(4);
            CampaignPage.saveCampaign();
            CampaignPage.handleAlert();
            //content creation page
            CreativePage.openCreativeTab();
            CreativePage.openSourceEditor();
            CreativePage.enterTextIntoEditor('testing');
            CreativePage.saveContent();
            CreativePage.handleContentSavedPopup();
            // Send Test Process
            SendTestPage.openSendTestTab();
            //cy.wait(1000);
            SendTestPage.selectManualOption();
            //cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            //cy.wait(1000);
            SendTestPage.clickSendTestButton();
            //cy.wait(7000);
            SendTestPage.closeSendTestPopup();
            //cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();

        });
    });

    //2.upto Lists
    it('standardCampaign Upto Lists', () => {

        cy.fixture("standard_campaign").then((data) => {

            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000)
            CampaignPage.clickOnFirstCampaignInTable();
            //cy.wait(5000)
            //ListPage
            ListPage.clickListTab();
            //select the file through FTP
            ListPage.clickFTPButton();
            ListPage.enterFolderPath(data.FTP_PATH);
            ListPage.selectFolder(data.FTP_filename[0]);
            ListPage.selectFolder(data.FTP_filename[1]);
            ListPage.selectFolder(data.FTP_filename[2]);
            ListPage.selectFolder(data.FTP_filename[3]);
            ListPage.clickOkButton();

            //Giving List through LPT and Feed Responder
            cy.wait(3000)
            ListPage.addLPTList("Till Date");
            ListPage.addFeedResponderList(2);
            //Giving 2 Warmups
            ListPage.selectWarmupCheckbox();
            ListPage.uploadFromFTP(data.FTP_PATH_FOR_WORMUPLIST, data.FTP_filename_wormup[0], data.FTP_filename_wormup[1]);
            ListPage.setWarmupIntervals(data.wormup_intervals[0], 1);
            //seed list
            SeedListPage.selectSeedListTab();
            SeedListPage.setSeedInterval(1);
            SeedListPage.clickOnBrowseFromFTP();
            ListPage.uploadSeedListFromFTP(data.FTP_PATH_FOR_SEEDLIST, data.FTP_filename_for_Seed[0]);
            //CLICK ON ASSOCIATE LIST
            SeedListPage.clickOnAssociateList();
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
        })

    });



    //4.Deployment (Test-1)
    it('Deploying Standard Campaign-Test1(2warmups)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //Deployment
            DeploymentPage.openDeploymentTab();
            //cy.wait(2000)
            DeploymentPage.clickOnMultiScheduleRadioBtn();
            cy.wait(2000);
            DeploymentPage.clickOnMultiScheduleRadioBtn();
            DeploymentPage.clickOnAddNewSchedule();
            //cy.wait(2000)
            DeploymentPage.enterScheduleName('2_WarmUps');
            //cy.wait(2000)
            DeploymentPage.clickOnMultiScWormupRadioBtn();
            //cy.wait(2000)
            DeploymentPage.clickOnMultiScheRadioBtnOf(5);
            //cy.wait(2000)
            DeploymentPage.clickOnMultiScheRadioBtnOf(8);
            //cy.wait(2000)
            DeploymentPage.clickOnAddAndCloseBtn();
            //cy.wait(2000)
            DeploymentPage.selectListByIndex(1);
            //cy.wait(2000)
            DeploymentPage.multiScDeployClick();
            cy.wait(1000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.clickOnScheduleAlertConfirmBtn();
            DeploymentPage.goToReports();
            DeploymentPage.selectWormupInListTypeDropDown();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            //cy.wait(1000);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);

        })


    })


    //5.Deployment(Test-2)
    it('Deploying Standard Campaign-Test-3(Main)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //Deployment
            DeploymentPage.openDeploymentTab();
            // cy.wait(5000)
            // DeploymentPage.clickOnMultiScheduleRadioBtn();
            cy.wait(2000)
            DeploymentPage.clickOnAddNewSchedule();
            // cy.wait(3000)
            DeploymentPage.enterScheduleName('Main');
            DeploymentPage.selectListByIndex(19);
            //check fTP
            DeploymentPage.selectListByIndex(21);
            //check LTP
            DeploymentPage.selectListByIndex(24);
            //uncheck FEED
            DeploymentPage.selectListByIndex(25);
            //uncheck SEED
            DeploymentPage.selectListByIndex(26);
            //uncheck warmup
            DeploymentPage.selectListByIndex(27);
            DeploymentPage.selectListByIndex(28);
            // cy.wait(3000)
            //now radio btn
            DeploymentPage.clickOnNowRadioBtn();
            //cy.wait(3000)
            //schedule status
            DeploymentPage.clickOnScheduleStatusBtn();
            //cy.wait(3000)
            //add and close btn
            DeploymentPage.clickOnAddAndCloseBtn();
            //cy.wait(3000)
            //select schedule
            DeploymentPage.selectListByIndex(1);
            //cy.wait(3000)
            DeploymentPage.multiScDeployClick();
            cy.wait(4000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.clickOnScheduleAlertConfirmBtn();
            // cy.wait(3000);
            DeploymentPage.goToReports();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);

        })

    })


      //3.Deployment (Test-5)
      it('Deploying Standard Campaign-Test1(FTP_warmup_seed)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000)
            CampaignPage.clickOnFirstCampaignInTable();
            // cy.wait(5000)
            //Deployment
            DeploymentPage.openDeploymentTab();
            // cy.wait(3000)
            // DeploymentPage.clickOnMultiScheduleRadioBtn();
            cy.wait(2000)
            DeploymentPage.clickOnAddNewSchedule();
            // cy.wait(3000)
            DeploymentPage.enterScheduleName('FTP_WarmUp_SEED');
            DeploymentPage.selectListByIndex(19);
            DeploymentPage.selectListByIndex(20);
            DeploymentPage.selectListByIndex(28);
            //clickon now RadioBtn
            DeploymentPage.clickOnNowRadioBtn();
            // cy.wait(3000)
            //click on schedulestatus btn
            DeploymentPage.clickOnScheduleStatusBtn();
            DeploymentPage.clickOnAddAndCloseBtn();
            cy.wait(2000)
            DeploymentPage.selectListByIndex(1);
            // cy.wait(3000)
            DeploymentPage.multiScDeployClick();
            cy.wait(4000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(3000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(3000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(3000)
            DeploymentPage.confirmDeployAlert();
            // cy.wait(3000);
            DeploymentPage.goToReports();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 3);
            DeploymentPage.selectWormupInListTypeDropDown();
            // cy.wait(1000);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 3);

        })

    })

    //6. Test-4
    it('Deploying Standard Campaign-Test-4(Ftp_RealTime)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000)
            CampaignPage.clickOnFirstCampaignInTable();
            // cy.wait(5000)
            //Deployment
            DeploymentPage.openDeploymentTab();
            // cy.wait(3000)
            // DeploymentPage.clickOnMultiScheduleRadioBtn();
            cy.wait(2000)
            DeploymentPage.clickOnAddNewSchedule();
            // cy.wait(3000)
            DeploymentPage.enterScheduleName('FTP_RealTime');
            DeploymentPage.selectListByIndex(19);
            DeploymentPage.selectListByIndex(22);
            //uncheck SEED
            DeploymentPage.selectListByIndex(26);
            // cy.wait(3000)
            //uncheck warmup
            DeploymentPage.selectListByIndex(27);
            DeploymentPage.selectListByIndex(28);
            //click on realtime
            DeploymentPage.clickOnMultiScheRadioBtnOf(5);
            //handle Isp dropdown
            DeploymentPage.clickOnDayIspDropDown();
            DeploymentPage.clickOnSearchForIsp("gmail.com");
            DeploymentPage.selectListByIndex(31);
            DeploymentPage.clickOnResponderTypeDropDown();
            DeploymentPage.selectResponderTypeInDropDown();
            DeploymentPage.enterTextIntoRealtimeTextBox(6, "random");
            DeploymentPage.enterTextIntoRealtimeTextBox(7, "1");
            //clickon now RadioBtn
            DeploymentPage.clickOnNowRadioBtn();
            // cy.wait(3000)
            //click on schedulestatus btn
            DeploymentPage.clickOnScheduleStatusBtn();
            // cy.wait(2000)
            //add and close btn
            DeploymentPage.clickOnAddAndCloseBtn();
            cy.wait(2000)
            //select schedule
            DeploymentPage.selectListByIndex(1);
            cy.wait(1000)
            //click on deploy
            DeploymentPage.multiScDeployClick();
            cy.wait(4000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.handleMsUnexpectedAlertWindows();
            cy.wait(2000)
            DeploymentPage.clickOnScheduleAlertConfirmBtn();
            cy.wait(3000);
            DeploymentPage.goToReports();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 4);


        })

    })


   


   
})

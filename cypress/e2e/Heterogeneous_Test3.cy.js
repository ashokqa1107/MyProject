import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved, checkStatusAndRefresh } from '../support/common_prop.js';
import Login from "../PageObjects/LoginPage.js";
import CampaignPage from '../PageObjects/standard_campaign/Sc_CampaignPage.js';
import CreativePage from '../PageObjects/standard_campaign/Sc_CreativePage.js';
import SendTestPage from '../PageObjects/standard_campaign/Sc_SendTestPage.js';
import ListPage from '../PageObjects/standard_campaign/Sc_ListPage.js';
import SeedListPage from '../PageObjects/standard_campaign/Sc_SeedListPage.js';
import DeploymentPage from '../PageObjects/standard_campaign/Sc_DeploymentPage.js';
import H_CampaignPage from '../PageObjects/Hetero_Pages/H_CampaignPage.js';
import H_CreativePage from '../PageObjects/Hetero_Pages/H_CreativePage.js';
import H_SendTextPage from '../PageObjects/Hetero_Pages/H_SendTextPage.js';
import H_ListPage from '../PageObjects/Hetero_Pages/H_ListPage.js';
import H_DeploymentPage from '../PageObjects/Hetero_Pages/H_DeploymentPage.js';

//CPM-RLTP-TESTS
describe('Hetero_campaign_RLTP_SingleSchedule_Specs', () => {
    
    let campaignName = 'Hetero_CPM_0977';
    before(() => {
        // cy.generateRandom3DigitString().then((randomString) => {
        //     campaignName = 'Hetero_SC_CPM_' + randomString;
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
            //cy.wait(1000)
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
    it('Hetero_campaign_RLTP-upto-SendTest', () => {

        cy.fixture("standard_campaign_cpm").then((data) => {
            //Campaign Page
            cy.get("i[title='Create Heterogeneous Campaign']").click({ force: true });
            CampaignPage.clickOnCpmRadioBtn();
            CampaignPage.entercampaignName(campaignName);
            //cy.wait(2000)
            H_CampaignPage.selectOffer('35156');
            H_CampaignPage.selectCreative('1');
            H_CampaignPage.selectSubjectLine('1');
            H_CampaignPage.selectDisplayName('1');
            H_CampaignPage.selectDomains("technologyinfohub.com_test - NetInternet2 - ZXDEV (Shared)");
            H_CampaignPage.selectDomains("bestmoneyfunds.com_18 - DEVPMTA - ZXDEV (Shared)");
            H_CampaignPage.selectAffiliate('0');
            H_CampaignPage.selectAffiliate('1');

            CampaignPage.saveCampaign();
            CampaignPage.handleAlert();
            //cy.wait(3000)
            //content creation page
            CreativePage.openCreativeTab();
            CreativePage.openSourceEditor();
            H_CreativePage.enterTextIntoEditor('Hetro_testing');
            CreativePage.saveContent();
            CreativePage.handleContentSavedPopup();
            // Send Test Process
            SendTestPage.openSendTestTab();
            //cy.wait(1000);
            SendTestPage.selectManualOption();
            //cy.wait(1000);
            H_SendTextPage.enterEmail('gimandi@zetaglobal.com');
            //cy.wait(1000);
            SendTestPage.clickSendTestButton();
            // cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            //cy.wait(1000);
            // Wait and check status
            H_SendTextPage.checkStatuses(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            H_SendTextPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            // cy.wait(3000);
            SendTestPage.confirmApproveCampaignPopup();

        });
    });

    //2.upto Lists
    it('Hetero_campaign_RLTP Upto Lists', () => {

        cy.fixture("standard_campaign").then((data) => {

            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //cy.wait(5000)
            //ListPage
            ListPage.clickListTab();

            //Giving List through LPT and Feed Responder
            cy.wait(2000)
            H_ListPage.addLPTList("Till Date");
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

            //Giving 2 Warmups
            H_ListPage.selectWarmupCheckbox();
            H_ListPage.clickFirstWormupFTPButton();
            H_ListPage.enterFolderPath(data.FTP_PATH);
            H_ListPage.DragAndDropTheFile(data.FTP_filename[0]);
            H_ListPage.DragAndDropTheFileToSecondDomain(data.FTP_filename[1]);
            ListPage.clickOkButton();
            H_ListPage.setWarmupIntervals(data.wormup_intervals[0], 1);

            //seed list
            SeedListPage.selectSeedListTab();
            SeedListPage.setSeedInterval(1);
            SeedListPage.clickOnBrowseFromFTP();
            ListPage.uploadSeedListFromFTP(data.FTP_PATH_FOR_SEEDLIST, data.FTP_filename_for_Seed[0]);
            //CLICK ON ASSOCIATE LIST
            SeedListPage.clickOnAssociateList();
            //cy.wait(3000)
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
        })

    });

    it('1.Deploying Heterogeneous Campaign with (2warmups)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000)
            CampaignPage.clickOnFirstCampaignInTable();
            //cy.wait(5000)
            //Deployment
            H_DeploymentPage.openDeploymentTab();
            //cy.wait(3000)
            H_DeploymentPage.enterScheduleName('WarmUp');
            //cy.wait(3000)
            H_DeploymentPage.clickOnWormupRadioBtn();
            //cy.wait(3000)
            H_DeploymentPage.clickDeploy();
            cy.wait(3000);
            H_DeploymentPage.handleUnexpectAlertWindows();
            //cy.wait(3000)
            cy.wait(2000);
            H_DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000)
            H_DeploymentPage.confirmDeployAlert();
            H_DeploymentPage.goToReports();
            H_DeploymentPage.selectWormupInListTypeDropDown();
            H_DeploymentPage.clickOnGetReport();
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            //cy.wait(1000);
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);


        });

    });


    //5.Deployment(Test-2)
    it('2.Deploying Heterogeneous Campaign with (FTP_LPT_FR)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000)
            CampaignPage.clickOnFirstCampaignInTable();
            //Deployment
            H_DeploymentPage.openDeploymentTab();
            //cy.wait(5000)
            H_DeploymentPage.enterScheduleName('main');
            H_DeploymentPage.selectListByIndex(0);
            H_DeploymentPage.selectListByIndex(1);
            H_DeploymentPage.selectListByIndex(2);
            // H_DeploymentPage.selectListByIndex(3);
            H_DeploymentPage.selectListByIndex(8);
            //unselect seed and warmup
            H_DeploymentPage.selectListByIndex(9);
            H_DeploymentPage.selectListByIndex(10);
            H_DeploymentPage.selectListByIndex(11);
            //cy.wait(3000);
            H_DeploymentPage.clickDeploy();
            cy.wait(2000)
            H_DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            H_DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            H_DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            H_DeploymentPage.confirmDeployAlert();
            H_DeploymentPage.goToReports();
            //cy.wait(2000);
            H_DeploymentPage.clickOnGetReport();
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);
            // H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 3);


        });

    });


    //3.Deployment (Test-3)
    it('3.Deploying Heterogeneous Campaign with (FTP_LPT_FR_warmup)', () => {
        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000)
            CampaignPage.clickOnFirstCampaignInTable();
            //cy.wait(5000)
            //Deployment
            H_DeploymentPage.openDeploymentTab();
            //cy.wait(3000)
            H_DeploymentPage.enterScheduleName('Main_warmup');
            H_DeploymentPage.selectListByIndex(0);
            H_DeploymentPage.selectListByIndex(3);
            H_DeploymentPage.selectListByIndex(5);
            H_DeploymentPage.selectListByIndex(6);
            //include warmup
            H_DeploymentPage.selectListByIndex(9);
            H_DeploymentPage.selectListByIndex(11);
            //cy.wait(3000);
            H_DeploymentPage.clickDeploy();
            cy.wait(2000)
            H_DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            H_DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            H_DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            H_DeploymentPage.confirmDeployAlert();
            //cy.wait(3000);
            H_DeploymentPage.goToReports();
            H_DeploymentPage.clickOnGetReport();
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);
            H_DeploymentPage.selectWormupInListTypeDropDown();
            H_DeploymentPage.clickOnGetReport();
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            H_DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);
        });

    });



})
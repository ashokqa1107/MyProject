import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved, checkStatusAndRefresh } from '../support/common_prop.js';
import Login from "../PageObjects/LoginPage.js";
import CampaignPage from '../PageObjects/standard_campaign/Sc_CampaignPage.js';
import CreativePage from '../PageObjects/standard_campaign/Sc_CreativePage.js';
import SendTestPage from '../PageObjects/standard_campaign/Sc_SendTestPage.js';
import ListPage from '../PageObjects/standard_campaign/Sc_ListPage.js';
import SeedListPage from '../PageObjects/standard_campaign/Sc_SeedListPage.js';
import DeploymentPage from '../PageObjects/standard_campaign/Sc_DeploymentPage.js';

//CPM-RLTP-TESTS
describe('Deploy_Standard_campaign_RLTP_SingleSchedule', () => {
    let campaignName = 'sc_cpm_001'
    before(() => {
        // cy.generateRandom3DigitString().then((randomString) => {
        //     campaignName = 'Standard_SC_CPM_' + randomString;
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
    it('standard_campaign_RLTP-upto-SendText', () => {

        cy.fixture("standard_campaign_cpm").then((data) => {
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            cy.wait(5000);
            CampaignPage.clickOnCpmRadioBtn();
            CampaignPage.entercampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative(1);
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName(1);
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
            // cy.wait(1000);
            SendTestPage.selectManualOption();
            // cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            // cy.wait(1000);
            SendTestPage.clickSendTestButton();
            // cy.wait(7000);
            SendTestPage.closeSendTestPopup();
            // cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            // cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();

        });
    });

    //2.upto Lists
    it('standard_campaign_RLTP Upto Lists', () => {

        cy.fixture("standard_campaign").then((data) => {

            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            // cy.wait(5000)
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
            ListPage.addLPTList("Last 90 Days");
            //Add RLTP
            ListPage.clickOnRLTPBtn();
            ListPage.clickOnRLTPRequestDropdown();
            ListPage.selectRequestFromDropdown();
            ListPage.clickOnTillDateDropDownFromRLTP();
            ListPage.clickOnSaveRLTP();

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

    //3.Deployment (Test-1)
    it('Deploying Standard Campaign-Test1(2warmups)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            // cy.wait(5000)
            //Deployment
            DeploymentPage.openDeploymentTab();
            // cy.wait(3000);
            DeploymentPage.enterScheduleName('2WarmUps');
            // cy.wait(3000);
            DeploymentPage.clickOnWormupRadioBtn();
            // cy.wait(3000)
            DeploymentPage.clickDeploy();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            // cy.wait(3000)
            DeploymentPage.confirmDeployAlert();
            DeploymentPage.goToReports();
            // cy.wait(5000);
            DeploymentPage.selectWormupInListTypeDropDown();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            // cy.wait(1000);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);

        })

    })

    //Test-2
    it('Deploying Standard Campaign-Test-2(Main)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //Deployment
            DeploymentPage.openDeploymentTab();
            // cy.wait(5000)
            DeploymentPage.enterScheduleName('Main');
            // cy.wait(3000)
            DeploymentPage.selectListByIndex(0);
            // cy.wait(3000)
            //select FTP
            DeploymentPage.selectListByIndex(1);
            // cy.wait(3000)
            //select LPT
            DeploymentPage.selectListByIndex(5);
            // cy.wait(3000)
            //select Feed
            DeploymentPage.selectListByIndex(6);
            //cy.wait(3000)
            //unselect seed and warmup
            DeploymentPage.selectListByIndex(7);
            DeploymentPage.selectListByIndex(8);
            //cy.wait(3000)
            DeploymentPage.selectListByIndex(9);
            DeploymentPage.clickDeploy();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            DeploymentPage.confirmDeployAlert();
            // cy.wait(1000);
            DeploymentPage.goToReports();
            // cy.wait(2000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);

        })

    })


    //Cpm_main_warmup_seed(Test-3)
    it('Deploying Standard Campaign-Test-3(Main_warmup_seed)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //List page set Till Date LPT
            ListPage.clickListTab();
            // cy.wait(3000)
            ListPage.changeLPTList("Till Date");
            SeedListPage.clickOnAssociateList();
            CampaignPage.handleCampaignErrors();
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            // cy.wait(5000)
            DeploymentPage.enterScheduleName('Main_warmup_seed');
            // cy.wait(3000)
            DeploymentPage.selectListByIndex(0);
            // cy.wait(3000)
            //select FTP
            DeploymentPage.selectListByIndex(2);
            // cy.wait(3000)
            //select LPT
            DeploymentPage.selectListByIndex(5);
            // cy.wait(3000)
            //select Feed
            DeploymentPage.selectListByIndex(6);
            // cy.wait(3000)
            //unselect group supression
            DeploymentPage.selectListByIndex(9);
            DeploymentPage.clickDeploy();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            DeploymentPage.confirmDeployAlert();
            // cy.wait(5000);
            DeploymentPage.goToReports();
            // cy.wait(2000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 3);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 4);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 5);
            DeploymentPage.selectWormupInListTypeDropDown();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);
            cy.wait(1000);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 3);

        })

    })

})
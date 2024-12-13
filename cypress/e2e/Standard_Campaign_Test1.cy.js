import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved, checkStatusAndRefresh } from '../support/common_prop';
import Login from "../PageObjects/LoginPage.js";
import CampaignPage from '../PageObjects/standard_campaign/Sc_CampaignPage.js';
import CreativePage from '../PageObjects/standard_campaign/Sc_CreativePage.js';
import SendTestPage from '../PageObjects/standard_campaign/Sc_SendTestPage.js';
import ListPage from '../PageObjects/standard_campaign/Sc_ListPage.js';
import SeedListPage from '../PageObjects/standard_campaign/Sc_SeedListPage.js';
import DeploymentPage from '../PageObjects/standard_campaign/Sc_DeploymentPage.js';


describe('Deploy_Standard_campaign', () => {

    let campaignName = 'Standard_SC_015';
    before(() => {
        // cy.generateRandom3DigitString().then((randomString) => {
        //     campaignName = 'Standard_SC' + randomString;
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
            //cy.wait(5000)
            cy.url().should('contain', 'campaign/campaignlist');
            cy.log('user successfully login into GreenMailer');
            cy.wait(2000)
            // handle campaign errors popups
            CampaignPage.handleCampaignErrors()
            //select the usergroup
            selectUsergroup(data.groupName);
            //cy.wait(1000)
        })
    })

    afterEach(function () {
        const status = this.currentTest.state === 'passed' ? 'Passed' : 'Failed';
        console.log(`Test "${this.currentTest.title}" is ${status}`); // Print if the test passed or failed
        cy.log(`Test "${this.currentTest.title}" is ${status}`);
    });

    after(() => {
        cy.log(`Test file ${Cypress.spec.name} has completed.`); // Print that the current cy.js test is completed
    });

    //1.upto SendText
    it('standard campaign-upto-SendText', () => {

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
            cy.wait(2000);
            SendTestPage.closeSendTestPopup();
            //cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            SendTestPage.assertApproveTestPopUp();
            //cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();

        });
    });

    //2.upto Lists
    it('standardCampaign Upto Lists', () => {

        cy.fixture("standard_campaign").then((data) => {

            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
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
            ListPage.addLPTList("Last 120 Days");
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
    it('1.Deploying Standard Campaign- with (2warmups)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //cy.wait(5000)
            //Deployment
            DeploymentPage.openDeploymentTab();
            //cy.wait(3000)
            DeploymentPage.enterScheduleName('WarmUp');
            //cy.wait(3000)
            DeploymentPage.clickOnWormupRadioBtn();
            //cy.wait(3000)
            DeploymentPage.clickDeploy();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            //cy.wait(3000)
            DeploymentPage.confirmDeployAlert();
            //cy.wait(5000);
            DeploymentPage.goToReports();
            DeploymentPage.selectWormupInListTypeDropDown();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            //cy.wait(1000);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);


        })

    })


    //5.Deployment(Test-2)
    it('2.Deploying Standard Campaign with (FTP_LPT_FR)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //Deployment
            DeploymentPage.openDeploymentTab();
            //cy.wait(5000)
            DeploymentPage.enterScheduleName('main');
            DeploymentPage.selectListByIndex(0);
            DeploymentPage.selectListByIndex(1);
            //select LPT
            DeploymentPage.selectListByIndex(5);
            //select Feed
            DeploymentPage.selectListByIndex(6);
            //unselect seed and warmup
            DeploymentPage.selectListByIndex(7);
            DeploymentPage.selectListByIndex(8);
            DeploymentPage.selectListByIndex(9);
            //cy.wait(3000);
            DeploymentPage.clickDeploy();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            DeploymentPage.confirmDeployAlert();
            DeploymentPage.goToReports();
            //cy.wait(2000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 0);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 1);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);


        })

    })

    //3.Deployment (Test-3)
    it.skip('3.Deploying Standard Campaign with (FTP_wormup_seed)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //cy.wait(5000)
            //Deployment
            DeploymentPage.openDeploymentTab();
            //cy.wait(3000)
            DeploymentPage.enterScheduleName('FTP_WormUp_SEED');
            DeploymentPage.selectListByIndex(0);
            DeploymentPage.selectListByIndex(2);
            DeploymentPage.selectListByIndex(9);
            //cy.wait(3000)
            DeploymentPage.clickDeploy();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(1000);
            DeploymentPage.handleUnexpectAlertWindows();
            DeploymentPage.confirmDeployAlert();
            //cy.wait(3000);
            DeploymentPage.goToReports();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 3);
            DeploymentPage.selectWormupInListTypeDropDown();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 2);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 3);

        })

    })

    //6. Test-4
    it('4.Deploying Standard Campaign- with (Ftp_RealTime)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('FTP_REALTIME');
            DeploymentPage.selectListByIndex(0);
            DeploymentPage.selectListByIndex(2);
            //uncheck seed and warmup
            DeploymentPage.selectListByIndex(7);
            DeploymentPage.selectListByIndex(8);
            DeploymentPage.selectListByIndex(9);
            DeploymentPage.clickOnRealTimeRadioBtn();
            //cy.wait(3000)
            DeploymentPage.clickDeploy();
            cy.wait(4000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.confirmDeployAlert();
            DeploymentPage.goToReports();
            //cy.wait(2000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 3);

        })

    })

    //8. RealTime_OnDay(Test-5)
    it('5.Deploying Standard Campaign with (FTP_RealTime_OnDay)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //cy.wait(5000)
            //Deployment
            DeploymentPage.openDeploymentTab();
            //cy.wait(3000)
            DeploymentPage.enterScheduleName('FTP_RealTime_OnDay');
            //cy.wait(3000)
            DeploymentPage.selectListByIndex(0);
            DeploymentPage.selectListByIndex(3);
            //uncheck seed and warmup
            DeploymentPage.selectListByIndex(7);
            DeploymentPage.selectListByIndex(8);
            DeploymentPage.selectListByIndex(9);

            //cy.wait(3000);
            DeploymentPage.clickOnRealTimeRadioBtn();
            //cy.wait(3000);
            //click on onday checkbox
            DeploymentPage.selectListByIndex(10);
            //set onday
            DeploymentPage.clickOnDayIspDropDown();
            DeploymentPage.clickOnSearchForIsp("gmail.com")
            //cy.wait(2000)
            //select on gmail.com checkbox
            DeploymentPage.selectListByIndex(12);
            DeploymentPage.clickOnResponderTypeDropDown();
            DeploymentPage.selectResponderTypeInDropDown();
            DeploymentPage.enterTextIntoDayQuataSC('10');
            DeploymentPage.clickDeploy();
            cy.wait(4000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.confirmDeployAlert();
            //cy.wait(3000);
            DeploymentPage.goToReports();
            //cy.wait(10000);
            //DeploymentPage.selectWarmupInListTypeDropDown();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 4);

        })

    })

    //7.Deployment (Test-6)
    it('6.Deploying Standard Campaign-Test1(Main_warmup)', () => {

        cy.fixture("standard_campaign").then((data) => {
            CampaignPage.searchCampaignName(campaignName);
            cy.wait(2000);
            CampaignPage.clickOnFirstCampaignInTable();
            //cy.wait(3000)
            //List page set Till Date LPT
            ListPage.clickListTab();
            //cy.wait(3000)
            ListPage.changeLPTList("Till Date");
            SeedListPage.clickOnAssociateList();
            CampaignPage.handleCampaignErrors();
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            //cy.wait(3000)
            DeploymentPage.enterScheduleName('Main_WarmUp');
            //cy.wait(3000)
            DeploymentPage.selectListByIndex(0);
            DeploymentPage.selectListByIndex(4);
            DeploymentPage.selectListByIndex(5);
            DeploymentPage.selectListByIndex(6);
            DeploymentPage.selectListByIndex(9);
            // DeploymentPage.clickOnWormupRadioBtn();
            //cy.wait(3000)
            DeploymentPage.clickDeploy();
            cy.wait(4000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.handleUnexpectAlertWindows();
            cy.wait(2000);
            DeploymentPage.confirmDeployAlert();
            //cy.wait(3000);
            DeploymentPage.goToReports();
            //cy.wait(10000);
            //DeploymentPage.selectWarmupInListTypeDropDown();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 5);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 6);
            DeploymentPage.checkMultipleDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1], 7);

        });

    })

  



})
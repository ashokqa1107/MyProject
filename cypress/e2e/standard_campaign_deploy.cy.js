import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved, checkStatusAndRefresh } from '../support/common_prop';
import Login from "../PageObjects/LoginPage.js";
import CampaignPage from '../PageObjects/standard_campaign/Sc_CampaignPage.js';
import CreativePage from '../PageObjects/standard_campaign/Sc_CreativePage.js';
import SendTestPage from '../PageObjects/standard_campaign/Sc_SendTestPage.js';
import ListPage from '../PageObjects/standard_campaign/Sc_ListPage.js';
import SeedListPage from '../PageObjects/standard_campaign/Sc_SeedListPage.js';
import DeploymentPage from '../PageObjects/standard_campaign/Sc_DeploymentPage.js';


describe('Deploy_Standard_campaign', () => {

    beforeEach(() => {
        cy.log("*****   Launching Green Mailer  ******");
        cy.fixture("standard_campaign").then((data) => {
            //Login
            const ln = new Login();
            cy.visit(data.url);
            cy.url()
            ln.setUserName(data.username);
            ln.setPassword(data.password);
            cy.contains(' Log In ').click();
            cy.wait(10000)

            //handle campaign errors popups
            try {
               CampaignPage.handleCampaignErrors()
              } catch (error) {
                console.error("there is no campaign errors", error.message);
              }          
                    
            //select the usergroup
            selectUsergroup(data.groupName);
            cy.wait(1000)
        })
    })

    //1) standard Campaging with all types of lists
    it.skip('Deploying standard campaign', () => {

        cy.fixture("standard_campaign").then((data) => {
    
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative();
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName();
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
            cy.wait(1000);
            SendTestPage.selectManualOption();
            cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            cy.wait(1000);
            SendTestPage.clickSendTestButton();
            cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();
            //ListPage
            ListPage.clickListTab();
            //select the file through FTP
            ListPage.clickFTPButton();
            ListPage.enterFolderPath(data.FTP_PATH);
            ListPage.selectFolder(data.FTP_filename[0]);
            ListPage.clickOkButton();
            //Giving List through LPT and Feed Responder
            ListPage.addLPTList();
            ListPage.addFeedResponderList(2);
            //Giving List through Wormups
            ListPage.selectWarmupCheckbox();
            ListPage.uploadFromFTP(data.FTP_PATH_FOR_WORMUPLIST, data.FTP_filename_wormup[1]);
            ListPage.setWarmupIntervals(data.wormup_intervals[0], 1);
            //seed list
            SeedListPage.selectSeedListTab();
            SeedListPage.setSeedInterval(1);
            SeedListPage.selectManualOption();
            SeedListPage.enterEmailAddresses('ashok.qa1107@gmail.com');
            //CLICK ON ASSOCIATE LIST
            SeedListPage.clickOnAssociateList();
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('sample');
            DeploymentPage.selectLists();
            DeploymentPage.clickDeploy();
            DeploymentPage.confirmDeployAlert();
            cy.wait(10000);
            DeploymentPage.goToReports();
            cy.wait(20000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1]);
        })
    
    });
    //standard campagin with FTP LPT FEED
    it.skip('Deploying standard campaign with FTP LPT AND FEED', () => {

        cy.fixture("standard_campaign").then((data) => {
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative();
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName();
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
            cy.wait(1000);
            SendTestPage.selectManualOption();
            cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            cy.wait(1000);
            SendTestPage.clickSendTestButton();
            cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();
            //ListPage
            ListPage.clickListTab();
            //select the file through FTP
            ListPage.clickFTPButton();
            ListPage.enterFolderPath(data.FTP_PATH);
            ListPage.selectFolder(data.FTP_filename[0]);
            ListPage.clickOkButton();
            //Giving List through LPT and Feed Responder
            ListPage.addLPTList();
            ListPage.addFeedResponderList(2);
            //click on associate list
            SeedListPage.clickOnAssociateList();
            //Associate List
            SeedListPage.handleFeedAlert();
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('3_typesOfLists');
            //DeploymentPage.selectLists();
            DeploymentPage.clickDeploy();
            DeploymentPage.handleFeedAlerts();
            DeploymentPage.confirmDeployAlert();
            DeploymentPage.handleFeedAlerts();
            DeploymentPage.confirmDeployAlert();
            DeploymentPage.handleFeedAlerts();
            DeploymentPage.handleFeedAlerts();
            cy.wait(10000);
            DeploymentPage.goToReports();
            cy.wait(20000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1]);
        })
    
    });

    //2) standard campagin with 2 FTP Lists
    it.skip('Deploying standard campaign with two FTP LISTS', () => {

        cy.fixture("standard_campaign").then((data) => {
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative();
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName();
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
            cy.wait(1000);
            SendTestPage.selectManualOption();
            cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            cy.wait(1000);
            SendTestPage.clickSendTestButton();
            cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();
            //ListPage
            ListPage.clickListTab();
            //select the file through FTP
            ListPage.clickFTPButton();
            ListPage.enterFolderPath(data.FTP_PATH);
            ListPage.selectFolder(data.FTP_filename[0]);
            ListPage.selectFolder(data.FTP_filename[1]);
            ListPage.clickOkButton();
            //CLICK ON ASSOCIATE LIST BUTTON
            SeedListPage.clickOnAssociateList();
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('FTP_LIST DEPLOY');
            DeploymentPage.clickDeploy();
            DeploymentPage.confirmDeployAlert();
            cy.wait(10000);
            DeploymentPage.goToReports();
            cy.wait(20000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1]);
        })
    
    });


    //3) deploy standard_campaign with only wormup_list
    it.skip('Deploying standard campaign with only wormup list', () => {

        cy.fixture("standard_campaign").then((data) => {
    
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative();
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName();
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
            cy.wait(1000);
            SendTestPage.selectManualOption();
            cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            cy.wait(1000);
            SendTestPage.clickSendTestButton();
            cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();
            //ListPage
            ListPage.clickListTab();
            //wormupList
            ListPage.selectWarmupCheckbox();
            ListPage.uploadFromFTP(data.FTP_PATH_FOR_WORMUPLIST, data.FTP_filename_wormup[0]);
            ListPage.setWarmupIntervals(data.wormup_intervals[0], data.wormup_intervals[0]);
            //Associate List
            SeedListPage.clickOnAssociateList();
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('Wormup_deploy');
            DeploymentPage.clickOnWormupRadioBtn();
            DeploymentPage.clickDeploy();
            DeploymentPage.confirmDeployAlert();
            cy.wait(10000);
            //Deployment Status
            DeploymentPage.goToReports();
            cy.wait(20000);
            DeploymentPage.selectWormupInListTypeDropDown();
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1]);
   
        })
    
    });

    //4) deploy with FTP AND seed list
    it.skip('Deploying standard campaign with FTP AND Seedlist', () => {

        cy.fixture("standard_campaign").then((data) => {
    
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative();
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName();
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
            cy.wait(1000);
            SendTestPage.selectManualOption();
            cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            cy.wait(1000);
            SendTestPage.clickSendTestButton();
            cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();
            //ListPage
            ListPage.clickListTab();
            //select the file through FTP
            ListPage.clickFTPButton();
            ListPage.enterFolderPath(data.FTP_PATH);
            ListPage.selectFolder(data.FTP_filename[0]);
            ListPage.clickOkButton();
            //seed list
            SeedListPage.selectSeedListTab();
            SeedListPage.setSeedInterval(1);
            SeedListPage.clickOnBrowseFromFTP();
            ListPage.uploadSeedListFromFTP(data.FTP_PATH_FOR_SEEDLIST, data.FTP_filename_for_Seed[0])
            //CLICK ON ASSOCIATE LIST
            SeedListPage.clickOnAssociateList();
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('seedListSchedule');
            DeploymentPage.clickOnSeedListCheckBox();            
            DeploymentPage.clickDeploy();
            DeploymentPage.confirmDeployAlert();
            cy.wait(10000);
            DeploymentPage.goToReports();
            cy.wait(20000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1]);
        })
    
    });

    //5) deploy standard campaign with LPT WITH SEED
    it.skip('Deploying standard campaign', () => {

        cy.fixture("standard_campaign").then((data) => {
    
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative();
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName();
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
            cy.wait(1000);
            SendTestPage.selectManualOption();
            cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            cy.wait(1000);
            SendTestPage.clickSendTestButton();
            cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();
            //CLICK ListPage
            ListPage.clickListTab();
            //Giving List through LPT 
            ListPage.addLPTList();
            //seed list
            SeedListPage.selectSeedListTab();
            SeedListPage.setSeedInterval(1);
            SeedListPage.clickOnBrowseFromFTP();
            ListPage.uploadSeedListFromFTP(data.FTP_PATH_FOR_SEEDLIST, data.FTP_filename_for_Seed[0])
            //CLICK ON ASSOCIATE LIST
            SeedListPage.clickOnAssociateList();
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('LPT_WITH_SEED');
            DeploymentPage.clickOnSeedListCheckBox();            
            DeploymentPage.clickDeploy();
            DeploymentPage.confirmDeployAlert();
            cy.wait(10000);
            DeploymentPage.goToReports();
            cy.wait(20000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1]);
        })

    });

    //6.deploy standard campaign with two FTP and one wormup
    it.skip('Deploying standard campaign with two FTP LISTS with 1 wormup List', () => {
        cy.fixture("standard_campaign").then((data) => {
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative();
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName();
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
            cy.wait(1000);
            SendTestPage.selectManualOption();
            cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            cy.wait(1000);
            SendTestPage.clickSendTestButton();
            cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();
            //ListPage
            ListPage.clickListTab();
            //select the file through FTP
            ListPage.clickFTPButton();
            ListPage.enterFolderPath(data.FTP_PATH);
            ListPage.selectFolder(data.FTP_filename[0]);
            ListPage.selectFolder(data.FTP_filename[1]);
            ListPage.clickOkButton();
            //wormupList
            ListPage.selectWarmupCheckbox();
            ListPage.uploadFromFTP(data.FTP_PATH_FOR_WORMUPLIST, data.FTP_filename_wormup[0]);
            ListPage.setWarmupIntervals(data.wormup_intervals[0], data.wormup_intervals[0]);
            //CLICK ON ASSOCIATE LIST BUTTON
            SeedListPage.clickOnAssociateList();
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('FTP_WORMUP_LIST DEPLOY');
            //DeploymentPage.clickOnWormupCheckBox();
            DeploymentPage.clickDeploy();
            DeploymentPage.confirmDeployAlert();
            cy.wait(10000);
            DeploymentPage.goToReports();
            cy.wait(20000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1]);
        })
    
    });


    //7.deploy standard campaign with two FTP and one LTP
    it('Deploying standard campaign with two FTP One LTP', () => {
        cy.fixture("standard_campaign").then((data) => {
            //Campaign Page
            CampaignPage.clickCreateStandardCampaign();
            CampaignPage.selectDomain(data.Domain_Name);
            CampaignPage.selectOffer(data.offer_No);
            CampaignPage.selectAffiliate();
            CampaignPage.selectCreative();
            CampaignPage.selectSubjectLine();
            CampaignPage.selectDisplayName();
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
            cy.wait(1000);
            SendTestPage.selectManualOption();
            cy.wait(1000);
            SendTestPage.enterEmail('gimandi@zetaglobal.com');
            cy.wait(1000);
            SendTestPage.clickSendTestButton();
            cy.wait(3000);
            SendTestPage.closeSendTestPopup();
            cy.wait(1000);
            // Wait and check status
            SendTestPage.checkStatus(data.WaitTime_RefreshTime[0], data.WaitTime_RefreshTime[1]);
            SendTestPage.verifyStatusCompleted();
            // Approve the campaign
            SendTestPage.approveCampaign();
            cy.wait(4000);
            SendTestPage.confirmApproveCampaignPopup();
            //ListPage
            ListPage.clickListTab();
            //select the file through FTP
            ListPage.clickFTPButton();
            ListPage.enterFolderPath(data.FTP_PATH);
            ListPage.selectFolder(data.FTP_filename[0]);
            ListPage.selectFolder(data.FTP_filename[1]);
            ListPage.clickOkButton();
            //Giving List through LPT 
            ListPage.addLPTList();            
            //CLICK ON ASSOCIATE LIST BUTTON
            SeedListPage.clickOnAssociateList();
            //Associate List
            SeedListPage.clickOnAssociateAlerts();
            //Deployment
            DeploymentPage.openDeploymentTab();
            DeploymentPage.enterScheduleName('two_FTP_1LTP');
            //DeploymentPage.clickOnWormupCheckBox();
            DeploymentPage.clickDeploy();
            DeploymentPage.confirmDeployAlert();
            cy.wait(10000);
            DeploymentPage.goToReports();
            cy.wait(20000);
            DeploymentPage.clickOnGetReport();
            DeploymentPage.checkDeploymentStatus(data.Deployment_wtime_Rtime[0], data.Deployment_wtime_Rtime[1]);
        })
    
    });








    

});




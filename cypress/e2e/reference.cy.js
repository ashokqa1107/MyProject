 //1
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
        SeedListPage.associateList();
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
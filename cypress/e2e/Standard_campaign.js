import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved } from '../support/common_prop';
const toolLog = function () {
    login();
    selectUsergroup('automationgroup');
    cy.task('getData').then(url => {
        cy.visit(url);
        console.log(url);
    });
};

describe('createStandard', () => {

    it('Login', () => {

        login();
        cy.wait(3000);
    });
    it('select user group', () => {
        login();
        cy.wait(2000);
        selectUsergroup('automationgroup');
    });

    it('create Standard Campaign (Basic Details)', () => {
        login();
        selectUsergroup('automationgroup');
        cy.wait(3000);
        // icon click

        cy.get('.fa-cube').then($ele => {
            cy.wrap($ele.eq(0)).click({ force: true });
        });
        console.log(`current url is :: ${cy.url().value}`);
        console.log(`url is obtained`);

        // Basic Details
        cy.contains('News Letter').click();

        // Domain Selection
        cy.get('input[aria-autocomplete="list"]').first().type('info.improve');
        cy.get('.mat-option-text').first().click();


        //offer selection
        cy.get('input[aria-autocomplete="list"]').then($element => {
            cy.wrap($element.eq(1)).type('818181');
        });
        cy.get('.mat-option-text').first().click();

        //subject line display name
        cy.get('#otherSubjectLineRef-id').click().type('test subject');
        cy.get('#otherDisplayName-id').click().type('test displayname');

        //save n close
        cy.save();

        cy.url().then((url) => cy.task('saveData', url));
    });
    it('Create Standard Campaign (creative tab)', () => {
        toolLog();
        //creative tab
        cy.contains(' Creative').click({ force: true });
        cy.contains('Source Editor ').click();
        cy.get('textarea').type('testing');
        //save n close
        cy.save();
        cy.url().then((url) => cy.task('saveData', url));
    });

    it('Send Test using manual', () => {
        toolLog();
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.contains('Manual').click();
        cy.get('textarea').type('gimandi@zetaglobal.com');
        sendtest();
    });

    it('Sent Test using FTP', () => {
        toolLog();
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('.mat-radio-label-content').contains('FTP').click();
        cy.get('button').contains('Browse From FTP ').click();
        cy.wait(2000);
        cy.get('#mat-input-32').click().clear().type('10.100.6.107');
        cy.contains(' gimandi-10.100.6.107 ').click();
        cy.get('input[placeholder="Enter Folder Path"]').type('/nfshome/gimandi/august');
        cy.get('i[title="Go To Folder"]').click();
        cy.get('input[placeholder="Enter File Name"]').type('1mail.txt');
        cy.get('li[title="1mail.txt"]').click();
        cy.contains('Ok').click();
        sendtest();

    });

    it('Send Test using File', () => {
        toolLog();
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('#mat-radio-17 > .mat-radio-label > .mat-radio-label-content').click();
        const fileName = '../fixtures/TestFiles/sendtest.csv';
        cy.contains(' Browse ').click();
        cy.get('input[id="seedFileUploder"]').attachFile(fileName);
        cy.wait(2000);
        cy.contains(' Upload ').click();
        cy.wait(2000);
        cy.close();
        sendtest();
    });

    it('Send Test using Domain Test List', () => {
        toolLog();
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('label[class="mat-radio-label"]').contains('Domain Test Lists').click();
        cy.wait(1000);
        cy.contains('Select Test List').click({ force: true });
        cy.get('div[role="listbox"]').contains(' 1mail.txt ').click();
        cy.wait(2000);
        sendtest();
    });

    it('Send Test using Group Test List', () => {
        toolLog();
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('label[class="mat-radio-label"]').contains('Group Test Lists').click();
        cy.wait(1000);
        cy.get('mat-select[role="combobox"]').click();
        cy.get('div[role="listbox"]').contains(' 2mail.txt ').click();
        cy.wait(2000);
        sendtest();
    });

    it('Approve Campaign', () => {
        toolLog();
        cy.wait(3000);
        cy.contains('Send Test').click();
        checkStatusAndApprove(10, 's');
    });

    it('Check if campaign is approved', () => {
        cy.wait(3000);
        isapproved();
    })

})
'use strict';

import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved } from '../support/common_prop';

describe('MVT test suite', () => {
    beforeEach(() => {
        login();
        selectUsergroup('automationgroup');
    });

    it('MVT Basic Page', () => {
        cy.get('img[title="Create Multivariate Campaign"]').click({force: true});
        cy.contains(' News Letter ').click();
        cy.get('.cl-2 label:nth-child(1) mat-form-field div').contains(' *').click({force:true});
        cy.get('.cdk-overlay-pane div mat-option:nth-child(1)').click();
        cy.get('.cl-2 label:nth-child(2) mat-form-field div').contains('Offer').click({force:true});
        cy.get('.cdk-overlay-pane div mat-option:nth-child(1)').click();
        cy.contains('Add New CFS').click();
        cy.wait(500);
        cy.contains('Add New CFS').click();
        
        for (let i = 1; i<3; i++){
            // select creative
            cy.get(`.cl-4 table tr:nth-child(${i+1}) td:nth-child(3) span select`).select(1);
            
            // subject line
            cy.get(`.cl-4 table tr:nth-child(${i+1}) td:nth-child(4) span`).click();
            cy.get(`.mat-focus-indicator.ng-star-inserted > .w-full`).click();
            cy.get(`.cl-4 table tr:nth-child(${i+1}) td:nth-child(4) span input`).type(`my subject ${i}`);

            // display name
            cy.get(`.cl-4 table tr:nth-child(${i+1}) td:nth-child(5) span`).click();
            cy.get(`.mat-focus-indicator.ng-star-inserted > .w-full`).click();
            cy.get(`.cl-4 table tr:nth-child(${i+1}) td:nth-child(5) span input`).type(`my display ${i}`);
        };

        cy.save();
        cy.url().then(url => cy.task('saveData', url));
    })
   it('MVT creative Fill', () => {
        cy.task('getData').then(url => cy.visit(url));
        cy.get('.tab-bar-custom').contains('Creative').click();
        for (let i = 1; i<3; i++){
            cy.contains('CFS').click({force: true});
            cy.get(`div[role="listbox"] mat-option[role="option"]:nth-child(${i})`).click();
            cy.UploadCreative(`../fixtures/htmlDocs/MVT_${i}.html`);
            cy.contains('Save Creative').click();
            cy.wait(1000);
            cy.close();
        }
        cy.save();
        cy.url().then(url => cy.task('saveData', url));
   });

   it('Send test Manual', () => {
        cy.task('getData').then(ul =>cy.visit(ul));
        cy.get('.tab-bar-custom').contains('Send Test').click();
        cy.contains('Manual').click();
        cy.get('#mat-input-25').clear().type('wisdomtr@yahoo.com');
        sendtest(); 
   });

   it('send test using Domain test list', () => {
        cy.task('getData').then(url => cy.visit(url));
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('label[class="mat-radio-label"]').contains('Domain Test Lists').click();
        cy.wait(1000);
        cy.contains('Select Test List').click({force: true});
        cy.get('div[role="listbox"] mat-option[role="option"]:nth-child(1) ').click();
        cy.wait(2000);
        sendtest();
   });

   it('send test using Group test list', () => {
        cy.task('getData').then(url => cy.visit(url));
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('label[class="mat-radio-label"]').contains('Group Test Lists').click();
        cy.wait(1000);
        cy.get('mat-select[role="combobox"]').click();
        cy.get('div[role="listbox"] mat-option[role="option"]:nth-child(1)').click();
        cy.wait(2000);
        sendtest();
   });

    it('Send Test using File', () => {
        cy.task('getData').then(ul =>cy.visit(ul));
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.wait(1000);
        cy.get('mat-radio-group mat-radio-button:nth-child(2)').contains('File').click({force: true}); 
        const fileName = '../fixtures/TestFiles/sendtest.csv';
        cy.contains(' Browse ').click();
        cy.get('input[id="seedFileUploder"]').attachFile(fileName);
        cy.wait(2000);
        cy.contains(' Upload ').click();
        cy.wait(2000);
        cy.close();
        sendtest();
    });

    it('Sent Test using FTP', () => {
        cy.task('getData').then(ul =>cy.visit(ul));
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('.mat-radio-label-content').contains('FTP').click();
        cy.get('button').contains('Browse From FTP ').click();
        cy.wait(2000);
        cy.get('input[role="combobox"]').clear().type('107');
        cy.get('.cdk-overlay-pane div[role="listbox"] mat-option[role="option"]:nth-child(1)').click();
        cy.get('input[placeholder="Enter Folder Path"]').type('/nfshome/gimandi/august');
        cy.get('i[title="Go To Folder"]').click();
        cy.get('input[placeholder="Enter File Name"]').type('1mail.txt');
        cy.get('li[title="1mail.txt"]').click();
        cy.contains('Ok').click();
        sendtest();
    });

    it('Approve MVT Campaign', () => {
        cy.task('getData').then(ul => cy.visit(ul));
        cy.get('.tab-bar-custom').contains('Send Test').click();
        checkStatusAndApprove(10,'m');
    });

    it('Check if campaign is approved', () => {
        cy.task('getData').then(url => cy.visit(url));
        cy.wait(3000);
        isapproved();
      });
});
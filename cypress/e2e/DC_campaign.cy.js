'use strict';

import { login, selectUsergroup, checkStatusAndApprove, sendtest, isapproved } from '../support/common_prop';

describe('DC Campaign Test Suite', () => {
    beforeEach(() => {
        login();
        selectUsergroup();
    })

    it('DC Campaign create(Basic details)', () => {
        cy.get('i[title="Create Dynamic Content Campaign"]').click({force: true});
        cy.get('input[role="combobox"]').eq(0).type('40');
        cy.get('div[role="listbox"] mat-option[role="option"]:nth-child(1)').click();
        cy.get('#mat-input-4').click();
        cy.get('div[role="listbox"] mat-option[role="option"]:nth-child(1)').click();
        cy.get('input[role="combobox"]').eq(2).type('info.improveurgreatbusine');
        cy.get('.mat-option-text').click();
        cy.wait(1000);
        cy.get('input[role="combobox"]').eq(2).type('contact.');
        cy.get('.mat-option-text').click();
        cy.save();
        cy.url().then(url => cy.task('saveData', url));
    });

    it('send test using Manual', () => {
        cy.task('getData').then(ul =>cy.visit(ul));
        cy.get('.tab-bar-custom').contains('Send Test').click();
        cy.contains('Manual').click();
        cy.get('#mat-input-7').clear().type('wisdomtr@yahoo.com');
        sendtest();
    });

    it('Send Test using Domain Test List', () => {
        cy.task('getData').then(ul =>cy.visit(ul));
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('label[class="mat-radio-label"]').contains('Domain Test Lists').click();
        cy.wait(1000);
        for(let i = 1; i<3; i++){
        cy.get(`.sendtest-tag-container div table tr:nth-child(${i+1}) td:nth-child(3) span select`).select(1);
        } 
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


    it('Send Test using File', () => {
        cy.task('getData').then(ul =>cy.visit(ul));
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.wait(1000);
        cy.get('mat-radio-group mat-radio-button:nth-child(2)').contains('File').click({multiple: true, force: true}); 
        const fileName = '../fixtures/TestFiles/sendtest.csv';
        cy.contains(' Browse ').click();
        cy.get('input[id="seedFileUploder"]').attachFile(fileName);
        cy.wait(2000);
        cy.contains(' Upload ').click();
        cy.wait(2000);
        cy.close();
        sendtest();
      });


      it('Send Test using Group Test List', () => {
        cy.task('getData').then(url => cy.visit(url));
        cy.wait(3000);
        cy.contains('Send Test').click();
        cy.get('label[class="mat-radio-label"]').contains('Group Test Lists').click();
        cy.wait(1000);
        cy.get('mat-select[role="combobox"]').eq(0).click();
        cy.get('div[role="listbox"]').contains(' 2mail.txt ').click();
        cy.wait(2000);
        sendtest();
      });

    it('Approve DC Campaign', () => {
        cy.task('getData').then(ul => cy.visit(ul));
        cy.get('.tab-bar-custom').contains('Send Test').click();
        checkStatusAndApprove(10,'h');
    });

    it('Check if campaign is approved', () => {
        cy.task('getData').then(url => cy.visit(url));
        cy.wait(3000);
        isapproved();
      });
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress-xpath" />

const mysql = require('mysql2');

import 'cypress-file-upload';
Cypress.Commands.add('close', function () {
	cy.get('button > span').then($element => {
		const ele = $element.toArray().find(e => e.innerText.startsWith('Close'));
		if (ele){
			cy.wrap(ele).click();
			console.log('success');
		}
	});
})

Cypress.Commands.add('save', function () {
	cy.contains('Save').click()
	cy.wait(4000)
	cy.close();
})


Cypress.Commands.add('UploadCreative', function (filename) {
	cy.contains('Upload Manual File').click();
    cy.get('input[id="creativeFileUploder"]').attachFile(filename);
    cy.contains('Done').click();
})

Cypress.Commands.add('handleUnExpectedAlerts', (unExpectedAlertCssSelector) => {
	cy.get(unExpectedAlertCssSelector).then((alert) => {
		if (alert.length > 0) {
		  cy.wrap(alert).find('button.okButton').click();
		  cy.log('Modal appeared and was handled');
		} else {
		 //cy.get('div#modalSelector').should('not.exist'); // Assert the modal is absent
		  cy.log('No modal appeared');
		}
	  });
  });


  Cypress.Commands.add('handleCampaignErrors', (selector) => {
	// Use Cypress.$ to query DOM without causing an error
	const elements = Cypress.$(selector);
  
	if (elements.length > 0) {
	  cy.get(selector).each(($el) => {
		// Click each element, forcing if necessary
		cy.wrap($el).click({ force: true });
	  });
	} else {
	  // Log a message if no elements are found
	  cy.log(`No elements found for selector: ${selector}`);
	}
  });


  Cypress.Commands.add('clickIfExists', (selector) => {
	const element = Cypress.$(selector); // Query the DOM directly
	if (element.length > 1) {
	  cy.get(selector).eq(0).trigger('mouseover').click({force:true}); // Use Cypress command for clicking
	} else {
	  cy.log(`Element with selector '${selector}' not found. Skipping click.`);
	}
  });

  Cypress.Commands.add('mSclickIfExists', (selector) => {
	const element = Cypress.$(selector); // Query the DOM directly
	if (element.length > 0) {
	  cy.get(selector).eq(1).trigger('mouseover').click({force:true}); // Use Cypress command for clicking
	} else {
	  cy.log(`Element with selector '${selector}' not found. Skipping click.`);
	}
  });

  Cypress.Commands.add('generateRandom3DigitString', () => {
	const randomNumber = Math.floor(100 + Math.random() * 900); // Generate 3-digit random number
	return randomNumber.toString(); // Return the number as a string
  });



  Cypress.Commands.add('queryDatabase', (query) => {
	cy.task('queryDatabase', query)
	  .then((results) => {
		// Handle the results here if needed
		console.log(results);
	  });
  });

 
  
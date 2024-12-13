import { group } from "console";
import { stat } from "fs";

export function login() {
    const { username, Password } = Cypress.env('currentuser');
    cy.visit('/') // change URL to match your dev URL
	  // get user name & Password
	  cy.get('#mat-input-0').click().type(username)
	  cy.get('#mat-input-1').click().type(Password)
	  cy.contains(' Log In ').click()
}

export function selectUsergroup(groupname= 'automationgroup') {
    cy.get('#groupDropDown').click({force:true});
	cy.get('[placeholder="Search Group"]').type(groupname);
	cy.contains(` ${groupname.replace(groupname[0], groupname[0].toUpperCase())} `).click();
    //cy.wait(2000);
};

function approve() {
    console.log(`send test is in completed state`);
                cy.get('button').contains('Approve').click();
                cy.wait(3000).then(() => {
                    cy.close();
                });
}

function waiting(retries, type='s') {
                cy.wait(5000).then(() => {
                    checkStatusAndApprove(retries,type);
                });
}

export  async function checkStatusAndApprove(retries = 10, type='s') {
    if (retries === 0) {
        return false;
    }
    
    cy.contains('Refresh').click();
    if (type === 's'){
        cy.get('tbody tr td').eq(3).invoke('text').then((status) => {
            if (status.toLowerCase() === 'completed') {
                approve();
            } else {
                console.log(`current send test status :: ${status}`);
                waiting(retries - 1, type);
            }
        });
    }
    else if ( type === 'h' || type === 'm'){
      let collectStatusTexts = async () => {
        let stat = []; 
        for (let i = 0; i < 2; i++) {
          let id_status = type === 'h' ? `.send-test-result-table-container tbody[role="rowgroup"] tr:nth-child(2) td div div table tbody tr:nth-child(${i + 1}) td:nth-child(4) .ng-star-inserted` : `.send-test-result-table-container table tbody[role="rowgroup"] tr:nth-child(2) td div div table tbody tr:nth-child(${i + 1}) td:nth-child(3) .ng-star-inserted`;
          let promise = cy.get(id_status)
            .invoke('text')
          stat.push(promise)
        }
        return await Promise.all(stat);
      };
      
  let stat = await collectStatusTexts();
  
  console.log('statuses are ::',stat);
  if (await stat.length >= 2 && await stat[0].toLowerCase() === await stat[1].toLowerCase() && stat[0].trim().toLowerCase() === 'completed') {
        console.log('campaign to be approved');
          approve();
          return false;
        } 
  else {
          console.log(`current send test status :: ${stat}`);
          cy.wait(5000);
          checkStatusAndApprove(retries-1, type);
        }
  }
};


export function sendtest(type='s') {
 
    cy.get('button').contains('Send Test').click();
	cy.wait(3000);
	cy.close();
}

export function isapproved() {
  cy.get('.campaign_staus_div').invoke('text').then(camp_status => {
    const status = camp_status.split(':')[1].trim().toLowerCase();
    if (status === 'approved'){
        return 'yes';
        }
    return 'no';
    }).should('equal','yes');
}

export const MODULES = [
    {
        name: 'Dashboard',
        modules: ['PMTA Dashboard','Domain Dashboard','PMTA Actions','Domain Actions','Delete Recipients','Schedule Actions','Audit','Auto VMTA Actions','Notifications','Config Errors','Gmail Postmaster Report','Gmail Postmaster Schedules']
    },
    {
        name: 'Log Monitoring',
        modules: ['Log Report','Email Report','Export Bounces']
    },
    {
        name: 'Campaigns',
        modules: ['Campaign List','Active Campaigns','Campaign Errors','Cake Offers','Deployment Categories']
    },
    {
        name: 'Content',
        modules: ['Templates', 'Verticals', 'Offers']
    },
    {
        name: 'Reports',
        modules: ['Advanced Reports','ZetaMail Reports','ZetaMail Campaigns','Delta Unsub Trends','CPM Responders','ESP Reports','Schedule Reports','Dynamic Content Reports']
    },
    {
        name: 'List',
        modules: ['Test Lists','Suppression Lists','Offer Suppression Lists','Profile Import','Profile Export']
    },
    {
        name: 'Data Ops',
        modules: ['Requests','Suppression Filters','Datasets','Data Streams']
    },
    {
        name: 'Responders',
        modules: ['Feed Responders','Feed Responders Report','Campaign Process Report']
    },
    {
        name: 'Warmups',
        modules:['Segments','Profiles','Segment Reports','Segment Detailed Report','Segment Schedule','Vendors','File Stats','Pending Status']
    },
    {
        name: 'Offer Management',
        modules: ['CPA Offers']
    },
    {
        name: 'Admin',
        modules: ['PMTA List','Domain List','User Groups','Domain Categories','FTP','RC Servers','Send Grid','External DataSource','Amazon SES Accounts','Affiliates','ISP List','Error Keywords','RP Servers','Newsletter Offers','Release Activity','Forward/Reply','Gmail Postmaster','DBAs']
    },
    {
        name: 'RT Apptness',
        modules: ['Feed List','FollowUp Mapping','Feed Mapping','Feed Report']
    },
    {
        name: 'RT First Party',
        modules: ['Live Feed','Data Partners','Channels','Feed List','Feed Mapping','Feed Report']
    }
    ];


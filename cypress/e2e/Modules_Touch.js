import { MODULES,login } from "../support/common_prop";


MODULES.forEach( (ele,index) => {
    describe(ele.name, () => {
        ele.modules.forEach( (mod,idx) => {
            it(mod, async () => {
                login();
                cy.wait(3000);
                cy.get(`nav.sidebar-nav > ul > li:nth-child(${index+1})`).contains(ele.name).click({ multiple: true, force:true });
                cy.wait(1000);
                await cy.get(`nav.sidebar-nav > ul > li:nth-child(${index+1}) > ul > li:nth-child(${idx + 1})`).contains(mod).click({ multiple: true,force: true });
                cy.wait(3000);
            })
        })
    })
})
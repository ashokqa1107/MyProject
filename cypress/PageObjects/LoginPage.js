class Login {
    txtUserName = "#mat-input-0";
    txtPassword = "#mat-input-1";
    //txtlogin=" Log In "

    setUserName(username) {
        
        cy.get(this.txtUserName).type(username, {force:true});
        
    }

    setPassword(password) {
        cy.get(this.txtPassword).type(password);
    }

    clickOnLogin() {
        cy.contains(this.txtlogin).click();
    }

}

export default Login;
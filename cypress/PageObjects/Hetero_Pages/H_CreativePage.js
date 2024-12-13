class H_CreativePage{

//elements
textArea = 'textarea';




//methods

enterTextIntoEditor(text) {
    cy.get(this.textArea).eq(1).type(text);
   }




}

export default new H_CreativePage();
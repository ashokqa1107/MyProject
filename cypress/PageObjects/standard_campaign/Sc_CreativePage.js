class CreativePage {
  // Selectors
  creativeTab = "Creative"; // Used with `cy.contains`
  sourceEditorButton = "Source Editor "; // Used with `cy.contains`
  textArea = 'textarea';
  saveContentButton = 'span.mat-button-wrapper';
  contentSavedPopupButton = ".mat-focus-indicator[type='button']";

  // Actions
  openCreativeTab() {
    cy.contains(this.creativeTab).click({ force: true });
  }

  openSourceEditor() {
    cy.contains(this.sourceEditorButton).click();
  }

  enterTextIntoEditor(text) {
    cy.get(this.textArea).type(text);
  }

  saveContent() {
    cy.get(this.saveContentButton).then(($element) => {
      cy.wrap($element.eq(1)).click();
    });
  }

  handleContentSavedPopup() {
    cy.get(this.contentSavedPopupButton).trigger('mouseover').click({ force: true });

  }
}

export default new CreativePage();
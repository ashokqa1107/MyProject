describe('Database Tests', () => {
    it('Runs update queries', () => {
      const query1 = "UPDATE APT_CUSTOM_RLTP_V2_REQUEST_DETAILS SET PROCESSED_DATE=NOW() WHERE id=1000164";
      const query2 = "UPDATE APT_CUSTOM_RLTP_V2_REQUEST_DETAILS SET PROCESSED_DATE=NOW() WHERE id=1000166";
  
      // Execute the first query
      cy.task('queryDb', query1).then((result1) => {
        cy.log(JSON.stringify(result1, null, 2));
  
        // Execute the second query
        return cy.task('queryDb', query2).then((result2) => {
          cy.log(JSON.stringify(result2, null, 2));
        });
      });
    });
  });
  
  
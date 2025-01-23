describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/')
  })
  it('başarılı formda success sayfası açılıyor', () => {
    cy.get(`input[name="email"]`).type("abcd@email.com.tr");
    cy.get(`input[name="password"]`).type("abcd@email.com.tr");
    cy.get(`input[name="terms"]`).check();
    cy.get(`button`).click();
    cy.contains("Successful login!")
  })

  it("email yanlış girdin diğerleri doğru",()=>{
    cy.get(`input[name="email"]`).type("abcd@email");
    cy.get(`input[name="password"]`).type("abcd@email.com.tr");
    cy.get(`input[name="terms"]`).check();
    cy.get(`[data-cy = "errorEmail"]`).contains("Please enter a valid email address");
    cy.get(`[data-cz = "error"]`).should("have.length",1)
    cy.get(`button`).should("be.disabled");
  })

  it("email ve password yanlış girdin diğerleri doğru",()=>{
    cy.get(`input[name="email"]`).type("abcd@email");
    cy.get(`input[name="password"]`).type("abc");
    cy.get(`input[name="terms"]`).check();
    cy.get(`[data-cy = "errorEmail"]`).contains("Please enter a valid email address");
    cy.get(`[data-cy = "errorPass"]`).contains("Password must be at least 4 characters long");
    cy.get(`[data-cz = "error"]`).should("have.length",2)
    cy.get(`button`).should("be.disabled");
  })

  it("email ve password doğru girdin terms yanlış",()=>{
    cy.get(`input[name="email"]`).type("abcd@email.com.tr");
    cy.get(`input[name="password"]`).type("abcd");
    cy.get(`button`).should("be.disabled");
  })

})
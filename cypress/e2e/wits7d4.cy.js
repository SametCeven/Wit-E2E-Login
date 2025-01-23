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

  it.only("email yanlış girdin",()=>{


  })

})
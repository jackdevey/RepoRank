/// <reference types="cypress" />

describe('Works', () => {
  it('should show home page', () => {
    // Hit up the home page
    cy.visit('http://localhost:3000/')
    // The page should contain an h2 with "🔥 RepoRank"
    cy.get('h2').contains('🔥 RepoRank')
  })
})
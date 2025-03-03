/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('Renderer mode', () => {
  beforeEach(() => {
    cy.visitTestEditor()
  })

  it("should be 'document' without type specified", () => {
    cy.getMarkdownBody().should('exist')
    cy.getReveal().should('not.exist')
  })

  it("should be 'reveal.js' with type 'slide'", () => {
    cy.setCodemirrorContent('---\ntype: slide\n---\n')
    cy.getMarkdownBody().should('not.exist')
    cy.getReveal().should('exist')
  })

  it("should be 'document' with invalid type", () => {
    cy.setCodemirrorContent('---\ntype: EinDokument\n---\n')
    cy.getMarkdownBody().should('exist')
    cy.getReveal().should('not.exist')
  })

  it("should change from 'reveal.js' to 'document' if changed from 'slide' to something else", () => {
    cy.setCodemirrorContent('---\ntype: slide\n---\n')
    cy.getMarkdownBody().should('not.exist')
    cy.getReveal().should('exist')
    cy.setCodemirrorContent('')
    cy.getMarkdownBody().should('exist')
    cy.getReveal().should('not.exist')
  })
})

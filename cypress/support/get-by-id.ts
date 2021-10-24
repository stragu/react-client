/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
declare namespace Cypress {
  interface Chainable {
    getById(id: string): Chainable<Element>
    findById(id: string): Chainable<Element>
  }
}

Cypress.Commands.add('getById', (id: string) => {
  return cy.get(`[data-cypress-id="${id}"]`)
})

Cypress.Commands.add(
  'findById',
  {
    prevSubject: 'element'
  },
  (parent: JQuery<HTMLElement>, id: string) => {
    const targetElements = parent.find(`[data-cypress-id="${id}"]`).get()
    return cy.wrap(targetElements)
  }
)

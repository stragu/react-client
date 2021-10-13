/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('profile page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: '/mock-backend/api/private/tokens',
        method: 'GET'
      },
      {
        body: [
          {
            label: 'cypress-App',
            keyId: 'OE90fHg5Pro',
            createdAt: '2021-10-13T01:21:16.927Z',
            validUntil: '2022-10-13T01:21:16.702Z',
            lastUsed: null
          }
        ]
      }
    )
    cy.intercept(
      {
        url: '/mock-backend/api/private/tokens',
        method: 'POST'
      },
      {
        body: {
          label: 'cypress',
          keyId: 'cypress',
          createdAt: '2021-10-13T01:21:16.927Z',
          validUntil: '2022-10-13T01:21:16.702Z',
          lastUsed: null,
          secret: 'c-y-p-r-e-s-s'
        },
        statusCode: 201
      }
    )
    cy.intercept(
      {
        url: '/mock-backend/api/private/tokens/OE90fHg5Pro',
        method: 'DELETE'
      },
      {
        statusCode: 204
      }
    )
    cy.visit('/profile')
  })

  describe('access tokens', () => {
    it('list existing tokens', () => {
      cy.get('.card.access-tokens .list-group-item .text-start.col').contains('cypress-App')
    })

    it('delete token', () => {
      cy.get('.modal-dialog').should('not.exist')
      cy.get('.card.access-tokens .list-group-item .btn-danger').click()
      cy.get('.modal-dialog').should('be.visible').get('.modal-footer .btn-danger').click()
      cy.get('.modal-dialog').should('not.exist')
    })

    it('add token', () => {
      cy.get('.card.access-tokens .btn-primary').should('be.disabled')
      cy.get('.card.access-tokens input[type=text]').type('cypress')
      cy.get('.modal-dialog').should('not.exist')
      cy.get('.card.access-tokens .btn-primary').should('not.be.disabled').click()
      cy.get('.modal-dialog')
        .should('be.visible')
        .get('.modal-dialog input[readonly]')
        .should('have.value', 'c-y-p-r-e-s-s')
      cy.get('.card.access-tokens .list-group-item .text-start.col').contains('cypress')
    })
  })
})

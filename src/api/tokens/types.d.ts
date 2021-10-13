/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export interface AccessToken {
  createdAt: string
  keyId: string
  lastUsed: string | null
  label: string
  validUntil: string
}

export interface AccessTokenSecret {
  secret: string
}

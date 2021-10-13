/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { AccessToken, AccessTokenSecret } from './types'

export const getAccessTokenList = async (): Promise<AccessToken[]> => {
  const response = await fetch(`${getApiUrl()}tokens`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  return (await response.json()) as AccessToken[]
}

export const postNewAccessToken = async (label: string): Promise<AccessToken & AccessTokenSecret> => {
  const response = await fetch(`${getApiUrl()}tokens`, {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      label,
      validUntil: Date.now() + 365 * 24 * 3600 * 1000
    })
  })
  expectResponseCode(response, 201)
  return (await response.json()) as AccessToken & AccessTokenSecret
}

export const deleteAccessToken = async (keyId: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}tokens/${keyId}`, {
    ...defaultFetchConfig,
    method: 'DELETE'
  })
  expectResponseCode(response, 204)
}

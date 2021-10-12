/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { UserInfo } from '../users/types'
import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { isMockMode } from '../../utils/test-modes'

export const getMe = async (): Promise<UserInfo> => {
  const response = await fetch(getApiUrl() + `me${isMockMode() ? '-get' : ''}`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  return (await response.json()) as UserInfo
}

export const updateDisplayName = async (displayName: string): Promise<void> => {
  const response = await fetch(getApiUrl() + 'me/profile', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      name: displayName
    })
  })

  expectResponseCode(response)
}

export const deleteUser = async (): Promise<void> => {
  const response = await fetch(getApiUrl() + 'me', {
    ...defaultFetchConfig,
    method: 'DELETE'
  })

  expectResponseCode(response)
}

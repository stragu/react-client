/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Cache } from '../../components/common/cache/cache'
import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { UserInfo } from './types'

const cache = new Cache<string, UserInfo>(600)

export const getUserById = async (userid: string): Promise<UserInfo> => {
  if (cache.has(userid)) {
    return cache.get(userid)
  }
  const response = await fetch(`${getApiUrl()}/users/${userid}`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  const userData = (await response.json()) as UserInfo
  cache.put(userid, userData)
  return userData
}

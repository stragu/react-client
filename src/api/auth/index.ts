/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { RegisterError } from '../../components/register-page/register-page'
import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'

export const INTERACTIVE_LOGIN_METHODS = ['local', 'ldap', 'openid']

export const doLocalLogin = async (username: string, password: string): Promise<void> => {
  const response = await fetch(getApiUrl() + 'auth/local/login', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  expectResponseCode(response, 201)
}

export const doLocalLogout = async (): Promise<void> => {
  const response = await fetch(getApiUrl() + 'auth/logout', {
    ...defaultFetchConfig,
    method: 'DELETE'
  })
  expectResponseCode(response)
}

export const doLocalPasswordChange = async (newPassword: string): Promise<void> => {
  const response = await fetch(getApiUrl() + 'auth/local', {
    ...defaultFetchConfig,
    method: 'PUT',
    body: JSON.stringify({
      newPassword
    })
  })

  expectResponseCode(response)
}

export const doLocalRegister = async (username: string, displayName: string, password: string): Promise<void> => {
  const response = await fetch(getApiUrl() + 'auth/local', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
      displayName: displayName
    })
  })

  if (response.status === 409) {
    throw new Error(RegisterError.USERNAME_EXISTING)
  }

  expectResponseCode(response)
}

export const doLdapLogin = async (username: string, password: string): Promise<void> => {
  const response = await fetch(getApiUrl() + 'auth/ldap', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  expectResponseCode(response)
}

export const doOpenIdLogin = async (openId: string): Promise<void> => {
  const response = await fetch(getApiUrl() + 'auth/openid', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      openId: openId
    })
  })

  expectResponseCode(response)
}

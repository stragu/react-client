/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'

export const postAlias = async (noteId: string, alias: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}notes/${noteId}/metadata/alias/${alias}`, {
    ...defaultFetchConfig,
    method: 'POST'
  })
  expectResponseCode(response)
}

export const deleteAlias = async (alias: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}notes/${alias}/metadata/alias`, {
    ...defaultFetchConfig,
    method: 'DELETE'
  })
  expectResponseCode(response)
}

export const putPrimaryAlias = async (alias: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}notes/${alias}/metadata/alias`, {
    ...defaultFetchConfig,
    method: 'PUT'
  })
  expectResponseCode(response)
}

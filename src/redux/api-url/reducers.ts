/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { ApiUrlActions, ApiUrlActionType, ApiUrlObject } from './types'
import type { Reducer } from 'redux'

export const initialState: ApiUrlObject = {
  apiUrl: ''
}

export const ApiUrlReducer: Reducer<ApiUrlObject, ApiUrlActions> = (
  state: ApiUrlObject = initialState,
  action: ApiUrlActions
) => {
  switch (action.type) {
    case ApiUrlActionType.SET_API_URL:
      return action.state
    default:
      return state
  }
}

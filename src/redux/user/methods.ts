/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '..'
import { ClearUserAction, SetUserAction, UserActionType } from './types'
import { UserInfo } from '../../api/users/types'

export const setUser = (state: UserInfo): void => {
  const action: SetUserAction = {
    type: UserActionType.SET_USER,
    state
  }
  store.dispatch(action)
}

export const clearUser = (): void => {
  const action: ClearUserAction = {
    type: UserActionType.CLEAR_USER
  }
  store.dispatch(action)
}

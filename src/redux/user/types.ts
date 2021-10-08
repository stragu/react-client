/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Action } from 'redux'
import { UserInfo } from '../../api/users/types'

export enum UserActionType {
  SET_USER = 'user/set',
  CLEAR_USER = 'user/clear'
}

export type UserActions = SetUserAction | ClearUserAction

export interface SetUserAction extends Action<UserActionType> {
  type: UserActionType.SET_USER
  state: UserInfo
}

export interface ClearUserAction extends Action<UserActionType> {
  type: UserActionType.CLEAR_USER
}

export type OptionalUserState = UserInfo | null

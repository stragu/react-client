/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { combineReducers, createStore, Reducer } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction'
import { ApiUrlReducer } from './api-url/reducers'
import { BannerReducer } from './banner/reducers'
import { ConfigReducer } from './config/reducers'
import { DarkModeConfigReducer } from './dark-mode/reducers'
import { EditorConfigReducer } from './editor/reducers'
import { NoteDetailsReducer } from './note-details/reducers'
import { UserReducer } from './user/reducers'
import { UiNotificationReducer } from './ui-notifications/reducers'
import { HistoryReducer } from './history/reducers'
import { RendererStatusReducer } from './renderer-status/reducers'
import type { Config } from '../api/config/types'
import type { ApiUrlObject } from './api-url/types'
import type { BannerState } from './banner/types'
import type { DarkModeConfig } from './dark-mode/types'
import type { EditorConfig } from './editor/types'
import type { HistoryEntry } from './history/types'
import type { NoteDetails } from './note-details/types'
import type { OptionalUserState } from './user/types'
import type { RendererStatus } from './renderer-status/types'
import type { UiNotificationState } from './ui-notifications/types'

export interface ApplicationState {
  user: OptionalUserState
  config: Config
  banner: BannerState
  history: HistoryEntry[]
  apiUrl: ApiUrlObject
  editorConfig: EditorConfig
  darkMode: DarkModeConfig
  noteDetails: NoteDetails
  uiNotifications: UiNotificationState
  rendererStatus: RendererStatus
}

export const allReducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  user: UserReducer,
  config: ConfigReducer,
  banner: BannerReducer,
  apiUrl: ApiUrlReducer,
  history: HistoryReducer,
  editorConfig: EditorConfigReducer,
  darkMode: DarkModeConfigReducer,
  noteDetails: NoteDetailsReducer,
  uiNotifications: UiNotificationReducer,
  rendererStatus: RendererStatusReducer
})

export const store = createStore(allReducers, devToolsEnhancer({}))

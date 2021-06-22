/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '..'
import { NoteDto } from '../../api/notes/types'
import { NoteFrontmatter } from '../../components/editor-page/note-frontmatter/note-frontmatter'
import { initialState } from './reducers'
import {
  AddAliasAction,
  NoteDetailsActionType,
  RemoveAliasAction,
  SetCheckboxInMarkdownContentAction,
  SetNoteDetailsAction,
  SetNoteDetailsFromServerAction,
  SetNoteFrontmatterFromRenderingAction,
  SetPrimaryAliasAction,
  UpdateNoteTitleByFirstHeadingAction
} from './types'
import { deleteAlias, postAlias, putPrimaryAlias } from '../../api/aliases'

export const setNoteMarkdownContent = (content: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_DOCUMENT_CONTENT,
    content
  } as SetNoteDetailsAction)
}

export const setNoteDataFromServer = (apiResponse: NoteDto): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_NOTE_DATA_FROM_SERVER,
    note: apiResponse
  } as SetNoteDetailsFromServerAction)
}

export const updateNoteTitleByFirstHeading = (firstHeading?: string): void => {
  store.dispatch({
    type: NoteDetailsActionType.UPDATE_NOTE_TITLE_BY_FIRST_HEADING,
    firstHeading: firstHeading
  } as UpdateNoteTitleByFirstHeadingAction)
}

export const setNoteFrontmatter = (frontmatter: NoteFrontmatter | undefined): void => {
  if (!frontmatter) {
    frontmatter = initialState.frontmatter
  }
  store.dispatch({
    type: NoteDetailsActionType.SET_NOTE_FRONTMATTER,
    frontmatter: frontmatter
  } as SetNoteFrontmatterFromRenderingAction)
}

export const setCheckboxInMarkdownContent = (lineInMarkdown: number, checked: boolean): void => {
  store.dispatch({
    type: NoteDetailsActionType.SET_CHECKBOX_IN_MARKDOWN_CONTENT,
    checked: checked,
    lineInMarkdown: lineInMarkdown
  } as SetCheckboxInMarkdownContentAction)
}

export const addNoteAlias = async (alias: string): Promise<void> => {
  if (store.getState().noteDetails.aliases.includes(alias)) {
    return
  }
  await postAlias(store.getState().noteDetails.id, alias)
  store.dispatch({
    type: NoteDetailsActionType.ADD_ALIAS,
    alias: alias
  } as AddAliasAction)
}

export const removeNoteAlias = async (alias: string): Promise<void> => {
  if (!store.getState().noteDetails.aliases.includes(alias)) {
    return
  }
  await deleteAlias(alias)
  store.dispatch({
    type: NoteDetailsActionType.REMOVE_ALIAS,
    alias: alias
  } as RemoveAliasAction)
}

export const makeNoteAliasPrimary = async (alias: string): Promise<void> => {
  if (!store.getState().noteDetails.aliases.includes(alias) || store.getState().noteDetails.primaryAlias === alias) {
    return
  }
  await putPrimaryAlias(alias)
  store.dispatch({
    type: NoteDetailsActionType.SET_PRIMARY_ALIAS,
    alias: alias
  } as SetPrimaryAliasAction)
}

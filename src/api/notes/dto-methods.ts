/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import { initialState } from '../../redux/note-details/reducers'
import type { NoteDto } from './types'
import type { NoteDetails } from '../../redux/note-details/types'

export const noteDtoToNoteDetails = (note: NoteDto): NoteDetails => {
  return {
    markdownContent: note.content,
    frontmatter: initialState.frontmatter,
    id: note.metadata.id,
    noteTitle: initialState.noteTitle,
    createTime: DateTime.fromISO(note.metadata.createTime),
    lastChange: {
      userName: note.metadata.updateUser.userName,
      timestamp: DateTime.fromISO(note.metadata.updateTime)
    },
    firstHeading: initialState.firstHeading,
    viewCount: note.metadata.viewCount,
    alias: note.metadata.alias,
    authorship: note.metadata.editedBy
  }
}

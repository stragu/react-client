/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import equal from 'fast-deep-equal'
import { useEffect, useRef } from 'react'
import { store } from '../../../redux'
import { useParams } from 'react-router-dom'
import type { EditorPagePathParams } from '../editor-page'
import type { HistoryEntry } from '../../../redux/history/types'
import { HistoryEntryOrigin } from '../../../redux/history/types'
import { updateLocalHistoryEntry } from '../../../redux/history/methods'
import { useApplicationState } from '../../../hooks/common/use-application-state'

export const useUpdateLocalHistoryEntry = (updateReady: boolean): void => {
  const { id } = useParams<EditorPagePathParams>()
  const userExists = useApplicationState((state) => !!state.user)
  const currentNoteTitle = useApplicationState((state) => state.noteDetails.noteTitle)
  const currentNoteTags = useApplicationState((state) => state.noteDetails.frontmatter.tags)

  const lastNoteTitle = useRef('')
  const lastNoteTags = useRef<string[]>([])

  useEffect(() => {
    if (!updateReady || userExists) {
      return
    }
    if (currentNoteTitle === lastNoteTitle.current && equal(currentNoteTags, lastNoteTags.current)) {
      return
    }
    const history = store.getState().history
    const entry: HistoryEntry = history.find((entry) => entry.identifier === id) ?? {
      identifier: id,
      title: '',
      pinStatus: false,
      lastVisited: '',
      tags: [],
      origin: HistoryEntryOrigin.LOCAL
    }
    if (entry.origin === HistoryEntryOrigin.REMOTE) {
      return
    }
    entry.title = currentNoteTitle
    entry.tags = currentNoteTags
    entry.lastVisited = new Date().toISOString()
    updateLocalHistoryEntry(id, entry)
    lastNoteTitle.current = currentNoteTitle
    lastNoteTags.current = currentNoteTags
  }, [updateReady, id, userExists, currentNoteTitle, currentNoteTags])
}

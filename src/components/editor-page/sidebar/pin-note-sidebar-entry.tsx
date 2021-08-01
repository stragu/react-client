/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SidebarButton } from './sidebar-button'
import { useParams } from 'react-router-dom'
import { toggleHistoryEntryPinning } from '../../../redux/history/methods'
import { showErrorNotification } from '../../../redux/ui-notifications/methods'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import type { SpecificSidebarEntryProps } from './types'
import type { EditorPagePathParams } from '../editor-page'

export const PinNoteSidebarEntry: React.FC<SpecificSidebarEntryProps> = ({ className, hide }) => {
  const { t } = useTranslation()
  const { id } = useParams<EditorPagePathParams>()
  const history = useApplicationState((state) => state.history)

  const isPinned = useMemo(() => {
    const entry = history.find((entry) => entry.identifier === id)
    if (!entry) {
      return false
    }
    return entry.pinStatus
  }, [id, history])

  const onPinClicked = useCallback(() => {
    toggleHistoryEntryPinning(id).catch(showErrorNotification(t('landing.history.error.updateEntry.text')))
  }, [id, t])

  return (
    <SidebarButton
      icon={'thumb-tack'}
      hide={hide}
      onClick={onPinClicked}
      className={`${className ?? ''} ${isPinned ? 'icon-highlighted' : ''}`}>
      <Trans i18nKey={isPinned ? 'editor.documentBar.pinnedToHistory' : 'editor.documentBar.pinNoteToHistory'} />
    </SidebarButton>
  )
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { makeNoteAliasPrimary, removeNoteAlias } from '../../../../redux/note-details/methods'
import { showErrorNotification } from '../../../../redux/ui-notifications/methods'
import { ShowIf } from '../../../common/show-if/show-if'

export interface AliasListEntryProps {
  alias: string
  isPrimary: boolean
}

export const AliasListEntry: React.FC<AliasListEntryProps> = ({ alias, isPrimary }) => {
  const { t } = useTranslation()

  const onRemoveClick = useCallback(() => {
    removeNoteAlias(alias)
      .catch(showErrorNotification(t('editor.modal.aliases.errorRemovingAlias')))
  }, [])

  const onMakePrimaryClick = useCallback(() => {
    makeNoteAliasPrimary(alias)
      .catch(showErrorNotification(t('editor.modal.aliases.errorMakingPrimary')))
  }, [])

  return (
    <li className={'list-group-item d-flex flex-row justify-content-between align-items-center'}>
      { alias }
      <div>
        <ShowIf condition={isPrimary}>
          <Button
            className={'mr-2 text-warning'}
            variant='light'
            disabled={true}
            title={t('editor.modal.aliases.isPrimary')}>
            <ForkAwesomeIcon icon={'star'} />
          </Button>
        </ShowIf>
        <ShowIf condition={!isPrimary}>
          <Button
            className={'mr-2'}
            variant='light'
            title={t('editor.modal.aliases.makePrimary')}
            onClick={onMakePrimaryClick}>
            <ForkAwesomeIcon icon={'star-o'} />
          </Button>
        </ShowIf>
        <Button
          variant='light'
          className={'text-danger'}
          title={t('editor.modal.aliases.removeAlias')}
          onClick={onRemoveClick}>
          <ForkAwesomeIcon icon={'times'} />
        </Button>
      </div>
    </li>
  )
}

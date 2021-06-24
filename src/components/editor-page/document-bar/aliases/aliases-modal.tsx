/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { ChangeEvent, useCallback, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { CommonModal, CommonModalProps } from '../../../common/modals/common-modal'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { addNoteAlias } from '../../../../redux/note-details/methods'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { ApplicationState } from '../../../../redux'
import { ShowIf } from '../../../common/show-if/show-if'
import { AliasListEntry } from './alias-list-entry'

export const AliasesModal: React.FC<CommonModalProps> = ({ show, onHide }) => {
  const { t } = useTranslation()
  const [newAlias, setNewAlias] = useState('')
  const [newAliasInvalid, setNewAliasInvalid] = useState(false)
  const aliases = useApplicationState((state: ApplicationState) => state.noteDetails.aliases)
  const primaryAlias = useApplicationState((state: ApplicationState) => state.noteDetails.primaryAlias)

  const addAlias = useCallback(() => {
    addNoteAlias(newAlias)
      .then(() => {
        setNewAlias('')
      })
      .catch((error) => {
        console.error(error)
        setNewAliasInvalid(true)
      })
  }, [setNewAliasInvalid, newAlias, setNewAlias])

  const newAliasInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value
      if (!/^[\w-]*$/.test(newValue)) {
        return
      }
      setNewAlias(newValue)
      setNewAliasInvalid(false)
    },
    [setNewAlias, setNewAliasInvalid]
  )

  return (
    <CommonModal
      show={show}
      onHide={onHide}
      closeButton={true}
      data-cy={'aliases-modal'}
      titleI18nKey={'editor.modal.aliases.title'}>
      <Modal.Body>
        <p>
          <Trans i18nKey={'editor.modal.aliases.explanation'} />
        </p>
        <ul className={'list-group'}>
          {aliases.map((alias) => (
            <AliasListEntry alias={alias} isPrimary={alias === primaryAlias} key={alias} />
          ))}
          <li className={'list-group-item'}>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                addAlias()
              }}>
              <InputGroup className={'mr-1 mb-1'} hasValidation={true}>
                <Form.Control
                  value={newAlias}
                  placeholder={t('editor.modal.aliases.addAlias')}
                  onChange={newAliasInputChange}
                  isInvalid={newAliasInvalid}
                  required={true}
                />
                <Button
                  variant='light'
                  className={'text-secondary ml-2'}
                  title={t('editor.modal.aliases.addAlias')}
                  onClick={addAlias}>
                  <ForkAwesomeIcon icon={'plus'} />
                </Button>
              </InputGroup>
              <ShowIf condition={newAliasInvalid}>
                <small className={'text-danger'}>
                  <Trans i18nKey={'editor.modal.aliases.errorAddingAlias'} />
                </small>
              </ShowIf>
            </form>
          </li>
        </ul>
      </Modal.Body>
    </CommonModal>
  )
}

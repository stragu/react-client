/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import React, { ChangeEvent, FormEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { deleteAccessToken, getAccessTokenList, postNewAccessToken } from '../../../api/tokens'
import { AccessToken } from '../../../api/tokens/types'
import { CopyableField } from '../../common/copyable/copyable-field/copyable-field'
import { IconButton } from '../../common/icon-button/icon-button'
import { CommonModal } from '../../common/modals/common-modal'
import { DeletionModal } from '../../common/modals/deletion-modal'
import { ShowIf } from '../../common/show-if/show-if'
import { showErrorNotification } from '../../../redux/ui-notifications/methods'

export const ProfileAccessTokens: React.FC = () => {
  const { t } = useTranslation()

  const [showAddedModal, setShowAddedModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [accessTokens, setAccessTokens] = useState<AccessToken[]>([])
  const [newTokenLabel, setNewTokenLabel] = useState('')
  const [newTokenSecret, setNewTokenSecret] = useState('')
  const [selectedForDeletion, setSelectedForDeletion] = useState('')

  const addToken = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      postNewAccessToken(newTokenLabel)
        .then((token) => {
          setNewTokenSecret(token.secret)
          setShowAddedModal(true)
          setNewTokenLabel('')
        })
        .catch(showErrorNotification('profile.accessTokens.error.create'))
    },
    [newTokenLabel]
  )

  const deleteToken = useCallback(() => {
    deleteAccessToken(selectedForDeletion)
      .then(() => {
        setSelectedForDeletion('')
      })
      .catch(showErrorNotification('profile.accessTokens.error.delete'))
      .finally(() => {
        setShowDeleteModal(false)
      })
  }, [selectedForDeletion])

  const selectForDeletion = useCallback((keyId: string) => {
    setSelectedForDeletion(keyId)
    setShowDeleteModal(true)
  }, [])

  const newTokenSubmittable = useMemo(() => {
    return newTokenLabel.trim().length > 0
  }, [newTokenLabel])

  useEffect(() => {
    getAccessTokenList()
      .then((tokens) => {
        setAccessTokens(tokens)
      })
      .catch(showErrorNotification('profile.accessTokens.error.list'));
  }, [showAddedModal, showDeleteModal])

  return (
    <Fragment>
      <Card className='bg-dark mb-4 access-tokens'>
        <Card.Body>
          <Card.Title>
            <Trans i18nKey='profile.accessTokens.title' />
          </Card.Title>
          <p className='text-start'>
            <Trans i18nKey='profile.accessTokens.info' />
          </p>
          <p className='text-start small'>
            <Trans i18nKey='profile.accessTokens.infoDev' />
          </p>
          <hr />
          <ShowIf condition={accessTokens.length === 0}>
            <Trans i18nKey='profile.accessTokens.noTokens' />
          </ShowIf>
          <ListGroup>
            {accessTokens.map((token) => {
              return (
                <ListGroup.Item className='bg-dark' key={token.keyId}>
                  <Row>
                    <Col className='text-start'>{token.label}</Col>
                    <Col className='text-start text-white-50'>
                      <Trans
                        i18nKey='profile.accessTokens.created'
                        values={{
                          time: DateTime.fromISO(token.createdAt).toRelative({
                            style: 'short'
                          })
                        }}
                      />
                      <br />
                      <Trans
                        i18nKey='profile.accessTokens.lastUsed'
                        values={{
                          time: DateTime.fromISO(token.lastUsed ?? token.createdAt).toRelative({
                            style: 'short'
                          })
                        }}
                      />
                    </Col>
                    <Col xs='auto'>
                      <IconButton icon='trash-o' variant='danger' onClick={() => selectForDeletion(token.keyId)} />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          <hr />
          <Form onSubmit={addToken} className='text-left'>
            <Form.Row>
              <Col>
                <Form.Control
                  type='text'
                  size='sm'
                  placeholder={t('profile.accessTokens.label')}
                  value={newTokenLabel}
                  className='bg-dark text-light'
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setNewTokenLabel(event.target.value)}
                  isValid={newTokenSubmittable}
                  required
                />
              </Col>
              <Col xs={'auto'}>
                <Button type='submit' variant='primary' size='sm' disabled={!newTokenSubmittable}>
                  <Trans i18nKey='profile.accessTokens.createToken' />
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>

      <CommonModal
        show={showAddedModal}
        onHide={() => setShowAddedModal(false)}
        titleI18nKey='profile.modal.addedAccessToken.title'>
        <Modal.Body>
          <Trans i18nKey='profile.modal.addedAccessToken.message' />
          <br />
          <CopyableField content={newTokenSecret} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => setShowAddedModal(false)}>
            <Trans i18nKey='common.close' />
          </Button>
        </Modal.Footer>
      </CommonModal>

      <DeletionModal
        onConfirm={deleteToken}
        deletionButtonI18nKey={'common.delete'}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        titleI18nKey={'profile.modal.deleteAccessToken.title'}>
        <Trans i18nKey='profile.modal.deleteAccessToken.message' />
      </DeletionModal>
    </Fragment>
  )
}

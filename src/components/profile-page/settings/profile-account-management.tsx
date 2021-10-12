/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { deleteUser } from '../../../api/me'
import { getApiUrl } from '../../../api/utils'
import { clearUser } from '../../../redux/user/methods'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { showErrorNotification } from '../../../redux/ui-notifications/methods'

export const ProfileAccountManagement: React.FC = () => {
  useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletionButtonActive, setDeletionButtonActive] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const interval = useRef<NodeJS.Timeout>()

  const stopCountdown = (): void => {
    if (interval.current) {
      clearTimeout(interval.current)
    }
  }

  const startCountdown = (): void => {
    interval.current = setInterval(() => {
      setCountdown((oldValue) => oldValue - 1)
    }, 1000)
  }

  const handleModalClose = () => {
    setShowDeleteModal(false)
    stopCountdown()
  }

  useEffect(() => {
    if (!showDeleteModal) {
      return
    }
    if (countdown === 0) {
      setDeletionButtonActive(true)
      stopCountdown()
    }
  }, [countdown, showDeleteModal])

  const handleModalOpen = () => {
    setShowDeleteModal(true)
    setDeletionButtonActive(false)
    setCountdown(10)
    startCountdown()
  }

  const deleteUserAccount = () => {
    deleteUser().catch(showErrorNotification('profile.error.deleteUser'))
    clearUser()
  }

  return (
    <Fragment>
      <Card className='bg-dark mb-4'>
        <Card.Body>
          <Card.Title>
            <Trans i18nKey='profile.accountManagement' />
          </Card.Title>
          <Button variant='secondary' block href={getApiUrl() + 'me/export'} className='mb-2'>
            <ForkAwesomeIcon icon='cloud-download' fixedWidth={true} className='mx-2' />
            <Trans i18nKey='profile.exportUserData' />
          </Button>
          <Button variant='danger' block onClick={handleModalOpen}>
            <ForkAwesomeIcon icon='trash' fixedWidth={true} className='mx-2' />
            <Trans i18nKey='profile.deleteUser' />
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={handleModalClose} animation={true}>
        <Modal.Body className='text-dark'>
          <h3 dir='auto'>
            <Trans i18nKey='profile.modal.deleteUser.message' />
          </h3>
          <Trans i18nKey='profile.modal.deleteUser.subMessage' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>
            <Trans i18nKey='common.close' />
          </Button>
          <Button variant='danger' onClick={deleteUserAccount} disabled={!deletionButtonActive}>
            {deletionButtonActive ? <Trans i18nKey={'profile.modal.deleteUser.title'} /> : countdown}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

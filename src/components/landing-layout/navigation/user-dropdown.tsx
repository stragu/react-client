/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { LinkContainer } from 'react-router-bootstrap'
import { clearUser } from '../../../redux/user/methods'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { UserAvatar } from '../../common/user-avatar/user-avatar'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { doLocalLogout } from '../../../api/auth'
import { showErrorNotification } from '../../../redux/ui-notifications/methods'

export const UserDropdown: React.FC = () => {
  useTranslation()
  const user = useApplicationState((state) => state.user)

  const onLogoutClick = useCallback(() => {
    doLocalLogout().then(() => {
      clearUser()
    }).catch(showErrorNotification('login.error.auth.signingOut'))
  }, [])

  if (!user) {
    return null
  }

  return (
    <Dropdown alignRight>
      <Dropdown.Toggle size='sm' variant='dark' id='dropdown-user' className={'d-flex align-items-center'}>
        <UserAvatar name={user.displayName} photo={user.photo} />
      </Dropdown.Toggle>

      <Dropdown.Menu className='text-start'>
        <LinkContainer to={'/n/features'}>
          <Dropdown.Item dir='auto'>
            <ForkAwesomeIcon icon='bolt' fixedWidth={true} className='mx-2' />
            <Trans i18nKey='editor.help.documents.features' />
          </Dropdown.Item>
        </LinkContainer>
        <LinkContainer to={'/profile'}>
          <Dropdown.Item dir='auto'>
            <ForkAwesomeIcon icon='user' fixedWidth={true} className='mx-2' />
            <Trans i18nKey='profile.userProfile' />
          </Dropdown.Item>
        </LinkContainer>
        <Dropdown.Item
          dir='auto'
          onClick={onLogoutClick}>
          <ForkAwesomeIcon icon='sign-out' fixedWidth={true} className='mx-2' />
          <Trans i18nKey='login.signOut' />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

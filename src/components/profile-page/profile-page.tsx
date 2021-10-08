/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { useApplicationState } from '../../hooks/common/use-application-state'
import { ProfileAccessTokens } from './access-tokens/profile-access-tokens'
import { ProfileAccountManagement } from './settings/profile-account-management'
import { ProfileChangePassword } from './settings/profile-change-password'
import { ProfileDisplayName } from './settings/profile-display-name'

export const ProfilePage: React.FC = () => {
  const user = useApplicationState((state) => state.user)

  if (!user) {
    return <Redirect to={'/login'} />
  }

  return (
    <Fragment>
      <div className='my-3'>
        <Row className='h-100 flex justify-content-center'>
          <Col lg={6}>
            <ProfileDisplayName />
            <ProfileChangePassword />
            <ProfileAccessTokens />
            <ProfileAccountManagement />
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

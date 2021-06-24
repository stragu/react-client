/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useState } from 'react'
import { Trans } from 'react-i18next'
import { SpecificSidebarEntryProps } from './types'
import { SidebarButton } from './sidebar-button'
import { AliasesModal } from '../document-bar/aliases/aliases-modal'

export const AliasesSidebarEntry: React.FC<SpecificSidebarEntryProps> = ({ className, hide }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Fragment>
      <SidebarButton
        hide={hide}
        className={className}
        icon={'tags'}
        onClick={() => setShowModal(true)}
        data-cy={'sidebar-btn-aliases'}>
        <Trans i18nKey={'editor.modal.aliases.title'} />
      </SidebarButton>
      <AliasesModal show={showModal} onHide={() => setShowModal(false)} />
    </Fragment>
  )
}

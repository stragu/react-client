/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../fork-awesome/fork-awesome-icon'
import type { IconName } from '../fork-awesome/types'
import { ShowIf } from '../show-if/show-if'
import type { PropsWithDataCypressId } from '../../../utils/cypress-attribute'
import { cypressId } from '../../../utils/cypress-attribute'

export interface CommonModalProps extends PropsWithDataCypressId {
  show: boolean
  onHide?: () => void
  titleI18nKey?: string
  title?: string
  closeButton?: boolean
  icon?: IconName
  size?: 'lg' | 'sm' | 'xl'
  additionalClasses?: string
}

export const CommonModal: React.FC<CommonModalProps> = ({
  show,
  onHide,
  titleI18nKey,
  title,
  closeButton,
  icon,
  additionalClasses,
  size,
  children,
  ...props
}) => {
  useTranslation()

  return (
    <Modal
      {...cypressId(props)}
      show={show}
      onHide={onHide}
      animation={true}
      dialogClassName={`text-dark ${additionalClasses ?? ''}`}
      size={size}>
      <Modal.Header closeButton={!!closeButton}>
        <Modal.Title>
          <ShowIf condition={!!icon}>
            <ForkAwesomeIcon icon={icon as IconName} />
            &nbsp;
          </ShowIf>
          {titleI18nKey ? <Trans i18nKey={titleI18nKey} /> : <span>{title}</span>}
        </Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  )
}

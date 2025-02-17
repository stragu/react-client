/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Dropdown } from 'react-bootstrap'
import type { TocAst } from 'markdown-it-toc-done-right'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { TableOfContents } from '../../editor-page/table-of-contents/table-of-contents'
import './markdown-toc-button.scss'

export interface MarkdownTocButtonProps {
  tocAst: TocAst
  baseUrl: string
}

/**
 * Renders a button that is hovering over the parent and shows a {@link TableOfContents table of contents list} as overlay if clicked.
 *
 * @param tocAst the {@link TocAst AST} that should be rendered.
 * @param baseUrl the base url that will be used to generate the links
 * @return the created component
 */
export const TableOfContentsHoveringButton: React.FC<MarkdownTocButtonProps> = ({ tocAst, baseUrl }) => {
  return (
    <div className={'markdown-toc-sidebar-button'}>
      <Dropdown drop={'up'}>
        <Dropdown.Toggle id='toc-overlay-button' variant={'secondary'} className={'no-arrow'}>
          <ForkAwesomeIcon icon={'list-ol'} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className={'p-2'}>
            <TableOfContents ast={tocAst} baseUrl={baseUrl} />
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import type { TocAst } from 'markdown-it-toc-done-right'
import { TableOfContents } from '../editor-page/table-of-contents/table-of-contents'
import { TableOfContentsHoveringButton } from './markdown-toc-button/table-of-contents-hovering-button'

export interface DocumentExternalTocProps {
  tocAst: TocAst
  width: number
  baseUrl: string
}

const MAX_WIDTH_FOR_BUTTON_VISIBILITY = 1100

/**
 * Renders the {@link TableOfContents table of contents list} for the given {@link TocAst AST}.
 * If the given width is below {@link MAX_WIDTH_FOR_BUTTON_VISIBILITY the width limit} then a {@link TableOfContentsHoveringButton button} with an overlay will be shown instead.
 *
 * @param tocAst the {@link TocAst AST} that should be rendered.
 * @param width the width that should be used to determine if the button should be shown.
 * @param baseUrl the base url that will be used to generate the links //TODO: replace with consumer/provider
 * @return the created component
 */
export const WidthBasedTableOfContents: React.FC<DocumentExternalTocProps> = ({ tocAst, width, baseUrl }) => {
  if (width >= MAX_WIDTH_FOR_BUTTON_VISIBILITY) {
    return <TableOfContents ast={tocAst} className={'sticky'} baseUrl={baseUrl} />
  } else {
    return <TableOfContentsHoveringButton tocAst={tocAst} baseUrl={baseUrl} />
  }
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { documentToc } from './document-toc'
import type MarkdownIt from 'markdown-it/lib'
import type { TocAst } from 'markdown-it-toc-done-right'

export const documentTableOfContents = (onTocChange: (toc: TocAst) => void): MarkdownIt.PluginSimple => {
  return (markdownIt) => documentToc(markdownIt, onTocChange)
}

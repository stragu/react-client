/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type MarkdownIt from 'markdown-it/lib'

export const MarkdownItParserDebugger: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  if (import.meta.env.MODE !== 'production') {
    md.core.ruler.push('test', (state) => {
      console.log(state)
      return false
    })
  }
}

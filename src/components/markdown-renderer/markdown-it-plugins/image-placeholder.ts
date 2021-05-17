/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it/lib'

export const imagePlaceholder: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  md.core.ruler.push('image-placeholder', (state) => {
    state.tokens.forEach((token) => {
      if (token.type === 'inline') {
        token.children?.forEach((childToken) => {
          if (childToken.type === 'image') {
            if (childToken.attrGet('src') === 'https://') {
              const line = token.map?.[0]
              if (line !== undefined) {
                childToken.attrSet('data-line', String(line))
              }
            }
          }
        })
      }
    })
    return true
  })
}

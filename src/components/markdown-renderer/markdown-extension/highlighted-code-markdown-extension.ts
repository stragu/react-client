/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import type MarkdownIt from 'markdown-it'
import { HighlightedCodeReplacer } from '../replace-components/highlighted-fence/highlighted-fence-replacer'
import type { ComponentReplacer } from '../replace-components/component-replacer'

export class HighlightedCodeMarkdownExtension extends MarkdownExtension {
  private static readonly highlightRegex = /^ *([\w-]*)(.*)$/

  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    markdownIt.core.ruler.push('highlighted-code', (state) => {
      state.tokens.forEach((token) => {
        if (token.type === 'fence') {
          const highlightInfos = HighlightedCodeMarkdownExtension.highlightRegex.exec(token.info)
          if (!highlightInfos) {
            return
          }
          if (highlightInfos[1]) {
            token.attrJoin('data-highlight-language', highlightInfos[1])
          }
          if (highlightInfos[2]) {
            token.attrJoin('data-extra', highlightInfos[2])
          }
        }
      })
      return true
    })
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new HighlightedCodeReplacer()]
  }
}

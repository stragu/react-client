/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import mathJax from 'markdown-it-mathjax'
import type MarkdownIt from 'markdown-it'
import type { ComponentReplacer } from '../../replace-components/component-replacer'
import { KatexReplacer } from './katex-replacer'

export class KatexMarkdownExtension extends MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    mathJax({
      beforeMath: '<app-katex>',
      afterMath: '</app-katex>',
      beforeInlineMath: '<app-katex data-inline="true">',
      afterInlineMath: '</app-katex>',
      beforeDisplayMath: '<app-katex>',
      afterDisplayMath: '</app-katex>'
    })(markdownIt)
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new KatexReplacer()]
  }

  public buildTagNameWhitelist(): string[] {
    return ['app-katex']
  }
}

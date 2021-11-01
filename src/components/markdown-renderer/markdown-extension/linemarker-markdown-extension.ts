/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import { LinemarkerReplacer } from '../replace-components/linemarker/linemarker-replacer'
import type { ComponentReplacer } from '../replace-components/component-replacer'
import type { LineMarkers } from '../replace-components/linemarker/line-number-marker'
import { lineNumberMarker } from '../replace-components/linemarker/line-number-marker'
import type MarkdownIt from 'markdown-it'

export class LinemarkerMarkdownExtension extends MarkdownExtension {
  constructor(private onLineMarkers?: (lineMarkers: LineMarkers[]) => void, private lineOffset?: number) {
    super()
  }

  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    lineNumberMarker(markdownIt, this.lineOffset ?? 0,  this.onLineMarkers)
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new LinemarkerReplacer()]
  }

  public buildTagNameWhitelist(): string[] {
    return ['app-linemarker']
  }
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import { LinemarkerReplacer } from './linemarker-replacer'
import type { ComponentReplacer } from '../../replace-components/component-replacer'
import type { LineMarkers } from './add-line-marker-markdown-it-plugin'
import { addLineMarkerMarkdownItPlugin } from './add-line-marker-markdown-it-plugin'
import type MarkdownIt from 'markdown-it'

export class LinemarkerMarkdownExtension extends MarkdownExtension {
  constructor(private onLineMarkers?: (lineMarkers: LineMarkers[]) => void, private lineOffset?: number) {
    super()
  }

  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    addLineMarkerMarkdownItPlugin(markdownIt, this.lineOffset ?? 0, this.onLineMarkers)
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new LinemarkerReplacer()]
  }

  public buildTagNameWhitelist(): string[] {
    return ['app-linemarker']
  }
}

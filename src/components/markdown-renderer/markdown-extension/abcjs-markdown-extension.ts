/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import { CodeBlockComponentReplacer } from '../replace-components/code-block-component-replacer'
import { AbcFrame } from '../replace-components/abc/abc-frame'
import type { ComponentReplacer } from '../replace-components/component-replacer'

export class AbcjsMarkdownExtension extends MarkdownExtension {
  public buildReplacers(): ComponentReplacer[] {
    return [new CodeBlockComponentReplacer(AbcFrame, 'abc')]
  }
}

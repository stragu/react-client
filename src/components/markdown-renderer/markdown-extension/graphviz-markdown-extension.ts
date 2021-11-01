/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import { CodeBlockComponentReplacer } from '../replace-components/code-block-component-replacer'
import type { ComponentReplacer } from '../replace-components/component-replacer'
import {GraphvizFrame} from '../replace-components/graphviz/graphviz-frame'

export class GraphvizMarkdownExtension extends MarkdownExtension {
  public buildReplacers(): ComponentReplacer[] {
    return [new CodeBlockComponentReplacer(GraphvizFrame, 'graphviz')]
  }
}

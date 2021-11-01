/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import { CodeBlockComponentReplacer } from '../replace-components/code-block-component-replacer'
import type { ComponentReplacer } from '../replace-components/component-replacer'
import { VegaChart } from '../replace-components/vega-lite/vega-chart'

export class VegaLiteMarkdownExtension extends MarkdownExtension {
  public buildReplacers(): ComponentReplacer[] {
    return [new CodeBlockComponentReplacer(VegaChart, 'vega-lite')]
  }
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import { JumpAnchorReplacer } from '../replace-components/link-replacer/jump-anchor-replacer'
import type { ComponentReplacer } from '../replace-components/component-replacer'
import type { NodeProcessor } from '../node-preprocessors/node-processor'
import { AnchorNodePreprocessor } from '../node-preprocessors/anchor-node-preprocessor'

export class LinkAdjustmentMarkdownExtension extends MarkdownExtension {
  constructor(private baseUrl: string) {
    super()
  }

  public buildNodeProcessors(): NodeProcessor[] {
    return [new AnchorNodePreprocessor(this.baseUrl)]
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new JumpAnchorReplacer()]
  }
}

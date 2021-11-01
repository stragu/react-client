/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import { SanitizerNodePreprocessor } from './dom-purifier-node-preprocessor'
import type { NodeProcessor } from '../../node-preprocessors/node-processor'

export class SanitizerMarkdownExtension extends MarkdownExtension {
  public buildNodeProcessors(): NodeProcessor[] {
    return [new SanitizerNodePreprocessor()]
  }
}

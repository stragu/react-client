/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import type { ComponentReplacer } from '../replace-components/component-replacer'
import type { ImageClickHandler } from '../replace-components/image/image-replacer'
import { ImageReplacer } from '../replace-components/image/image-replacer'

export class ProxyImageMarkdownExtension extends MarkdownExtension {
  constructor(private onImageClick?: ImageClickHandler) {
    super()
  }

  buildReplacers(): ComponentReplacer[] {
    return [new ImageReplacer(this.onImageClick)]
  }
}

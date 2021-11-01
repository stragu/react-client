/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import { BlockquoteColorTagReplacer } from '../replace-components/blockquote-tag/blockquote-color-tag-replacer'
import { BlockquoteTextTagReplacer } from '../replace-components/blockquote-tag/blockquote-text-tag-replacer'
import type { ComponentReplacer } from '../replace-components/component-replacer'
import { BlockquoteTagMarkdownItPlugin } from '../markdown-it-plugins/blockquote/blockquote-tag'
import type MarkdownIt from 'markdown-it'
import type { NodeProcessor } from '../node-preprocessors/node-processor'
import { ColoredBlockquoteNodePreprocessor } from '../node-preprocessors/colored-blockquote-node-preprocessor'

export class BlockquoteMarkdownExtension extends MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    new BlockquoteTagMarkdownItPlugin('color', 'tag').registerInlineRule(markdownIt)
    new BlockquoteTagMarkdownItPlugin('name', 'user').registerInlineRule(markdownIt)
    new BlockquoteTagMarkdownItPlugin('time', 'clock-o').registerInlineRule(markdownIt)
    BlockquoteTagMarkdownItPlugin.registerRenderer(markdownIt)
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new BlockquoteColorTagReplacer(), new BlockquoteTextTagReplacer()]
  }

  public buildNodeProcessors(): NodeProcessor[] {
    return [new ColoredBlockquoteNodePreprocessor()]
  }
}

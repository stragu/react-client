/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import markdownItRegex from 'markdown-it-regex'
import { replaceLegacyYoutubeShortCode } from '../youtube/replace-legacy-youtube-short-code'
import type MarkdownIt from 'markdown-it'
import type { ComponentReplacer } from '../../replace-components/component-replacer'
import { CustomTagWithIdComponentReplacer } from '../../replace-components/custom-tag-with-id-component-replacer'
import { replaceVimeoLink } from './replace-vimeo-link'
import { VimeoFrame } from './vimeo-frame'

export class VimeoMarkdownExtension extends MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    markdownItRegex(markdownIt, replaceVimeoLink)
    markdownItRegex(markdownIt, replaceLegacyYoutubeShortCode)
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new CustomTagWithIdComponentReplacer(VimeoFrame, 'vimeo')]
  }

  public buildTagNameWhitelist(): string[] {
    return ['app-vimeo']
  }
}

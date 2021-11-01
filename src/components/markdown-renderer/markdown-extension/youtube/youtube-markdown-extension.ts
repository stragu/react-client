/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import markdownItRegex from 'markdown-it-regex'
import { replaceYouTubeLink } from './replace-youtube-link'
import { replaceLegacyYoutubeShortCode } from './replace-legacy-youtube-short-code'
import type MarkdownIt from 'markdown-it'
import type { ComponentReplacer } from '../../replace-components/component-replacer'
import { CustomTagWithIdComponentReplacer } from '../../replace-components/custom-tag-with-id-component-replacer'
import { YouTubeFrame } from './youtube-frame'

export class YoutubeMarkdownExtension extends MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    markdownItRegex(markdownIt, replaceYouTubeLink)
    markdownItRegex(markdownIt, replaceLegacyYoutubeShortCode)
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new CustomTagWithIdComponentReplacer(YouTubeFrame, 'youtube')]
  }

  public buildTagNameWhitelist(): string[] {
    return ['app-youtube']
  }
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import markdownItRegex from 'markdown-it-regex'
import type MarkdownIt from 'markdown-it'
import type { ComponentReplacer } from '../replace-components/component-replacer'
import { CustomTagWithIdComponentReplacer } from '../replace-components/custom-tag-with-id-component-replacer'
import { replaceGistLink } from '../replace-components/gist/replace-gist-link'
import { replaceLegacyGistShortCode } from '../replace-components/gist/replace-legacy-gist-short-code'
import { GistFrame } from '../replace-components/gist/gist-frame'

export class GistMarkdownExtension extends MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    markdownItRegex(markdownIt, replaceGistLink)
    markdownItRegex(markdownIt, replaceLegacyGistShortCode)
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new CustomTagWithIdComponentReplacer(GistFrame, 'gist')]
  }

  public buildTagNameWhitelist(): string[] {
    return ['app-gist']
  }
}

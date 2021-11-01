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
import { AsciinemaFrame } from '../replace-components/asciinema/asciinema-frame'
import { replaceAsciinemaLink } from '../replace-components/asciinema/replace-asciinema-link'

export class AsciinemaMarkdownExtension extends MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    markdownItRegex(markdownIt, replaceAsciinemaLink)
  }

  public buildReplacer(): ComponentReplacer[] {
    return [new CustomTagWithIdComponentReplacer(AsciinemaFrame, 'asciinema')]
  }

  public buildTagNameWhitelist(): string[] {
    return ['app-asciinema']
  }
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import type MarkdownIt from 'markdown-it'
import { legacyPdfShortCode } from '../regex-plugins/replace-legacy-pdf-short-code'
import { legacySlideshareShortCode } from '../regex-plugins/replace-legacy-slideshare-short-code'
import { legacySpeakerdeckShortCode } from '../regex-plugins/replace-legacy-speakerdeck-short-code'

export class LegacyShortcodesMarkdownExtension extends MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    legacyPdfShortCode(markdownIt)
    legacySlideshareShortCode(markdownIt)
    legacySpeakerdeckShortCode(markdownIt)
  }
}

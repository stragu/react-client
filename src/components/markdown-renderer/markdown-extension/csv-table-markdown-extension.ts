/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import { CsvReplacer } from '../replace-components/csv/csv-replacer'
import type { ComponentReplacer } from '../replace-components/component-replacer'

export class CsvTableMarkdownExtension extends MarkdownExtension {
  public buildReplacers(): ComponentReplacer[] {
    return [new CsvReplacer()]
  }
}

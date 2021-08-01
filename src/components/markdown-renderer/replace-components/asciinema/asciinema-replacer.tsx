/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import markdownItRegex from 'markdown-it-regex'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { getAttributesFromHedgeDocTag } from '../utils'
import { AsciinemaFrame } from './asciinema-frame'
import { replaceAsciinemaLink } from './replace-asciinema-link'
import type MarkdownIt from 'markdown-it'
import type { Element } from 'domhandler'

/**
 * Detects code blocks with "asciinema" as language and renders them Asciinema frame
 */
export class AsciinemaReplacer extends ComponentReplacer {
  public static readonly markdownItPlugin: MarkdownIt.PluginSimple = (markdownIt) => {
    markdownItRegex(markdownIt, replaceAsciinemaLink)
  }

  public getReplacement(node: Element): React.ReactElement | undefined {
    const attributes = getAttributesFromHedgeDocTag(node, 'asciinema')
    if (attributes && attributes.id) {
      const asciinemaId = attributes.id
      return <AsciinemaFrame id={asciinemaId} />
    }
  }
}

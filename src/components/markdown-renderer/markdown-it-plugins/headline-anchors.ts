/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import anchor from 'markdown-it-anchor'
import type MarkdownIt from 'markdown-it'

export const headlineAnchors: MarkdownIt.PluginSimple = (markdownIt) => {
  anchor(markdownIt, {
    permalink: anchor.permalink.ariaHidden({
      symbol: '<i class="fa fa-link"></i>',
      class: 'heading-anchor text-dark',
      renderHref: (slug: string): string => `#${slug}`,
      placement: 'before'
    })
  })
}

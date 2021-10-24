/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type MarkdownIt from 'markdown-it/lib'
import type Token from 'markdown-it/lib/token'
import type { QuoteExtraTagValues } from './parse-blockquote-tag'
import { parseBlockquoteTag } from './parse-blockquote-tag'
import type { IconName } from '../../../common/fork-awesome/types'
import Optional from 'optional-js'
import type StateInline from 'markdown-it/lib/rules_inline/state_inline'

export interface BlockquoteTagOptions {
  parseSubTags?: boolean
  valueRegex?: RegExp
  icon?: IconName
}

export class BlockquoteTagMarkdownItPlugin {
  constructor(private tagName: string, private icon: IconName) {}

  public createMarkdownItPlugin(): MarkdownIt.PluginSimple {
    return (markdownIt) => {
      this.registerRenderer(markdownIt)
      this.registerInlineRule(markdownIt)
    }
  }

  private registerRenderer(markdownIt: MarkdownIt): void {
    if (markdownIt.renderer.rules['blockquote_tag']) {
      return
    }
    markdownIt.renderer.rules['blockquote_tag'] = (tokens, idx, options: MarkdownIt.Options, env: unknown) => {
      const token = tokens[idx]
      const innerTokens = token.children
      const label = token.attrGet('label') ?? ''
      const icon = token.attrGet('icon')

      const iconAttribute = icon === null ? '' : ` data-icon="${icon}"`

      const innerHtml = innerTokens === null ? '' : markdownIt.renderer.renderInline(innerTokens, options, env)
      return `<blockquote-tag data-label='${label}'${iconAttribute}>${innerHtml}</blockquote-tag>`
    }
  }

  private registerInlineRule(markdownIt: MarkdownIt): void {
    markdownIt.inline.ruler.before('link', `blockquote_${this.tagName}`, (state) =>
      this.parseSpecificBlockquoteTag(state)
        .map((parseResults) => {
          const token = this.createBlockquoteTagToken(state, parseResults)
          this.processTagValue(token, state, parseResults)
          return true
        })
        .orElse(false)
    )
  }

  private parseSpecificBlockquoteTag(state: StateInline): Optional<QuoteExtraTagValues> {
    return Optional.ofNullable(parseBlockquoteTag(state.src, state.pos, state.posMax))
      .filter((results) => results.label === this.tagName)
      .map((parseResults) => {
        state.pos = parseResults.valueEndIndex + 1
        return parseResults
      })
  }

  private createBlockquoteTagToken(state: StateInline, parseResults: QuoteExtraTagValues): Token {
    const token = state.push('blockquote_tag', '', 0)
    token.attrSet('label', parseResults.label)
    token.attrSet('icon', this.icon)
    return token
  }

  protected processTagValue(token: Token, state: StateInline, parseResults: QuoteExtraTagValues): void {
    const childTokens: Token[] = []
    state.md.inline.parse(parseResults.value, state.md, state.env, childTokens)
    token.children = childTokens
  }
}

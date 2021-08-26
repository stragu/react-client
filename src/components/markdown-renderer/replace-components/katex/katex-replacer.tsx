/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Element } from 'domhandler'
import MarkdownIt from 'markdown-it'
import mathJax from 'markdown-it-mathjax'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import './katex.scss'

/**
 * Checks if the given node should be rendered with KaTeX.
 *
 * @param node the node to check
 * @return {@code true} if the given node should be rendered with KaTeX. {@code false} otherwise.
 */
const isInlineKatexTag = (node: Element): boolean => {
  return node.attribs?.['data-katex'] === 'inline'
}

const isBlockKatexTag = (node: Element): boolean => {
  return node.attribs?.['data-katex'] === 'block'
}

const KaTeX = React.lazy(() => import(/* webpackChunkName: "katex" */ '@matejmazur/react-katex'))

/**
 * Detects LaTeX syntax and renders it with KaTeX.
 */
export class KatexReplacer extends ComponentReplacer {
  public static readonly markdownItPlugin: MarkdownIt.PluginSimple = mathJax({
    beforeMath: '<div data-katex="block">',
    afterMath: '</div>',
    beforeInlineMath: '<span data-katex="inline">',
    afterInlineMath: '</span>',
    beforeDisplayMath: '<div data-katex="block">',
    afterDisplayMath: '</div>'
  })

  public getReplacement(node: Element): React.ReactElement | undefined {
    const blockKatex = isBlockKatexTag(node)
    if (blockKatex || isInlineKatexTag(node)) {
      const latexContent = ComponentReplacer.extractTextChildContent(node)
      return <KaTeX block={blockKatex} math={latexContent} errorColor={'#cc0000'} />
    }
  }
}

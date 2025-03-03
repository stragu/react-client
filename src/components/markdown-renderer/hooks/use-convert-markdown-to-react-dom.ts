/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type MarkdownIt from 'markdown-it/lib'
import { useMemo } from 'react'
import type { ComponentReplacer, ValidReactDomElement } from '../replace-components/component-replacer'
import convertHtmlToReact from '@hedgedoc/html-to-react'
import type { Document } from 'domhandler'
import { NodeToReactTransformer } from '../utils/node-to-react-transformer'
import { LineIdMapper } from '../utils/line-id-mapper'

/**
 * Renders markdown code into react elements
 *
 * @param markdownCode The markdown code that should be rendered
 * @param markdownIt The configured {@link MarkdownIt markdown it} instance that should render the code
 * @param replacers A function that provides a list of {@link ComponentReplacer component replacers}
 * @param preprocessNodes A function that processes nodes after parsing the html code that is generated by markdown it.
 * @return The React DOM that represents the rendered markdown code
 */
export const useConvertMarkdownToReactDom = (
  markdownCode: string,
  markdownIt: MarkdownIt,
  replacers: ComponentReplacer[],
  preprocessNodes?: (nodes: Document) => Document
): ValidReactDomElement[] => {
  const lineNumberMapper = useMemo(() => new LineIdMapper(), [])
  const htmlToReactTransformer = useMemo(() => new NodeToReactTransformer(), [])

  useMemo(() => {
    htmlToReactTransformer.setReplacers(replacers)
  }, [htmlToReactTransformer, replacers])

  useMemo(() => {
    htmlToReactTransformer.setLineIds(lineNumberMapper.updateLineMapping(markdownCode))
  }, [htmlToReactTransformer, lineNumberMapper, markdownCode])

  return useMemo(() => {
    const html = markdownIt.render(markdownCode)
    return convertHtmlToReact(html, {
      transform: (node, index) => htmlToReactTransformer.translateNodeToReactElement(node, index),
      preprocessNodes: preprocessNodes
    })
  }, [htmlToReactTransformer, markdownCode, markdownIt, preprocessNodes])
}

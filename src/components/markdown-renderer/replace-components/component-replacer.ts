/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Element } from 'domhandler'
import { isText } from 'domhandler'
import type MarkdownIt from 'markdown-it'
import type { ReactElement } from 'react'

export type ValidReactDomElement = ReactElement | string | null

export type SubNodeTransform = (node: Element, subKey: number | string) => ValidReactDomElement | void

export type NativeRenderer = () => ValidReactDomElement

export type MarkdownItPlugin = MarkdownIt.PluginSimple | MarkdownIt.PluginWithOptions | MarkdownIt.PluginWithParams

export const REPLACE_WITH_NOTHING = null
export const DO_NOT_REPLACE = undefined
export type NodeReplacement = ValidReactDomElement | typeof REPLACE_WITH_NOTHING | typeof DO_NOT_REPLACE

/**
 * Base class for all component replacers.
 * Component replacers detect structures in the HTML DOM from markdown it
 * and replace them with some special react components.
 */
export abstract class ComponentReplacer {
  /**
   * Extracts the content of the first text child node.
   *
   * @param node the node with the text node child
   * @return the string content
   */
  protected static extractTextChildContent(node: Element): string {
    const childrenTextNode = node.children[0]
    return isText(childrenTextNode) ? childrenTextNode.data : ''
  }

  /**
   * Checks if the current node should be altered or replaced and does if needed.
   *
   * @param node The current html dom node
   * @param subNodeTransform should be used to convert child elements of the current node
   * @param nativeRenderer renders the current node without any replacement
   * @return the replacement for the current node or undefined if the current replacer replacer hasn't done anything.
   */
  public abstract replace(
    node: Element,
    subNodeTransform: SubNodeTransform,
    nativeRenderer: NativeRenderer
  ): NodeReplacement
}

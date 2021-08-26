/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Element, Node, NodeWithChildren } from 'domhandler'

export const getAttributesFromHedgeDocTag = (node: Element, tagName: string): { [s: string]: string } | undefined => {
  if (node.name !== `app-${tagName}` || !node.attribs) {
    return
  }
  return node.attribs
}

export const isTagType = (tagName: string, node: Element): boolean => {
  return node.name === tagName
}

export const isSingleChildTag = (node: NodeWithChildren): boolean => {
  return node.children && node.children.length === 1
}

export const getSingleChildFromTag = (node: NodeWithChildren): Node | undefined => {
  return isSingleChildTag(node) ? node.children[0] : undefined
}

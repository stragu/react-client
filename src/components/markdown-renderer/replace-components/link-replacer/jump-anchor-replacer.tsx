/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Element } from 'domhandler'
import type { AllHTMLAttributes } from 'react'
import React from 'react'
import type { NativeRenderer, NodeReplacement, SubNodeTransform } from '../component-replacer'
import { ComponentReplacer, DO_NOT_REPLACE } from '../component-replacer'
import { JumpAnchor } from './jump-anchor'

/**
 * Detects link tags and polishs them.
 * This replacer prevents data and javascript links,
 * extends relative links with the base url and creates working jump links.
 */
export class JumpAnchorReplacer extends ComponentReplacer {
  public replace(node: Element, subNodeTransform: SubNodeTransform, nativeRenderer: NativeRenderer): NodeReplacement {
    if (node.name !== 'a' || !node.attribs || !node.attribs['data-jump-target-id']) {
      return DO_NOT_REPLACE
    }

    const jumpId = node.attribs['data-jump-target-id']
    delete node.attribs['data-jump-target-id']
    const replacement = nativeRenderer()
    if (replacement === null || typeof replacement === 'string') {
      return replacement
    } else {
      return <JumpAnchor { ...replacement.props as AllHTMLAttributes<HTMLAnchorElement> } jumpTargetId={ jumpId } />
    }
  }
}

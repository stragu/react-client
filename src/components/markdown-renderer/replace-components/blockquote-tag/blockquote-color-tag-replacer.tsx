/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NativeRenderer, NodeReplacement, SubNodeTransform } from '../component-replacer'
import { ComponentReplacer, DO_NOT_REPLACE } from '../component-replacer'
import type { Element } from 'domhandler'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { isText } from 'domhandler'
import { cssColor } from '../../node-preprocessors/colored-blockquote-node-preprocessor'
import Optional from 'optional-js'
import type { Text } from 'domhandler/lib/node'


/**
 * Replaces <blockquote-tag> elements with "color" as label and a valid color as content
 * with an colored label icon.
 *
 * @see BlockquoteTagMarkdownItPlugin
 */
export class BlockquoteColorTagReplacer extends ComponentReplacer {
  replace(element: Element, subNodeTransform: SubNodeTransform, nativeRenderer: NativeRenderer): NodeReplacement {
    if (
      element.tagName === 'blockquote-tag' &&
      element.attribs?.['data-label'] === 'color' &&
      element.children !== undefined
    ) {
      return Optional.ofNullable(element.children[0])
        .filter(isText)
        .map((child) => (child as Text).data)
        .filter((content) => cssColor.test(content))
        .map<NodeReplacement>((color) => (
          <span className={'quote-extra'} style={{ color: color }}>
            <ForkAwesomeIcon key='icon' className={'mx-1'} icon={'tag'} />
          </span>
        ))
        .orElse(DO_NOT_REPLACE)
    }
  }
}

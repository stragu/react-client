/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NativeRenderer, NodeReplacement, SubNodeTransform } from '../../replace-components/component-replacer'
import { ComponentReplacer, DO_NOT_REPLACE } from '../../replace-components/component-replacer'
import type { Element } from 'domhandler'
import type { ForkAwesomeIconProps } from '../../../common/fork-awesome/fork-awesome-icon'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import type { IconName } from '../../../common/fork-awesome/types'
import { ForkAwesomeIcons } from '../../../common/fork-awesome/fork-awesome-icons'
import Optional from 'optional-js'
import type { ReactElement } from 'react'

/**
 * Replaces <blockquote-tag> elements with an icon and a small text.
 *
 * @see BlockquoteTagMarkdownItPlugin
 * @see ColoredBlockquoteNodePreprocessor
 */
export class BlockquoteTextTagReplacer extends ComponentReplacer {
  replace(node: Element, subNodeTransform: SubNodeTransform, nativeRenderer: NativeRenderer): NodeReplacement {
    if (node.tagName !== 'blockquote-tag' || !node.attribs) {
      return DO_NOT_REPLACE
    }

    return (
      <span className={'quote-extra'}>
        {this.buildIconElement(node)}
        {BlockquoteTextTagReplacer.transformChildren(node, subNodeTransform)}
      </span>
    )
  }

  /**
   * Extracts a fork awesome icon name from the node and builds a {@link ForkAwesomeIcon fork awesome icon react element}.
   *
   * @param node The node that holds the "data-icon" attribute.
   * @return the {@link ForkAwesomeIcon fork awesome icon react element} or {@code undefined} if no icon name was found.
   */
  private buildIconElement(node: Element): ReactElement<ForkAwesomeIconProps> | undefined {
    return Optional.ofNullable(node.attribs['data-icon'] as IconName)
      .filter((iconName) => ForkAwesomeIcons.includes(iconName))
      .map<ReactElement<ForkAwesomeIconProps> | undefined>((iconName) => (
        <ForkAwesomeIcon key='icon' className={'mx-1'} icon={iconName} />
      ))
      .orElse(undefined)
  }
}

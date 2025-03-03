/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NodeReplacement } from './component-replacer'
import { ComponentReplacer } from './component-replacer'
import type { FunctionComponent } from 'react'
import React from 'react'
import type { Element } from 'domhandler'

export interface IdProps {
  id: string
}

/**
 * Replaces custom tags that have just an id (<app-something id="something"/>) with react elements.
 */
export class CustomTagWithIdComponentReplacer extends ComponentReplacer {
  constructor(private component: FunctionComponent<IdProps>, private tagName: string) {
    super()
  }

  public replace(node: Element): NodeReplacement {
    const id = this.extractId(node)
    return id ? React.createElement(this.component, { id: id }) : undefined
  }

  /**
   * Checks if the given {@link Element} is a custom tag and extracts its `id` attribute.
   *
   * @param element The element to check.
   * @return the extracted id or undefined if the element isn't a custom tag or has no id attribute.
   */
  private extractId(element: Element): string | undefined {
    return element.name === `app-${this.tagName}` && element.attribs && element.attribs.id
      ? element.attribs.id
      : undefined
  }
}

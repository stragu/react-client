/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import { ComponentReplacer } from '../ComponentReplacer'
import type { Element } from 'domhandler'

/**
 * Detects line markers and suppresses them in the resulting DOM.
 */
export class LinemarkerReplacer extends ComponentReplacer {
  public getReplacement(codeNode: Element): null | undefined {
    return codeNode.name === 'app-linemarker' ? null : undefined
  }
}

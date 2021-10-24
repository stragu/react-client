/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Document } from 'domhandler'
import render from 'dom-serializer'
import DOMPurify from 'dompurify'
import { parseDocument } from 'htmlparser2'
import { NodeProcessor } from '../node-preprocessors/node-processor'

const customTags = ['app-linemarker', 'app-katex', 'app-gist', 'app-youtube', 'app-vimeo', 'app-asciinema']

/**
 * Sanitizes the given {@link Document document}.
 */
export class SanitizerNodePreprocessor extends NodeProcessor {
  process(nodes: Document): Document {
    const sanitizedHtml = DOMPurify.sanitize(render(nodes), {
      ADD_TAGS: customTags
    })
    return parseDocument(sanitizedHtml)
  }
}

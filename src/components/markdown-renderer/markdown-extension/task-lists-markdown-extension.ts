/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import type MarkdownIt from 'markdown-it'
import type { ComponentReplacer } from '../replace-components/component-replacer'
import type { TaskCheckedChangeHandler } from '../replace-components/task-list/task-list-replacer'
import { TaskListReplacer } from '../replace-components/task-list/task-list-replacer'
import markdownItTaskLists from '@hedgedoc/markdown-it-task-lists'

export class TaskListsMarkdownExtension extends MarkdownExtension {
  constructor(private frontmatterLinesToSkip?: number, private onTaskCheckedChange?: TaskCheckedChangeHandler) {
    super()
  }

  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    markdownItTaskLists(markdownIt, {
      enabled: true,
      label: true,
      lineNumber: true
    })
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new TaskListReplacer(this.frontmatterLinesToSkip, this.onTaskCheckedChange)]
  }
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Element, isTag } from 'domhandler'
import MarkdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { getSingleChildFromTag, isTagType } from '../utils'
import { replaceLegacyYoutubeShortCode } from './replace-legacy-youtube-short-code'
import { YouTubeFrame } from './youtube-frame'
import { replaceYouTubeLink } from './replace-youtube-link'

const protocolRegex = /(?:http(?:s)?:\/\/)?/
const subdomainRegex = /(?:www.)?/
const pathRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)/
const idRegex = /([^"&?\\/\s]{11})/
const tailRegex = /(?:[?&#].*)?/
const youtubeVideoUrlRegex = new RegExp(
  `(?:${protocolRegex.source}${subdomainRegex.source}${pathRegex.source}${idRegex.source}${tailRegex.source})`
)
const linkRegex = new RegExp(`^${youtubeVideoUrlRegex.source}$`, 'i')

/**
 * Detects 'app-youtube' tags and renders them as youtube embedding.
 */
export class YoutubeReplacer extends ComponentReplacer {
  public static readonly markdownItPlugin: MarkdownIt.PluginSimple = (markdownIt) => {
    markdownItRegex(markdownIt, replaceLegacyYoutubeShortCode)
    markdownItRegex(markdownIt, replaceYouTubeLink)
  }

  public getReplacement(node: Element): React.ReactElement | undefined {
    if (!isTagType('p', node)) {
      return
    }

    const child = getSingleChildFromTag(node)
    debugger
    if (!child || !isTag(child) || !isTagType('a', child)) {
      return
    }

    const url = child.attribs?.['href']
    if (!url) {
      return
    }

    const youtubeLinkRegex = linkRegex.exec(url)
    if (!youtubeLinkRegex) {
      return
    }

    const youtubeId = youtubeLinkRegex[0]
    return <YouTubeFrame id={youtubeId} />
  }
}

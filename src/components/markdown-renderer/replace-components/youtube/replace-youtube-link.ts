/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

const protocolRegex = /http(?:s)?:\/\/?/
const subdomainRegex = /www.?/
const pathRegex = /youtube(?:-nocookie)?\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\//
const idRegex = /[^"&?\\/\s]{11}/
const tailRegex = /[?&#].*?/
const youtubeVideoUrlRegex = new RegExp(
  `(?:${protocolRegex.source}${subdomainRegex.source}${pathRegex.source}${idRegex.source}${tailRegex.source})`
)

const linkRegex = new RegExp(`^${youtubeVideoUrlRegex.source}$`, 'i')

export const replaceYouTubeLink: RegexOptions = {
  name: 'youtube-link',
  regex: linkRegex,
  replace: (match) => {
    return `<a data-youtube-id='youtube' href='${match}'>${match}</a>`
  }
}

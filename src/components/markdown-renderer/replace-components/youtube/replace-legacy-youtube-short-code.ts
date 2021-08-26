/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

export const replaceLegacyYoutubeShortCode: RegexOptions = {
  name: 'legacy-youtube-short-code',
  regex: /^{%youtube ([^"&?\\/\s]{11}) ?%}$/,
  replace: (match) => `<a href='https://youtu.be/${match}'/>https://youtu.be/${match}</a>`
}

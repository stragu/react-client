/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { QuoteExtraTagValues } from './parse-blockquote-tag'
import { parseBlockquoteTag } from './parse-blockquote-tag'

describe('Quote extra syntax parser', () => {
  it('should parse a valid tag', () => {
    const expected: QuoteExtraTagValues = {
      labelStartIndex: 1,
      labelEndIndex: 4,
      valueStartIndex: 5,
      valueEndIndex: 8,
      label: 'abc',
      value: 'def'
    }
    expect(parseBlockquoteTag('[abc=def]', 0, 1000)).toEqual(expected)
  })

  it("shouldn't parse a tag with no opener bracket", () => {
    expect(parseBlockquoteTag('abc=def]', 0, 1000)).toEqual(undefined)
  })

  it("shouldn't parse a tag with no closing bracket", () => {
    expect(parseBlockquoteTag('[abc=def', 0, 1000)).toEqual(undefined)
  })

  it("shouldn't parse a tag with no separation character", () => {
    expect(parseBlockquoteTag('[abcdef]', 0, 1000)).toEqual(undefined)
  })

  it("shouldn't parse a tag with an empty label", () => {
    expect(parseBlockquoteTag('[=def]', 0, 1000)).toEqual(undefined)
  })

  it("shouldn't parse a tag with an empty value", () => {
    expect(parseBlockquoteTag('[abc=]', 0, 1000)).toEqual(undefined)
  })

  it("shouldn't parse a tag with an empty body", () => {
    expect(parseBlockquoteTag('[]', 0, 1000)).toEqual(undefined)
  })

  it("shouldn't parse a tag with an empty body", () => {
    expect(parseBlockquoteTag('[]', 0, 1000)).toEqual(undefined)
  })

  it("shouldn't parse a correct tag if start index isn't at the opening bracket", () => {
    expect(parseBlockquoteTag('[abc=def]', 1, 1000)).toEqual(undefined)
  })

  it("shouldn't parse a correct tag if maxPos ends before tag end", () => {
    expect(parseBlockquoteTag('[abc=def]', 0, 1)).toEqual(undefined)
  })

  it("shouldn't parse a correct tag if start index is after maxPos", () => {
    expect(parseBlockquoteTag('   [abc=def]', 3, 2)).toEqual(undefined)
  })
})

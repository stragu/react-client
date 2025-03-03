/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useRef, useState } from 'react'
import Reveal from 'reveal.js'
import { Logger } from '../../../utils/logger'
import type { SlideOptions } from '../../common/note-frontmatter/types'

const log = new Logger('reveal.js')

export enum REVEAL_STATUS {
  NOT_INITIALISED,
  INITIALISING,
  INITIALISED
}

export interface SlideState {
  indexHorizontal: number
  indexVertical: number
}

const initialSlideState: SlideState = {
  indexHorizontal: 0,
  indexVertical: 0
}

export const useReveal = (content: string, slideOptions?: SlideOptions): REVEAL_STATUS => {
  const [deck, setDeck] = useState<Reveal>()
  const [revealStatus, setRevealStatus] = useState<REVEAL_STATUS>(REVEAL_STATUS.NOT_INITIALISED)
  const currentSlideState = useRef<SlideState>(initialSlideState)

  useEffect(() => {
    if (revealStatus !== REVEAL_STATUS.NOT_INITIALISED) {
      return
    }
    setRevealStatus(REVEAL_STATUS.INITIALISING)
    log.debug('Initialize with slide options', slideOptions)
    const reveal = new Reveal({})
    reveal
      .initialize()
      .then(() => {
        reveal.layout()
        reveal.slide(0, 0, 0)
        reveal.addEventListener('slidechanged', (event) => {
          currentSlideState.current = {
            indexHorizontal: event.indexh,
            indexVertical: event.indexv ?? 0
          } as SlideState
        })

        setDeck(reveal)
        setRevealStatus(REVEAL_STATUS.INITIALISED)
        log.debug('Initialisation finished')
      })
      .catch((error: Error) => {
        log.error('Error while initializing reveal.js', error)
      })
  }, [revealStatus, slideOptions])

  useEffect(() => {
    if (!deck || revealStatus !== REVEAL_STATUS.INITIALISED) {
      return
    }
    log.debug('Sync deck')
    deck.sync()
    deck.slide(currentSlideState.current.indexHorizontal, currentSlideState.current.indexVertical)
  }, [content, deck, revealStatus])

  useEffect(() => {
    if (
      !deck ||
      slideOptions === undefined ||
      Object.keys(slideOptions).length === 0 ||
      revealStatus !== REVEAL_STATUS.INITIALISED
    ) {
      return
    }
    log.debug('Apply config', slideOptions)
    deck.configure(slideOptions)
  }, [deck, revealStatus, slideOptions])

  return revealStatus
}

/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Determines if the left mouse button is pressed in the given event
 *
 * @param mouseEvent the mouse event that should be checked
 * @return {@code true} if the left mouse button is pressed. {@code false} otherwise.
 */
const isLeftMouseButtonPressed = (mouseEvent: MouseEvent): boolean => {
  return mouseEvent.buttons === 1
}

/**
 * Extracts the absolute vertical position of the mouse or touch point from the event.
 *
 * @param moveEvent the vertical position of the mouse pointer or the first touch pointer.
 * @return the extracted vertical position.
 */
const extractVerticalPointerPosition = (
  moveEvent: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
): number => {
  if (isMouseEvent(moveEvent)) {
    return moveEvent.pageY
  } else {
    return moveEvent.touches[0]?.pageY
  }
}

/**
 * Checks if the given {@link Event} is a {@link MouseEvent} or a {@link React.MouseEvent}
 * @param event the event to check
 * @return {@code true} if the given event is a {@link MouseEvent} or a {@link React.MouseEvent}
 */
const isMouseEvent = (event: Event | React.UIEvent): event is MouseEvent | React.MouseEvent => {
  return (event as MouseEvent).buttons !== undefined
}

export type PointerEvent = React.MouseEvent | React.TouchEvent
export type PointerEventHandler = (event: PointerEvent) => void

/**
 * Provides logic for resizing a {@link GistFrame gist frame} by dragging an element.
 *
 * @param initialFrameHeight The initial size for the frame
 * @return An array containing the current frame height and function to start the resizing
 */
export const useResizeGistFrame = (initialFrameHeight: number): [number, PointerEventHandler] => {
  const [frameHeight, setFrameHeight] = useState(initialFrameHeight)
  const lastYPosition = useRef<number | undefined>(undefined)

  const onMove = useCallback((moveEvent: MouseEvent | TouchEvent) => {
    if (lastYPosition.current === undefined) {
      return
    }
    if (isMouseEvent(moveEvent) && !isLeftMouseButtonPressed(moveEvent)) {
      lastYPosition.current = undefined
      moveEvent.preventDefault()
      return undefined
    }

    const currentPointerPosition = extractVerticalPointerPosition(moveEvent)
    const deltaPointerPosition = currentPointerPosition - lastYPosition.current
    lastYPosition.current = currentPointerPosition
    setFrameHeight((oldFrameHeight) => Math.max(0, oldFrameHeight + deltaPointerPosition))
    moveEvent.preventDefault()
  }, [])

  const onStartResizing = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    lastYPosition.current = extractVerticalPointerPosition(event)
  }, [])

  const onStopResizing = useCallback(() => {
    if (lastYPosition.current !== undefined) {
      lastYPosition.current = undefined
    }
  }, [])

  useEffect(() => {
    const moveHandler = onMove
    const stopResizeHandler = onStopResizing
    window.addEventListener('touchmove', moveHandler)
    window.addEventListener('mousemove', moveHandler)
    window.addEventListener('touchcancel', stopResizeHandler)
    window.addEventListener('touchend', stopResizeHandler)
    window.addEventListener('mouseup', stopResizeHandler)

    return () => {
      window.removeEventListener('touchmove', moveHandler)
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('touchcancel', stopResizeHandler)
      window.removeEventListener('touchend', stopResizeHandler)
      window.removeEventListener('mouseup', stopResizeHandler)
    }
  }, [onMove, onStopResizing])

  return [frameHeight, onStartResizing]
}

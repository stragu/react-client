/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from 'react'
import type { CommunicationMessages, EditorToRendererMessageType } from '../rendering-message'
import type { Handler } from '../window-post-message-communicator'
import { useRendererToEditorCommunicator } from '../../../editor-page/render-context/renderer-to-editor-communicator-context-provider'

/**
 * Sets the handler for the given message type in the current renderer to editor communicator.
 *
 * @param messageType The message type that should be used to listen to.
 * @param handler The handler that should be called if a message with the given message type was received.
 */
export const useRendererReceiveHandler = <MESSAGE_TYPE extends EditorToRendererMessageType>(
  messageType: MESSAGE_TYPE,
  handler: Handler<CommunicationMessages, MESSAGE_TYPE>
): void => {
  const editorToRendererCommunicator = useRendererToEditorCommunicator()
  useEffect(() => {
    editorToRendererCommunicator.setHandler(messageType, handler)
    return () => {
      editorToRendererCommunicator.setHandler(messageType, undefined)
    }
  }, [editorToRendererCommunicator, handler, messageType])
}

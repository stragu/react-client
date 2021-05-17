/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor, Position } from 'codemirror'
import i18n from 'i18next'
import { uploadFile } from '../../../api/media'
import { store } from '../../../redux'
import { supportedMimeTypes } from '../../common/upload-image-mimetypes'
import { Logger } from '../../../utils/logger'
import { replaceInMarkdownContent } from '../../../redux/note-details/methods'

const log = new Logger('File Uploader Handler')

export const handleUpload = (file: File, editor: Editor, cursorFrom: Position, cursorTo?: Position): void => {
  if (!file) {
    return
  }
  if (!supportedMimeTypes.includes(file.type)) {
    return
  }
  const randomId = Math.random().toString(36).substr(7)
  const label = i18n.t('editor.upload.uploadFile', { fileName: file.name })
  const uploadPlaceholder = `![${label}](upload-${randomId})`
  const noteId = store.getState().noteDetails.id
  const insertCode = (replacement: string) => {
    replaceInMarkdownContent(uploadPlaceholder, replacement)
  }

  editor.replaceRange(uploadPlaceholder, cursorFrom, cursorTo, '+input')
  uploadFile(noteId, file)
    .then(({ link }) => {
      insertCode(`![](${link})`)
    })
    .catch((error) => {
      log.error('error while uploading file', error)
      insertCode(`![upload of ${file.name} failed]()`)
    })
}

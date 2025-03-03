/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { ShowIf } from '../../common/show-if/show-if'
import { SignInButton } from '../../landing-layout/navigation/sign-in-button'
import { UserDropdown } from '../../landing-layout/navigation/user-dropdown'
import { DarkModeButton } from './dark-mode-button'
import { EditorViewMode } from './editor-view-mode'
import { HelpButton } from './help-button/help-button'
import { NavbarBranding } from './navbar-branding'
import { SyncScrollButtons } from './sync-scroll-buttons/sync-scroll-buttons'
import { NoteType } from '../../common/note-frontmatter/types'
import { SlideModeButton } from './slide-mode-button'
import { ReadOnlyModeButton } from './read-only-mode-button'
import { NewNoteButton } from './new-note-button'
import { useApplicationState } from '../../../hooks/common/use-application-state'

export enum AppBarMode {
  BASIC,
  EDITOR
}

export interface AppBarProps {
  mode: AppBarMode
}

export const AppBar: React.FC<AppBarProps> = ({ mode }) => {
  const userExists = useApplicationState((state) => !!state.user)
  const noteFrontmatter = useApplicationState((state) => state.noteDetails.frontmatter)

  return (
    <Navbar bg={'light'}>
      <Nav className='mr-auto d-flex align-items-center'>
        <NavbarBranding />
        <ShowIf condition={mode === AppBarMode.EDITOR}>
          <EditorViewMode />
          <SyncScrollButtons />
        </ShowIf>
        <DarkModeButton />
        <ShowIf condition={mode === AppBarMode.EDITOR}>
          <ShowIf condition={noteFrontmatter.type === NoteType.SLIDE}>
            <SlideModeButton />
          </ShowIf>
          <ShowIf condition={noteFrontmatter.type !== NoteType.SLIDE}>
            <ReadOnlyModeButton />
          </ShowIf>
          <HelpButton />
        </ShowIf>
      </Nav>
      <Nav className='d-flex align-items-center text-secondary'>
        <NewNoteButton />
        <ShowIf condition={!userExists}>
          <SignInButton size={'sm'} />
        </ShowIf>
        <ShowIf condition={userExists}>
          <UserDropdown />
        </ShowIf>
      </Nav>
    </Navbar>
  )
}

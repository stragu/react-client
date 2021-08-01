/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useFrontendBaseUrl } from './use-frontend-base-url'

export const useFrontendAssetsUrl = (): string => {
  const frontendBaseUrl = useFrontendBaseUrl()
  return import.meta.env.SNOWPACK_PUBLIC_FRONTEND_ASSETS_URL || frontendBaseUrl
}

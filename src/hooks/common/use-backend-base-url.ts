/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const useBackendBaseUrl = (): string => {
  return import.meta.env.SNOWPACK_PUBLIC_BACKEND_BASE_URL ?? '/mock-backend/'
}

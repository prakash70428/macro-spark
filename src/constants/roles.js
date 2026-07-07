/**
 * User role identifiers. Must stay in sync with server/src/constants/roles.js
 * and the users.role field enum in the database schema.
 */

export const ROLES = /** @type {const} */ ({
  ADMIN: 'admin',
  EDITOR: 'editor',
  ANALYST: 'analyst',
  SUBSCRIBER: 'subscriber',
  GUEST: 'guest',
})

/** @type {Array<keyof typeof ROLES>} */
export const ALL_ROLES = Object.values(ROLES)

/** Roles with content management access */
export const EDITORIAL_ROLES = [ROLES.ADMIN, ROLES.EDITOR, ROLES.ANALYST]

/** Roles with subscriber-level read access */
export const SUBSCRIBER_ROLES = [ROLES.ADMIN, ROLES.EDITOR, ROLES.ANALYST, ROLES.SUBSCRIBER]

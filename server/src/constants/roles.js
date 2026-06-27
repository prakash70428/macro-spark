'use strict'

// Must stay in sync with src/constants/roles.js on the frontend
const ROLES = Object.freeze({
  ADMIN:      'admin',
  EDITOR:     'editor',
  ANALYST:    'analyst',
  SUBSCRIBER: 'subscriber',
  GUEST:      'guest',
})

const ALL_ROLES = Object.values(ROLES)
const EDITORIAL_ROLES = [ROLES.ADMIN, ROLES.EDITOR, ROLES.ANALYST]
const SUBSCRIBER_ROLES = [...EDITORIAL_ROLES, ROLES.SUBSCRIBER]

module.exports = { ROLES, ALL_ROLES, EDITORIAL_ROLES, SUBSCRIBER_ROLES }

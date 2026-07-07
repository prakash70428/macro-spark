'use strict'

const env = require('./env')

// RS256 keys are stored as base64-encoded PEM strings in the environment.
// Decode once at startup and reuse across the process lifetime.

let _privateKey = null
let _publicKey = null

/**
 * Returns the RS256 private key PEM string for signing JWTs.
 * @returns {string}
 */
function getPrivateKey() {
  if (!_privateKey) {
    _privateKey = Buffer.from(env.JWT_PRIVATE_KEY, 'base64').toString('utf8')
  }
  return _privateKey
}

/**
 * Returns the RS256 public key PEM string for verifying JWTs.
 * @returns {string}
 */
function getPublicKey() {
  if (!_publicKey) {
    _publicKey = Buffer.from(env.JWT_PUBLIC_KEY, 'base64').toString('utf8')
  }
  return _publicKey
}

module.exports = { getPrivateKey, getPublicKey }

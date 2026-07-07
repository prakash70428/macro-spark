'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const env = require('../config/env')
const { createSchema } = require('./base')
const { ROLES, ALL_ROLES } = require('../constants/roles')

const UserSchema = createSchema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // never return password in queries by default
  },
  role: {
    type: String,
    enum: ALL_ROLES,
    default: ROLES.GUEST,
    index: true,
  },
  firstName: { type: String, trim: true, maxlength: 50 },
  lastName: { type: String, trim: true, maxlength: 50 },
  isEmailVerified: { type: Boolean, default: false },
  refreshTokens: [{ type: String, select: false }],

  // Brute-force protection
  loginAttempts: { type: Number, default: 0, select: false },
  lockUntil: { type: Date, default: null, select: false },
})

// Virtual: full name
UserSchema.virtual('fullName').get(function () {
  if (this.firstName && this.lastName) return `${this.firstName} ${this.lastName}`
  return this.firstName || this.email
})

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, env.BCRYPT_ROUNDS)
  next()
})

// Compare plain password to hash
UserSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password)
}

// Check if account is locked
UserSchema.methods.isLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now()
}

// Increment failed login attempts; lock after 5
UserSchema.methods.incLoginAttempts = async function () {
  const MAX_ATTEMPTS = 5
  const LOCK_DURATION_MS = 30 * 60 * 1000 // 30 minutes

  if (this.lockUntil && this.lockUntil < Date.now()) {
    // Previous lock expired — reset
    return this.updateOne({ $set: { loginAttempts: 1 }, $unset: { lockUntil: '' } })
  }

  const update = { $inc: { loginAttempts: 1 } }
  if (this.loginAttempts + 1 >= MAX_ATTEMPTS) {
    update.$set = { lockUntil: new Date(Date.now() + LOCK_DURATION_MS) }
  }
  return this.updateOne(update)
}

module.exports = mongoose.model('User', UserSchema)

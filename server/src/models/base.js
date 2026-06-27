'use strict'

const mongoose = require('mongoose')

/**
 * Shared SchemaOptions applied to every Mongoose model via spread:
 *   const UserSchema = new Schema({ ... }, { ...baseSchemaOptions })
 *
 * - timestamps: adds createdAt / updatedAt automatically
 * - versionKey: disabled (no __v field on documents)
 * - toJSON: strips __v, renames _id to id
 * - toObject: mirrors toJSON settings for consistency
 */
const baseSchemaOptions = {
  timestamps: true,
  versionKey: false,
  id: true,
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      delete ret._id
      delete ret.__v
      return ret
    },
  },
  toObject: {
    virtuals: true,
    transform(_doc, ret) {
      delete ret._id
      delete ret.__v
      return ret
    },
  },
}

/**
 * Helper to build a Mongoose Schema with base options pre-applied.
 *
 * @param {mongoose.SchemaDefinition} definition
 * @param {mongoose.SchemaOptions} [extraOptions]
 * @returns {mongoose.Schema}
 */
function createSchema(definition, extraOptions = {}) {
  return new mongoose.Schema(definition, { ...baseSchemaOptions, ...extraOptions })
}

module.exports = { baseSchemaOptions, createSchema }

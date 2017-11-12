/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: 'string',
      size: 255,
      required: true,
      unique: true
    },
    description: {
      type: 'text',
      required: true
    },
    difficulty: {
      size: 10,
      type: 'string',
      enum: ['easy', 'medium', 'hard'],
      required: true
    },
    points: {
      type: 'integer',
      defaultsTo: 100
    },
    bonus: {
      type: 'integer',
      defaultsTo: 20
    },
    tests: {
      type: 'integer',
      required: true
    },
    category: {
      'type': 'string',
      enum: ['mathematics', 'string problems', 'graph theory', 'cryptography', 'others'],
      size: 20,
      required: true,
      defaultsTo: 'others'
    },
    submissions: {
      collection: 'submission',
      via: 'task'
    },
    input:{
      type: 'string',
      size:255
    },
    output:{
      type: 'string',
      size:255
    }
  }
};


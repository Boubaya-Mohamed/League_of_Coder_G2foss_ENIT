/**
 * Team.js
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
    name: {
      type: 'string',
      size: '30',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      size: '255',
      required: true
    },
    members: {
      type: 'string',
      size: '255'
    },
    score: {
      type: 'integer',
      defaultsTo: 0
    },
    submissions: {
      collection: 'submission',
      via: 'team'
    }
  }
};


/**
 * Submission.js
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
    points: {
      type: 'integer',
      defaultsTo: 0,
      required: true
    },
    completed: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },
    testCase: {
      type: 'integer',
      defaultsTo: 0,
      required: true
    },
    team: {
      model: 'team',
      required: true
    },
    task: {
      model: 'task',
      required: true
    }
  }
};


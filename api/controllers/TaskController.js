/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'documentation': function (req, res) {
    return res.view()
  },

  'rules': function (req, res) {
   res.locals.container = "containerLogin"
    return res.view()
  },
    'AboutUs': function (req, res) {
        res.locals.container = "containerLogin"
        return res.view('task/AboutUs') ;
    },

  'list': function (req, res) {
    if (!req.isSocket) {
      return res.view()
    }
    Task.find().populate('submissions').exec(function (err, tasks) {
      if (err)
        return res.serverError()
      return res.json(tasks)
    })
  },

  'show': function (req, res) {

    Task.findOne({id: req.param('id')}).populate('submissions', {team: req.session.authenticated.id}).exec(function (err, task) {
      if (err)
        return res.serverError()
      if (!task)
        return res.notFound('Task not found')
      res.locals.task = task
      return res.view()
    })
  },

  'home': function (req, res) {
    return res.view(null, {layout: 'layout2'})
  }
};


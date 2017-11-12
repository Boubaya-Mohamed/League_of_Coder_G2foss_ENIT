/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'index': function (req, res) {
    res.locals.container = "containerLogin"
    return res.view()
  },

  'login': function (req, res) {
    Team.findOne({
      name: req.param('name')
    }).exec(function (err, team) {
      if (err)
        return res.serverError()
      if (!team) {
        res.locals.errors =  "Bad parameters"
        return res.status(404).view('team/index')
      }
      if (team.password !== req.param('password')) {
        res.locals.errors =  "Bad password"
        return res.status(400).view('team/index')
      }

      req.session.authenticated = team

      return res.redirect('/tasks')
    })
  },

  'logout': function (req, res) {
    req.session.authenticated = false;
    return res.redirect('/login')
  },

  'scoreboard': function (req, res) {
    Team.find().sort('score DESC').exec(function(err, teams){
      if (err)
        return res.serverError()
      res.locals.teams = teams
      return res.view()


    })

  },

  'show': function(req, res) {
    Team.findOne({id: req.param('id')}).exec(function(err, team){
      if (err)
        return res.serverError()
      if (!team)
        return res.notFound('Team not found')
      res.locals.team = team
      return res.view()
    })
  },

  'list': function(req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    Team.find().sort('score DESC').exec(function(err, teams){
      if (err)
        return res.serverError()
      Team.subscribe(req, _.pluck(teams, 'id'))
      return res.json(teams)
    })
  }

};


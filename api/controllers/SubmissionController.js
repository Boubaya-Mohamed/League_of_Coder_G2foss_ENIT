/**
 * SubmissionController
 *
 * @description :: Server-side logic for managing submissions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var uuid = require('uuid')
var fs = require('fs')

module.exports = {
  'list': function(req, res){
    Submission.find({team: req.session.authenticated.id}).sort('createdAt DESC').populate('task').exec(function(err, submissions){
      if (err)
        return res.serverError()
      res.locals.submissions = submissions
      res.view()
    })
  },

  'submit': function (req, res) {
    console.log('submit')
    Task.findOne({id: req.param('id')}).populate('submissions', {team: req.session.authenticated.id}).exec(function (err, task) {
      if (err)
        return res.serverError()
      if (!task)
        return res.notFound('Task not found')

      console.log('test')
      var minPoints = 0
      task.submissions.forEach(function(submission){
        if(minPoints < submission.points)
          minPoints = submission.points

      })

      //on crée le fichier

      var fileName = uuid.v1()+".py"
      fs.writeFileSync('scripts/'+fileName, req.param('code'))

      //on effectue les tests

      async.map(_.range(task.tests), function (id, callback) {
          test(fileName, task.id+'/input-' + id + '.txt', task.id+'/output-' + id + '.txt').then(

            function () {
              callback(null, 1)
            }, function (err) {
              callback(null, 0)
            }

          )
        },
        function (err, results) {

          //on calcule le résultat des tests

          var nbGoodResponses = _.sum(results)
          var points = Math.round(nbGoodResponses/task.tests*task.points)

          var completed = nbGoodResponses == task.tests

          //si complete on vérifie si c'est la première fois que le task a été fini

          Submission.findOne({task: req.param('id'), completed: true}, function(err, submission){
            if(completed && !submission)
              points += task.bonus
              console.log('test1')


            //création de la soumission et update du score
console.log(points) ;
            console.log(minPoints) ;
            var pointsToAdd = points - minPoints
              console.log(pointsToAdd)
            if(pointsToAdd < 0)
              pointsToAdd = 0

            async.parallel({
              'updateTeam': function(){
                if(pointsToAdd == 0)
                  return
                Team.findOne({id:req.session.authenticated.id}, function(err, team){
                  team.score = team.score + pointsToAdd
                  team.save(function(){
                    Team.publishUpdate(team.id, pointsToAdd)
                      console.log('ok')
                  })
                })
              },
              'createSubmission': function(){
                Submission.create({points: points, team: req.session.authenticated.id, task: task.id, completed: completed}, function(err, submission){
                  return res.json({submission: submission, pointsToAdd: pointsToAdd, results: results})
                })
              }
            })

          })
          //
          // var submission = Submission.findOne({task: task.id, completed: true}, function(err, submission){
          //   if (err)
          //     return res.serverError()
          //   if(!submission){
          //     points += task.bonus
          //   }
          //
          //
          //
          //   var submission = Submission.create({
          //     points: points,
          //     team: req.session.authenticated.id,
          //     task: task.id,
          //     completed: task.tests == nbGoodResponses
          //   }, function (err, submission) {
          //     if (err)
          //       return res.serverError()
          //
          //     if(points >= minPoints){
          //
          //       Team.findOne({id: req.session.authenticated.id},function(err, team){
          //         if (err)
          //           return res.serverError()
          //         team.score = team.score + points - minPoints
          //
          //         team.save(function(err){
          //           if (err)
          //             return res.serverError()
          //           return res.json({'points': points})
          //         })
          //       })
          //     }
          //     return res.json({'points': points})
          //
          //   })
          // })


          // res.json(results)
        })


    })
  }
};


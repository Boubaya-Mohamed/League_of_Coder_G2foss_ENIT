const process = require('child_process')
const Promise = require('promise')

var test = function (scriptName, inputFile, outputFile) {

  return new Promise(function (resolve, reject) {
    console.log(scriptName, inputFile, outputFile)
    const spawn = process.spawnSync,
      fs = require('fs')

    var response = ''
    var input = fs.readFileSync("./inputs/"+inputFile)
   py = spawn('python', ["./scripts/"+scriptName], {input: input, timeout: 2000})

    if(py.status == 1){
        console.log('error')
        return reject(py.stderr)
    }
    
    if(py.error){
      console.log(py.error.code)
      return reject(py.error)
    }

    var output = fs.readFileSync("./outputs/"+outputFile)

    var pattern = new RegExp(output.toString())


    if (pattern.test(py.stdout)) {
      console.log('good response')
      return resolve('good response')
    }
    else {
      console.log('bad response')
      console.log(output.toString())
      console.log(py.stdout.toString())
      return reject('bad response')
    }
  })
}

module.exports = test

// test('script.py', 'input-2.txt', 'output-2.txt')
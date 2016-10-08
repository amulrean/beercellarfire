var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('port', 3000);

var API_KEY = process.argv[2];

if (API_KEY === undefined || API_KEY.length <= 0) {
  console.log("Please provide the brewery db apikey as the first argument");

  console.log("EX: $ node server/server.js 123key");

} else {


  function processData(req) {
    var context = {};
    context.method = req.method;
    //method type saved
    context.qParams = [];
    console.log(req.query);
    //query parameters
    for (var p in req.query) {
      context.qParams.push({
        'name': p,
        'value': req.query[p]
      });
    }
    return context;
  }

  app.use(function (req, res, next) {
    // Website sending requests
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request method that you are allowing (we are using GET)
    res.setHeader('Access-Control-Allow-Methods', 'GET');
// Request header types that are allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// The following is set to false since we won't be addressing cookies and sessions
    res.setHeader('Access-Control-Allow-Credentials', false);
// Proceed to the next layer of middleware
    next();
  });


  app.get('/', function (req, res, next) {
    var userInput = processData(req);
    request("https://api.brewerydb.com/v2/search?key=" + API_KEY + "&type=beer&q=" + userInput.qParams[0].value,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // console.log(body);
          res.send(body);
        }
      });
  });


  app.listen(app.get('port'), function () {
    console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
  });
}

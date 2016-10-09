var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('port', 8080);

var BREWERY_DB_BASE_URL = 'https://api.brewerydb.com/v2';

var API_KEY = process.env.BREWERYDB_API_KEY;
var ALLOW_DOMAIN = process.env.ALLOW_DOMAIN;

if (API_KEY === undefined || API_KEY.length <= 0) {
  console.log("Please provide the brewery db by exporting it");

  console.log("EX: $ export BREWERYDB_API_KEY=123key");

} else if (API_KEY === undefined || API_KEY.length <= 0) {
  console.log("Please provide allowed CORS domain by exporting");

  console.log("EX: $ export ALLOW_DOMAIN=example.com");

} else {


  function processData(req) {
    var context = {};
    context.method = req.method;
    //method type saved
    context.qParams = [];
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
    res.setHeader('Access-Control-Allow-Origin', ALLOW_DOMAIN);
    // Request method that you are allowing (we are using GET)
    res.setHeader('Access-Control-Allow-Methods', 'GET');
// Request header types that are allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// The following is set to false since we won't be addressing cookies and sessions
    res.setHeader('Access-Control-Allow-Credentials', false);
// Proceed to the next layer of middleware
    next();
  });


  // Completely pass through url to brwery db but add in the Api key
  app.get('/*', function (req, res, next) {

    // var userInput = processData(req);

    var request_url = BREWERY_DB_BASE_URL;
    request_url += req.originalUrl;
    request_url += "&key=" + API_KEY;

    request(request_url,
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        } else {
          console.log('Error for request: ' + req.originalUrl);
          console.log(body);
          res.status(response.statusCode).send(body);
        }
      });
  });


  app.listen(app.get('port'), function () {
    console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
  });
}

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  // Add to PUG on a later version?
  //  res.render('index', { title: 'Express' });
  response.write(
      '<!DOCTYPE html> \n' +
      '<html lang="en"> \n' +
      '        <head> \n' +
      '               <meta charset="utf-8"> \n' +
      '               <meta http-equiv="X-UA-Compatible" content="IE=edge"> \n' +
      '               <meta name="viewport" content="width=device-width, initial-scale=1"> \n' +
      '               <meta name="description" content="Home Page"> \n' +
      '               <meta name="author" content="Carlos Arias"> \n' +
      '               <script type="text/javascript" src="/javascripts/buses.js"></script>' +
      ' \n' +
      '               <title>Client Side Example</title> \n' +
      '               <!-- Bootstrap core CSS --> \n' +
      '               <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"> \n' +
      '       </head> \n' +
      '        <body> \n' +
      '               <div class="container" style="text-align: center"> \n' +
      '               <h1>Client Side Example</h1><br> \n'
  );
  let currentDate = new Date();
  response.write(
      '               <p>Current time is: ' + currentDate + '</p>\n\n'
  );
  response.write(
      '				<div class="form-group"> \n' +
      '					<label for="stopId">Select Bus Stop ID:</label> \n' +
      '					<select class="form-control" id="stopId"> \n'
  );


  response.write(
      '					</select> <br>\n' +
      '					<button type="button" class="btn btn-primary form-control" onclick="QueryNextBuses()">Next Buses</button> \n' +
      '				</div> <br> \n'
  );
  response.write(
      '               <div class="jumbotron" id="output"> </div>\n'
  );
  response.write(
      '       </body> \n' +
      '</html> \n'
  );
  response.end();
});

module.exports = router;
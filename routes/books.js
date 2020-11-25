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
        '               <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>\n' +
        '               <script type="text/javascript" src="/javascripts/books.js"></script>' +
        ' \n' +
        '               <title>Client Side Example</title> \n' +
        '               <!-- Bootstrap core CSS --> \n' +
        '               <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"> \n' +
        '               <link rel="stylesheet" type="text/css" href="../stylesheets/style.css"> \n' +
        '       </head> \n' +
        '        <body> \n' +
        '               <div class="container"> \n' +
                '               <h1>Add New Book</h1><br> \n' +
                '               <form id="newBookForm"> \n' +
        '                           <div class="form-group">\n' +
        '                               <label for="isbnNew">ISBN</label>\n' +
        '                               <input class="form-control" name="ISBN" id="isbnNew">\n' +
        '                           </div> \n' +
        '                           <div class="form-group">\n' +
        '                               <label for="titleNew">Title</label>\n' +
        '                               <input class="form-control" name="name" id="titleNew">\n' +
        '                           </div> \n' +
        '                           <div class="form-group">\n' +
        '                               <label for="authorNew">Author</label>\n' +
        '                               <input class="form-control" name="author" id="authorNew">\n' +
        '                           </div> \n' +
        '                           <div class="form-group">\n' +
        '                               <label for="priceNew">Price</label>\n' +
        '                               <input class="form-control" name="price" id="priceNew">\n' +
        '                           </div> \n' +
        '                           <button type="button" class="btn btn-primary" onclick="postNewBook()">Submit</button>\n' +
        '                      </form>\n' +
        '               </div>\n' +
        '     </body>\n'
    );
    response.end();
});

module.exports = router;
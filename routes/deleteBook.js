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
        '               <title>All Book Functions</title> \n' +
        '               <!-- Bootstrap core CSS --> \n' +
        '               <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"> \n' +
        '               <link rel="stylesheet" type="text/css" href="../stylesheets/style.css"> \n' +
        '               <link rel="stylesheet" type="text/css" href="../stylesheets/tableNoControl.css"> \n' +
        '       </head> \n' +
        '        <body> \n' +'<ul class="nav">\n' +
        '    <li class="nav-item">\n' +
        '        <a class="nav-link" href="/">Home</a>\n' +
        '    </li>\n' +
        '    <li class="nav-item">\n' +
        '        <a class="nav-link" href="books">Books</a>\n' +
        '    </li>\n' +
        '    <li class="nav-item">\n' +
        '        <a class="nav-link" href="addBook">Add a Book</a>\n' +
        '    </li>\n' +
        '    <li class="nav-item">\n' +
        '        <a class="nav-link" href="showBooks">List of Books</a>\n' +
        '    </li>\n' +
        '    <li class="nav-item">\n' +
        '        <a class="nav-link" href="updateBook">Update Book</a>\n' +
        '    </li>\n' +
        '    <li class="nav-item">\n' +
        '        <a class="nav-link" href="findBook">Find Book</a>\n' +
        '    </li>\n' +
        '    <li class="nav-item">\n' +
        '        <a class="nav-link" href="deleteBook">Delete Book</a>\n' +
        '    </li>\n' +
        '</ul>' +
        '               <div class="container"> \n' +
    '                   <h1>Search for Book</h1><br> \n' +
    '                      <div class="form-group">\n' +
    '                           <label for="searchByISBN">Search by ISBN</label>\n' +
    '                           <input class="form-control" name="ISBN" id="searchByISBN">\n' +
    '                           <button type="button" class="btn btn-primary" onclick="searchByISBN()">Search</button>\n' +
    '                           <small id="isbnSearchWarning" class="form-text formWarning">* Please enter a valid isbn</small>\n' +
    '                           <small id="unusedISBNWarning" class="form-text formWarning">* There are no books with this ISBN in the database</small>\n' +
    '                      </div> \n' +
        '               </div>\n' +
        '               <div id="output"    ></div> \n' +
        '               <div class="center"> \n' +
        '                   <button type="button" class="btn btn-primary" id="deleteButton" onclick="deleteThis(1)">Delete This Book</button>\n' +
        '               </div>\n' +
        '     </body>\n'
    );
    response.end();
});

module.exports = router;
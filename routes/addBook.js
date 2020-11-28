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
        '               <title>Add Book</title> \n' +
        '               <!-- Bootstrap core CSS --> \n' +
        '               <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"> \n' +
        '               <link rel="stylesheet" type="text/css" href="../stylesheets/style.css"> \n' +
        '       </head> \n' +
        '        <body> \n' +
                    '<ul class="nav">\n' +
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
        '                   <h1>Add New Book</h1><br> \n' +
        '                   <form id="newBookForm"> \n' +
        '                           <div class="form-group">\n' +
        '                               <label for="isbnNew">ISBN</label>\n' +
        '                               <input class="form-control" name="ISBN" id="isbnNew">\n' +
        '                               <small id="isbnFormWarning" class="form-text formWarning">* Please enter a valid ISBN</small>\n' +
        '                               <small id="usedISBNWarning" class="form-text formWarning">* There is already a book with this ISBN in the database</small>\n' +
        '                           </div> \n' +
        '                           <div class="form-group">\n' +
        '                               <label for="titleNew">Title</label>\n' +
        '                               <input class="form-control" name="name" id="titleNew">\n' +
        '                               <small id="titleFormWarning" class="form-text formWarning">* Please enter a title</small>\n' +
        '                           </div> \n' +
        '                           <div class="form-group">\n' +
        '                               <label for="authorNew">Author</label>\n' +
        '                               <input class="form-control" name="author" id="authorNew">\n' +
        '                               <small id="authorFormWarning" class="form-text formWarning">* Please enter an author ISBN</small>\n' +
        '                           </div> \n' +
        '                           <div class="form-group">\n' +
        '                               <label for="priceNew">Price</label>\n' +
        '                               <input class="form-control" name="price" id="priceNew">\n' +
        '                               <small id="priceFormWarning" class="form-text formWarning">* Please enter a price</small>\n' +
        '                           </div> \n' +
        '                           <div class="form-group button-holder">\n' +
        '                               <button type="button" class="btn btn-primary" onclick="validateNewBook()">Submit</button>\n' +
        '                           </div> \n' +
        '                      </form>\n' +
        '               </div>\n' +
        '               <div id="output"    ></div> \n' +
        '     </body>\n'
    );
    response.end();
});

module.exports = router;
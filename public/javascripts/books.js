
var usedISBNs = [];

$(document).ready(function (){
    getArray(usedISBNs);
})
function postNewBook(isbn, author, price, title){
    let newBook = "ISBN=" + isbn + "&price=" + price + "&name=" + title + "&author=" + author;
    console.log(newBook);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ReceivedCallback() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Book added to database");
            let nextOpen = usedISBNs.length + 1;
            usedISBNs[nextOpen] = isbn;
            document.getElementById("newBookForm").reset();
            //document.getElementById("output").innerHTML = CreateTable(JSON.parse(this.responseText));
        }
        else{
            console.log(this.responseText);
            console.log(this.statusText);
        }
    };
    xhttp.open("POST", "https://glacial-spire-25206.herokuapp.com/api/books", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(newBook);

}

function getBooks(urlEnd){
    document.getElementById("output").innerHTML = "";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ReceivedCallback() {
        if(window.location.href.indexOf("updateBook") == -1){
            if (this.readyState == 4 && this.status == 200) {
                if(window.location.href.indexOf("deleteBook") != -1){
                    $("#deleteButton").show();
                }
                document.getElementById("output").innerHTML = CreateTable(JSON.parse(this.responseText));
            }
            else if(this.readyState == 4 && urlEnd == ""){
                document.getElementById("output").innerHTML = "<h2>There are no books in the database.</h2>";
            }
            else if(this.readyState == 4 && urlEnd[0] == "/"){
                document.getElementById("output").innerHTML = "<h2>There are no books with the given ISBN in the database.</h2>";
            }
            else if(this.readyState == 4 && urlEnd[0] == "?"){
                document.getElementById("output").innerHTML = "<h2>There are no books by the given author in the database.</h2>";
            }
        }
        else if(this.readyState == 4 && this.status == 200){
            fillUpdateForm(JSON.parse(this.responseText));
        }
        else if(this.readyState == 4 && this.status == 404){
            $("#unusedISBNWarning").show();
        }
    };
    xhttp.open("GET", "http://localhost:5000/api/books" + urlEnd , true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}

function getArray(usedISBNs){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ReceivedCallback() {
        if (this.readyState == 4 && this.status == 200) {
           let count = 0;
           let data = JSON.parse(this.responseText);
           for(let book in data){
                usedISBNs[count] = data[book]["ISBN"];
                count++;
           }
           console.log(usedISBNs);
        }
    };
    xhttp.open("GET", "https://glacial-spire-25206.herokuapp.com/api/books", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}

function validateRow(rowNumber){
    let row = $("#bookList").children("tbody").children("tr:nth-child(" + rowNumber + ")");
    let newISBN = row.find(".isbnInput").val();
    let isbn = row.find(".isbnOriginal").text();
    let author = row.find(".authorInput").val();
    let price = row.find(".priceInput").val();
    let title = row.find(".titleInput").val();
    let used = checkISBN(newISBN);

    if(!isbn || !author || !price || !title){
        alert("Please fill all fields for the updated book");
    }
    else if(used && isbn.valueOf() != newISBN.valueOf()){
        alert("The new ISBN belongs to another book in the database");
    }
    else if(!checkISBN(newISBN)){
        alert("Please enter a valid ISBN")
    }
    else{
        patchThis(isbn, newISBN, price, title, author, rowNumber);
    }
}

function patchThis(isbn, newISBN, price, title, author, rowNumber){
    let newBook = "ISBN=" + newISBN + "&price=" + price + "&name=" + title + "&author=" + author;
    console.log(newBook);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ReceivedCallback() {
        if (this.readyState == 4 && this.status == 200) {
            if(isbn.valueOf() != newISBN.valueOf()){
                replaceISBN(isbn, newISBN);
            }
            if(rowNumber != -1){
                updateRow(newISBN,author,price,title,rowNumber);
            }
            else{
                alert("Book added to database");
                document.getElementById("updateBookForm").reset();
            }
        }
    };
    xhttp.open("PATCH", "https://glacial-spire-25206.herokuapp.com/api/books/" + isbn, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(newBook);
}

function deleteThis(rowNumber){
    let row = $("#bookList").children("tbody").children("tr:nth-child(" + rowNumber + ")");
    let isbn = row.find(".isbnOriginal").text();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ReceivedCallback() {
        if (this.readyState == 4 && this.status == 200) {
            row.hide();
            alert("This book has been deleted");
            for(let i in usedISBNs){
                let thisISBN = usedISBNs[i].toString();
                if(isbn.valueOf() == thisISBN.valueOf()){
                    usedISBNs[i] = "";
                }
            }
        }
    };
    xhttp.open("DELETE", "https://glacial-spire-25206.herokuapp.com/api/books/" + isbn, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}

function updateRow(isbn, author, price, title, rowNumber){
    let row = $("#bookList").children("tbody").children("tr:nth-child(" + rowNumber + ")");

    row.find("span.isbnOriginal").text(isbn);
    row.find("span.authorOriginal").text(author);
    row.find("span.priceOriginal").text(price);
    row.find("span.titleOriginal").text(title);
    $("#checkbox" + rowNumber ).prop("checked", false);
    setRow(rowNumber);
    alert("This book has been updated.");
}

function setRow(rowNumber){
    let checked = $("#checkbox" + rowNumber ).prop("checked");
    let row = $("#bookList").children("tbody").children("tr:nth-child(" + rowNumber + ")");
    if(checked){
        console.log($("#bookList").children("tbody").children("tr:nth-child(" + rowNumber + ")").find(".tableData"));
        row.find(".tableData").hide();
        row.find(".updateBook").show();
    }
    else {
        row.find(".tableData").show();
        row.find(".updateBook").hide();
    }
}

function CreateTable(data){
    let retVal = '';
    retVal =
        '<h2>Books in Database</h2> \n' +
        '<table class="table table-bordered table-hover" id="bookList"> \n' +
        '	<thead> \n' +
        '		<tr> \n' +
        '			<th scope="col">ISBN</th> \n' +
        '			<th scope="col">Author</th> \n' +
        '			<th scope="col">Title</th> \n' +
        '			<th scope="col">Price</th> \n' +
        '			<th scope="col">Control</th> \n' +
        '		</tr> \n' +
        '	</thead> \n' +
        '	<tbody> \n';
    let rowCount = 0;
    for (let book in data){
        rowCount++;
        retVal +=
            '<tr> \n' +
            '	<td> \n' +
            '       <span class="tableData isbnOriginal">' + data[book]["ISBN"] + '</span>\n' +
            '       <input class="isbnInput updateBook" value="' + data[book]["ISBN"] + '"> \n' +
            '   </td> \n' +
            '	<td>\n' +
            '       <span class="tableData authorOriginal">' + data[book]["author"] + '</span>\n' +
            '       <input class="authorInput updateBook" value="' + data[book]["author"] + '"> \n' +
            '   </td> \n' +
            '	<td>\n' +
            '       <span class="tableData titleOriginal">' + data[book]["name"] + '</span>\n' +
            '       <input class="titleInput updateBook" value="' + data[book]["name"] + '"> \n' +
            '   </td> \n' +
            '	<td> \n' +
            '       <span class="tableData priceOriginal">' + data[book]["price"] + '</span>\n' +
            '       <input class="priceInput updateBook" value="' + data[book]["price"] + '"> \n' +
            '   </td> \n' +
            '	<td> \n' +
            '       <input type="checkbox" id="checkbox' + rowCount+'" onchange="setRow(' + rowCount + ')">\n' +
            '       <label for="checkbox' + rowCount+'" class="tableData">Modify this book</label>\n' +
            '       <input type="button" class="updateBook" value="Update" onclick="validateRow(' + rowCount + ')"> \n' +
            '       <input type="button" class="updateBook" value="Delete" onclick="deleteThis(' + rowCount + ')"> \n' +
            '   </td> \n' +
            '</tr> \n';

    }
    retVal +=
        '</tbody> \n' +
        '</table> \n'
    return retVal;
}

function checkISBN(isbn){
    let numbers = [];
    let allNumbers = true;
    let isbnValid = false;
    console.log(isbn);
    let count = 0;
    for(let i = 0; i < isbn.length; i++){
        let thisChar = isbn[i];
        if(thisChar >= '0' && thisChar <= '9'){
            numbers[count] = parseInt(thisChar);
            count++;
        }
        else if(thisChar == '-'){
        }
        else{
            allNumbers = false;
        }
    }
    console.log(numbers);
    console.log(allNumbers);
    if(count == 13) {
        if (allNumbers) {
            let sum = 0;
            for (let i = 0; i < 13; i++) {
                if (i % 2 == 0) {
                    sum += numbers[i];
                } else {
                    sum += 3 * numbers[i];
                }
            }
            if (sum % 10 == 0) {
                isbnValid = true;
            }
        }
    }
    else if(count == 10){
        if(allNumbers){
            let sum = 0;
            for(let i = 0; i < 10; i++){
                sum += (10 - i)*numbers[i];
            }
            if(sum%11 == 0){
                isbnValid = true;
            }
        }
    }
    return isbnValid;
}

function validateNewBook(){
    let isbn = $("#isbnNew").val();
    isbn = isbn.toString();
    let author = $("#authorNew").val();
    let price = $("#priceNew").val();
    let title = $("#titleNew").val();
    let isbnValid = checkISBN(isbn);
    let used = checkISBNUsed(isbn);
    if(author == ""){
        $("#authorFormWarning").show();
    }
    else{
        $("#authorFormWarning").hide();
    }
    if(price == ""){
        $("#priceFormWarning").show();
    }
    else{
        $("#priceFormWarning").hide();
    }
    if(title == ""){
        $("#titleFormWarning").show();
    }
    else{
        $("#titleFormWarning").hide();
    }
    if(!isbnValid){
        $("#isbnFormWarning").show();
    }
    else{
        $("#isbnFormWarning").hide();
    }
    if(used){
        $("#usedISBNWarning").show();
    }
    else {
        $("#usedISBNWarning").hide();
    }
    if(!used && isbnValid && author != "" && price != "" && title != ""){
        postNewBook(isbn, author, price, title);
    }
}

function checkISBNUsed(isbn){
    let used = false;
    for(let i in usedISBNs){
        let thisISBN = usedISBNs[i].toString();
        if(isbn.valueOf() == thisISBN.valueOf()){
            console.log(isbn);
            used = true;
        }
    }
    return used;
}

function searchByISBN(){
    $("#isbnSearchWarning").hide();
    $("#authorSearchWarning").hide();
    let isbn = $("#searchByISBN").val();
    let isbnValid = checkISBN(isbn);
    if(isbnValid){
        let urlEnd = "/" + isbn;
        getBooks(urlEnd);
    }
    else{
        $("#isbnSearchWarning").show();
    }
}

function searchByAuthor(){
    $("#authorSearchWarning").hide();
    $("#isbnSearchWarning").hide();
    let author = $("#searchByAuthor").val();
    if(author != ""){
        let urlEnd = "?author=" + author;
        getBooks(urlEnd);
    }
    else{
        $("#authorSearchWarning").show();
    }
}

function replaceISBN(isbn, newISBN){
    if(isbn.valueOf() != newISBN.valueOf()){
        for(let i in usedISBNs){
            let thisISBN = usedISBNs[i].toString();
            if(isbn.valueOf() == thisISBN.valueOf()){
                usedISBNs[i] = newISBN;
            }
        }
    }
}
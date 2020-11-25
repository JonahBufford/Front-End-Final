function postNewBook(){
    let isbn = $("#isbnNew").val();
    let author = $("#authorNew").val();
    let price = $("#priceNew").val();
    let title = $("#titleNew").val();
    let newBook = new FormData();
    newBook.append("ISBN", isbn);
    newBook.append("name", title);
    newBook.append("author", author);
    newBook.append("price", price);
    console.log(newBook);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ReceivedCallback() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("newBookForm").reset();
            //document.getElementById("output").innerHTML = CreateTable(JSON.parse(this.responseText));
        }
        else{
            console.log(this.statusText);
        }
    };
    xhttp.open("POST", "https://glacial-spire-25206.herokuapp.com/api/books", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(newBook);

}
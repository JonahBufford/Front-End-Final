function fillUpdateForm(data){
    $("#unusedISBNWarning").hide();
    $("#originalISBN").val(data[0]["ISBN"]);
    $("#isbnUpdate").val(data[0]["ISBN"]);
    $("#priceUpdate").val(data[0]["price"]);
    $("#titleUpdate").val(data[0]["name"]);
    $("#authorUpdate").val(data[0]["author"]);
    $("#updateBookForm").show();
}

function validateUpdateForm(){
    console.log("validated");
    let newISBN = $("#isbnUpdate").val();
    let isbn = $("#originalISBN").val();
    isbn = isbn.toString();
    let author = $("#authorUpdate").val();
    let price = $("#priceUpdate").val();
    let title = $("#titleUpdate").val();
    let isbnValid = checkISBN(isbn);
    console.log("ISBN Valid:");
    console.log(isbnValid);
    let used = checkISBNUsed(newISBN);
    console.log("ISBN used:");
    console.log(used);
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
    if(used && newISBN.valueOf() != isbn.valueOf()){
        $("#usedISBNWarning").show();
    }
    else{
        $("#usedISBNWarning").hide();
    }
    if(!used && isbnValid && author != "" && price != "" && title != ""){
        console.log("patching");
        patchThis(isbn, newISBN, price, title, author, -1);
    }
}
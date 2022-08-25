var nameInput = document.getElementById("productName");
var catInput = document.getElementById("productCategory");
var priceInput = document.getElementById("productPrice");
var descInput = document.getElementById("productDescription");
var searchInput = document.getElementById("search");
var tbody = document.getElementById("tbody");
var button = document.getElementById("button");
var products = [];
var currentIndex = 0;

if (localStorage.getItem("All products") != null) {
  products = JSON.parse(localStorage.getItem("All products"));
  displayProducts();
}



//  add function _________________________________________________________________________________

function addProduct() {

  if( validationName() && validationprice() && validationCat() ){
    if (button.innerHTML == "add product" ) {
      var product = {
        productName: nameInput.value,
        productCat: catInput.value,
        productPrice: priceInput.value,
        productDesc: descInput.value,
      };
  
      products.push(product);
      localStorage.setItem("All products", JSON.stringify(products));
      console.log(products);
      clearForm();
      displayProducts();
    }
  
    else {
      save()
    }

  }

  
}


//   clear function ___________________________________________________________________________________

function clearForm() {
  nameInput.value = "";
  catInput.value = "";
  priceInput.value = "";
  descInput.value = "";
  document.getElementById("namespan").innerHTML="ProductName should start with Captail letter";
  document.getElementById("namespan").style.color="#212529";
  document.getElementById("pricespan").innerHTML="Price should be between 1000 to 10000";
  document.getElementById("pricespan").style.color="#212529";
}



//  display function  __________________________________________________________________________________

function displayProducts() {
  var trs = "";

  for (var i = 0; i < products.length; i++) {
    trs += `<tr>
        <td>${i}</td>
        <td>${products[i].productName}</td>
        <td>${products[i].productCat}</td>
        <td>${products[i].productPrice}</td>
        <td>${products[i].productDesc}</td>
        <td>
            <button class="btn btn-secondary" onclick="editProduct(${i})"><i class="fas fa-edit"></i>Edit</button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct(${i})"><i class="fas fa-trash"></i>Delete</button>
        </td>

    </tr>`;
  }

  tbody.innerHTML = trs;
}

//  delete function  _____________________________________________________________________


function deleteProduct(x) {
  products.splice(x, 1);
  displayProducts();
  localStorage.setItem("All products", JSON.stringify(products));
}

//  update function  _________________________________________


function editProduct(y) {
  currentIndex = y;
  button.innerHTML = "Edit Product";
  nameInput.value = products[y].productName;
  priceInput.value = products[y].productPrice;
  catInput.value = products[y].productCat;
  descInput.value = products[y].productDesc;
}

function save() {
  products[currentIndex].productName = nameInput.value;
  products[currentIndex].productPrice = priceInput.value;
  products[currentIndex].productCat = catInput.value;
  products[currentIndex].productDesc = descInput.value;
  localStorage.setItem("All products", JSON.stringify(products));
  displayProducts();
}

//   search function  _______________________________________________________

function search() {
  var str = "";
  // console.log(searchInput.value)
  for (var i = 0; i < products.length; i++) {
    if (products[i].productName.toLowerCase().includes(searchInput.value.toLowerCase())) {
      str += `<tr>
                  <td>${i}</td>
                  <td>${products[i].productName.toLowerCase().replace(searchInput.value ,`<span style="background-color:yellow">${searchInput.value}</span>`)}</td>
                  <td>${products[i].productCat}</td>
                  <td>${products[i].productPrice}</td>
                  <td>${products[i].productDesc}</td>
                  <td>
                      <button class="btn btn-secondary" onclick="editProduct(${i})"><i class="fas fa-edit"></i>Edit</button>
                  </td>
                  <td>
                      <button class="btn btn-danger" onclick="deleteProduct(${i})"><i class="fas fa-trash"></i>Delete</button>
                  </td>
          
              </tr>`;
    }

    tbody.innerHTML = str;
  }

}


//validation products ________________________________________________________


function validationName(){

  var nameRegex =/^[A-Z][a-zA-Z ]{3,11}$/
  if(nameRegex.test(nameInput.value) && nameInput.value !=""){
    return true;
  }

  else {
    document.getElementById("namespan").innerHTML="you should start with captial letter";
    document.getElementById("namespan").style.color="red"

  }
}


function validationprice(){

  var priceRegex =/^([1-9][0-9]{3}|10000)$/
  if(priceRegex.test(priceInput.value)&& priceInput.value !=""){
    return true
  }
  else{
    document.getElementById("pricespan").innerHTML="you should insrt between 1000 to 10000";
    document.getElementById("pricespan").style.color="red"
  }

}

function validationCat(){

  var desRegex =/^(mobile|tv|)$/
  
  if(desRegex.test(catInput.value.toLowerCase())&& catInput.value !=""){
    return true
  }
  else {
    document.getElementById("catSpan").innerHTML="you should insert mobile or tv";
    document.getElementById("catSpan").style.color="red"
  }
}


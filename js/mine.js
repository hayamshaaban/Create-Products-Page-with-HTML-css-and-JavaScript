var productNameInp=document.getElementById("productName");
var currentIndex=0;
var productPriceInp=document.getElementById("productPrice");
var productCompanyInp=document.getElementById("productCompany");
var productDescInp=document.getElementById("productDesc");
var addBtn=document.getElementById("addBtn");
var productsContainer;
var searchInp=document.getElementById("searchInp");
var alertContainer=document.getElementById("alertContainer");
if(localStorage.getItem("productsContainer")==null)
{
    productsContainer=[];
}
else{
    productsContainer =JSON.parse( localStorage.getItem("productsContainer"));
    displayData();
}


searchInp.onkeyup=function()
{
    searchProduct(searchInp.value);
}
function searchProduct(term){
    var searchResult="";
    for(var i=0;i<productsContainer.length;i++)
    {
        if(productsContainer[i].name.includes(term)==true)
        {
            searchResult +='<div class="col-md-4 "><div class="py-3 text-center"><div><h5 id="productName">'+productsContainer[i].name+'</h5>\<h6 class="card-price" id="productPrice">'+productsContainer[i].price+'</h6>\<h6 class="card-company" id="productCompany">'+productsContainer[i].company+'</h6><p class="card-text" id="productDesc">'+productsContainer[i].desc+'</p><button class="btn btn-info mr-2">Update</button><button class="btn btn-danger">Delete</button></div></div></div>';
        }
    }
    document.getElementById("rowResult").innerHTML =searchResult;
}


addBtn.onclick=function()
{
    if(validatform()==true)
    {
       if(addBtn.innerHTML=="Add Product")
        {
            addProduct();
            displayData();
            clearform();
        }
      
    
       else{
        upadteProduct();
        displayData();
        clearform();
       
    }
  }
}
function addProduct()
{
    var product={
        name:productNameInp.value,
        price:productPriceInp.value,
        company:productCompanyInp.value,
        desc:productDescInp.value
    }
   productsContainer.push(product);
   localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
}
function setForm(i)
{
productNameInp.value=productsContainer[i].name;
productPriceInp.value=productsContainer[i].price;
productCompanyInp.value=productsContainer[i].company;
productDescInp.value=productsContainer[i].desc;
addBtn.innerHTML="update product";
currentIndex=i;
}


function upadteProduct()
{
    productsContainer[currentIndex].name=productNameInp.value;
    productsContainer[currentIndex].price=productPriceInp.value;
    productsContainer[currentIndex].company=productCompanyInp.value;
    productsContainer[currentIndex].desc=productDescInp.value;
    addBtn.innerHTML="Add Product";
    localStorage.setItem("productsContainer",JSON.stringify(productsContainer));

}


function validatform()
{
    var errors="";
    var nameregex=/^[A-Z][a-z]{2,25}$/;
    var priceregex=/^[1-9][0-9]{2,5}$/;
    if(nameregex.test(productNameInp.value)==false)
    {
        alertContainer.style.display="block";
        errors+="<P>products must start with caps letter</p>"
        alertContainer.innerHTML=errors;

    }
    if(priceregex.test(productPriceInp.value)==false)
    {
        alertContainer.style.display="block";
        errors+="<P>products must betweent 10-10.000</p>"
        alertContainer.innerHTML=errors;

    }
 
    if(errors.length>0)
{
    return false;
}else
{
    alertContainer.style.display="none";
    return true;
}

}

function displayData()
{
    var cols="";
    for (var i=0; i<productsContainer.length;i++)
    {
        cols +='<div class="col-md-3"><div class="products" style="width: 18rem;"><div class="card-body"><h4 class="card-title" id="productName">'+productsContainer[i].name+'</h4>\<h6 class="card-price" id="productPrice">'+productsContainer[i].price+'</h6>\<h6 class="card-company" id="productCompany">'+productsContainer[i].company+'</h6><p class="card-text" id="productDesc">'+productsContainer[i].desc+'</p><button  onclick="setForm('+i+')" class="btn btn-info mr-2">Update</button><button onclick="deleteProduct('+i+')" class="btn btn-danger">Delete</button></div></div></div>';
    }
    document.getElementById("rowData").innerHTML=cols;
}


function deleteProduct(id)
{

productsContainer.splice(id ,1);
localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
displayData();
}

function clearform()
{
    var inputs=document.getElementsByClassName("form-control");
    for( var i=0;i<inputs.length;i++)
    {
        inputs[i].value="";
    }
}

 //char remaining
$(function(){
    let max=200;
    $('textarea').keyup(function(){
    let length= $(this).val().length;
    let remainChara=max-length;
    $("#char").text(remainChara);
    });
    
    })
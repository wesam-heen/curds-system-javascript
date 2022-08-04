let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let index;
//get total 
function getTotal(){
    if(price.value !=""){
        let result=(+price.value+ +taxes.value + +ads.value);
        result=result- result * +discount.value/100;
        total.innerHTML=result;
        total.style.backgroundColor='#040'
    }else{
        total.innerHTML='';
        total.style.backgroundColor= '#f34dc3'
    }
}
//create product
// array for save my data , data type object contain all my data 
let dataPro;
if(localStorage.products != null){
    dataPro=JSON.parse(localStorage.products)
}else{
    dataPro=[];
}
submit.onclick=function(){
    //أحتاج لتجميع بيانات المنتج الواحد داخل اوبجكت
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }


if(title.value!=''
 && price.value!='' 
 && category.value!=''
 &&newPro.count <100){
    if(mood==='create'){
        if(newPro.count>1){
            for(let i=0;i<newPro.count;i++){
              dataPro.push(newPro);   
            }
       }else{
        dataPro.push(newPro);
       }
    }else{
    dataPro[index]=newPro;
    mood='create';
    submit.innerHTML='Create';
    count.style.display='block'
    }
    clearData();
}

    //save in localstorage
    localStorage.setItem('products',JSON.stringify(dataPro))
   
    showData();
}
//clear inputs
function clearData(){

    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
//read
function showData(){
    getTotal();
let table='';
for(let i=0;i<dataPro.length;i++){
    table+=`
    <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}$</td>
    <td>${dataPro[i].taxes}$</td>
    <td>${dataPro[i].ads}$</td>
    <td>${dataPro[i].discount}%</td>
    <td>${dataPro[i].total}$</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i })" id="update">updata</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
 
}
   document.getElementById('tbody').innerHTML=table;
  let delet=document.getElementById('deleteAll');
   if(dataPro.length>0){
    delet.innerHTML=`<button onclick='deleteAll()'>Delete All (${dataPro.length})</button>`

   }else{
    delet.innerHTML='';
   }
}
showData();
//delete
function deleteData(i){
dataPro.splice(i,1);
localStorage.products=JSON.stringify(dataPro);
showData();
}
//delete All
function deleteAll(){

    localStorage.clear();
    dataPro.splice(0);
    showData();
}
//update
function updateData(i){

    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none'
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    mood='update';
    index=i;
    scroll({
        top:0,
        behavior:"smooth",

    })
}
//search
let searchMood='title';
function getSearchMood(id){
    let search=document.getElementById('search');
id=='searchByTitle'?searchMood='title':searchMood='category';
search.placeholder= `Search By ${searchMood} `;
search.focus();
search.value='';
showData();
}
function searchData(value){
    let table='';
    for(let i=0;i<dataPro.length;i++){
    if(searchMood=='title'){
       
            if(dataPro[i].title.includes(value.toLowerCase())){
                table+=`
                <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}$</td>
                <td>${dataPro[i].taxes}$</td>
                <td>${dataPro[i].ads}%</td>
                <td>${dataPro[i].discount}$</td>
                <td>${dataPro[i].total}$</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i })" id="update">updata</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
        
    }else{
       
            if(dataPro[i].category.includes(value.toLowerCase())){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}$</td>
                <td>${dataPro[i].taxes}$</td>
                <td>${dataPro[i].ads}%</td>
                <td>${dataPro[i].discount}$</td>
                <td>${dataPro[i].total}$</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i })" id="update">updata</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
            
        

    }
    }
    document.getElementById('tbody').innerHTML=table;
}

//clean data
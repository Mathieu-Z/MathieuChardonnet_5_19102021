const products = [
  {
    "colors": ["Blue", "White", "Black"],
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "kanap01.jpeg",
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
  },
  {
    "colors": ["Black/Yellow", "Black/Red"],
    "_id": "415b7cacb65d43b2b5c1ff70f3393ad1",
    "name": "Kanap Cyllène",
    "price": 4499,
    "imageUrl": "kanap02.jpeg",
    "description": "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
    "altTxt": "Photo d'un canapé jaune et noir, quattre places"
  },
  {
    "colors": ["Green", "Red", "Orange"],
    "_id": "055743915a544fde83cfdfc904935ee7",
    "name": "Kanap Calycé",
    "price": 3199,
    "imageUrl": "kanap03.jpeg",
    "description": "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    "altTxt": "Photo d'un canapé d'angle, vert, trois places"
  },
  {
    "colors": ["Pink", "White"],
    "_id": "a557292fe5814ea2b15c6ef4bd73ed83",
    "name": "Kanap Autonoé",
    "price": 1499,
    "imageUrl": "kanap04.jpeg",
    "description": "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    "altTxt": "Photo d'un canapé rose, une à deux place"
  },
  {
    "colors": ["Grey", "Purple", "Blue"],
    "_id": "8906dfda133f4c20a9d0e34f18adcf06",
    "name": "Kanap Eurydomé",
    "price": 2249,
    "imageUrl": "kanap05.jpeg",
    "description": "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
    "altTxt": "Photo d'un canapé gris, trois places"
  },
  {
    "colors": ["Grey", "Navy"],
    "_id": "77711f0e466b4ddf953f677d30b0efc9",
    "name": "Kanap Hélicé",
    "price": 999,
    "imageUrl": "kanap06.jpeg",
    "description": "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
    "altTxt": "Photo d'un canapé gris, deux places"
  },
  {
    "colors": ["Red", "Silver"],
    "_id": "034707184e8e4eefb46400b5a3774b5f",
    "name": "Kanap Thyoné",
    "price": 1999,
    "imageUrl": "kanap07.jpeg",
    "description": "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
    "altTxt": "Photo d'un canapé rouge, deux places"
  },
  {
    "colors": ["Pink", "Brown", "Yellow", "White"],
    "_id": "a6ec5b49bd164d7fbe10f37b6363f9fb",
    "name": "Kanap orthosie",
    "price": 3999,
    "imageUrl": "kanap08.jpeg",
    "description": "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
    "altTxt": "Photo d'un canapé rose, trois places"
  }
];

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
} 
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

/*function gestionPanier(productId, quantity){
  if(!localStorage.getObj("panier")){
    localStorage.setObj("panier",[]);
  }
  let panier= localStorage.getObj("panier");
  if(quantity=>1){
    let exist = false
    for (let k=0;k<panier.length;k++){
      if(panier[k].id === productId){
        exist = k;
      }
    }
    if(exist!==false){
      panier[exist].quantity = parseInt(panier[exist].quantity) + parseInt(quantity);
    }
    else{
      panier.push({"id":productId,"quantity":quantity});
    }
  }
  localStorage.setObj("panier",panier);
}*/

if(localStorage.getObj("panier") !== undefined){
  
// Boucle d'envoi des produits dans le panier en html
let total=0;
for (let i=0; i<localStorage.getObj("panier").length; i++){
  let totalItem=0;
  let product=false;
  for (let j=0;j<products.length;j++){
    if(localStorage.getObj("panier")[i] !== undefined && products[j]._id !== undefined){
      if(products[j]._id == localStorage.getObj("panier")[i].id){
        product=products[j];
      }
    }
  };
  totalItem=parseInt(localStorage.getObj("panier")[i].quantity)*product.price;
  total+=totalItem;
  document.getElementById("cart__items").innerHTML+=
  '<article class="cart__item" data-id='+localStorage.getObj("panier")[i].id+'>'+
    '<div class="cart__item__img">'+
      '<img src='+localStorage.getObj("panier")[i].img+' alt='+localStorage.getObj("panier")[i].altTxt+'>'+
    '</div>'+
    '<div class="cart__item__content">'+
      '<div class="cart__item__content__titlePrice">'+
        '<h2>'+product.name+'</h2>'+
        '<p> '+totalItem+' €</p>'+
      '</div>'+
      '<div class="cart__item__content__settings">'+
        '<div class="cart__item__content__settings__quantity">'+
          '<p>Qté : '+localStorage.getObj("panier")[i].quantity+' </p>'+
          '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+localStorage.getObj("panier")[i].quantity+'">'+
        '</div>'+
        '<div class="cart__item__content__settings__delete">'+
          '<p class="deleteItem">Supprimer</p>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</article>';
}

document.getElementById("totalQuantity").innerHTML+='';

document.getElementById("totalPrice").innerHTML=total;

document.getElementById("firstNameErrorMsg").innerHTML+='';

let deleteItem = document.getElementsByClassName("deleteItem");
for (l=0; l<deleteItem.length; l++){
  deleteItem[l].addEventListener("click", function(){
  //deleteItem.parentNode.parentNode.dataset.id
    console.log(deleteItem[l])
/*    for(k=0; k<=localStorage.getObj("panier").length; k++){
      if(products[k]._id == localStorage.getObj("panier")[k].id){
        localStorage.removeItem("panier")[k];
      }
    }*/
  });
}}

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

//gestion de l'url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let sid = urlParams.get('id');

//ajoute l'id dans l'url
let product=false;
for (let i=0; i<products.length; i++){
    if(products[i]._id === sid){
        product=products[i];
    }
};

//fonction pour l'envoie en html pour éviter la répétition du code
function htmlProduct(a, b){
    document.getElementById(a).innerHTML+= b;
};

//parametrage pour le local storage
Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
} 
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

//fonction pour la gestion du panier en local storage
function gestionPanier(productId, quantity, color){
  if(!localStorage.getObj("panier")){
    localStorage.setObj("panier",[]);
  }
  let panier= localStorage.getObj("panier");
  //vérifie l'id de l'url pour enregistré le bon produit avec le bonne id
  if(quantity=>1){
    let exist = false
    for (let k=0; k<panier.length; k++){
      if(panier[k].id === productId){
        exist = k;
      }
    }
    //prend la couleur puis la quantité de la couleur
    if(exist!==false){
      if(panier[exist].color === color){
        panier[exist].quantity = parseInt(panier[exist].quantity) + parseInt(quantity);
      }
      else{
        panier.push({"id":productId,"quantity":quantity,"color":color});
      }
    }
    else{
      panier.push({"id":productId,"quantity":quantity,"color":color});
    }
  }
  localStorage.setObj("panier",panier);
}

//envoie dans l'html les différentes couleurs du produit
if(product!==false){
  for (let j=0; j<product.colors.length; j++){
    document.getElementById("colors").innerHTML+=
    '<option value="'+product.colors[j]+'">'+product.colors[j]+'</option>';
  }

  //envoie dans l'html l'image et sa description
  document.getElementsByClassName("item__img").innerHTML+=
  "'<img src="+product.imageUrl+"'+'alt="+product.altTxt+">'";

  //envoie dans l'html en utilisant la fonction htmlProduct
  htmlProduct("title", product.name);

  htmlProduct("price", product.price);

  htmlProduct("description", product.description);

  //au clic sur le bouton stock les valeurs dans le local storage
  document.getElementById("addToCart").addEventListener("click", event=>{
    gestionPanier(product._id, document.getElementById("quantity").value, document.getElementById("colors").value);
  });
}
else{
  // gère la redirection si produit inexistant
  window.location = "./index.html"
}
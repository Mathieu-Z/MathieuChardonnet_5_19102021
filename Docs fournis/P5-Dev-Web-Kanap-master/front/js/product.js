// PAGE PRODUIT
// récupération des données
let cardsFetch = function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((products) => {

      console.log(products);

      
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
      document.getElementsByClassName("item__img")[0].innerHTML=
      '<img src="'+product.imageUrl+'" alt='+product.altTxt+'>';

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
  });
};
cardsFetch();
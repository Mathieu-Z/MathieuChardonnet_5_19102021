// PAGE PANIER
// récupération des données
let cardsFetch = function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((products) => {

      console.log(products);

      
    //parametrage pour le local storage
    Storage.prototype.setObj = function(key, obj) {
      return this.setItem(key, JSON.stringify(obj))
    } 
    Storage.prototype.getObj = function(key) {
      return JSON.parse(this.getItem(key))
    }

    let totalPrice = 0;
    let totalItem = 0;

    // Boucle d'envoi des produits dans le panier
    for (let i=0; i<localStorage.getObj("panier").length; i++){
      let product=false;
      for (let j=0; j<products.length; j++){
        if(localStorage.getObj("panier")[i] !== undefined && products[j]._id !== undefined){
          if(products[j]._id == localStorage.getObj("panier")[i].id){
            product = products[j];
          }
        }
      };

      //calcul du prix total
      let totalItemPrice = 0;
      totalItemPrice = parseInt(localStorage.getObj("panier")[i].quantity) * product.price;
      totalPrice += totalItemPrice;

      //Apparition des articles sur la page panier
      document.getElementById("cart__items").innerHTML+=
      '<article class="cart__item" data-id='+localStorage.getObj("panier")[i].id+' data-color='+localStorage.getObj("panier")[i].color+'>'+
        '<div class="cart__item__img">'+
          '<img src='+product.imageUrl+' alt='+product.altTxt+'>'+
        '</div>'+
        '<div class="cart__item__content">'+
          '<div class="cart__item__content__description">'+
            '<h2>'+product.name+'</h2>'+
            '<p> '+localStorage.getObj("panier")[i].color+' </p>'+
            '<p> '+totalItemPrice+' €</p>'+
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

      //calcul du nombre d'article
      totalItem += parseInt(localStorage.getObj("panier")[i].quantity);

      //renvoi la quantité total d'article
      document.getElementById("totalQuantity").innerHTML = totalItem;

      //renvoi le prix total
      document.getElementById("totalPrice").innerHTML = totalPrice;
    }

    //fonction pour la suppression d'un produit du panier
    function removeProductFromCart(productId, color){
      let tableau = localStorage.getObj("panier");
      for(let k=0; k<tableau.length; k++){
        if(tableau[k].id == productId && tableau[k].color == color){
          tableau.splice(k, 1);
          localStorage.setObj("panier", tableau);
          window.location.reload();
        }
      }
    }

    //suppression d'un élément du panier
    let deleteItem = document.getElementsByClassName("deleteItem");
    for (l=0; l<deleteItem.length; l++){
      deleteItem[l].addEventListener("click", function(test){
        removeProductFromCart(test.target.parentNode.parentNode.parentNode.parentNode.dataset.id, test.target.parentNode.parentNode.parentNode.parentNode.dataset.color);
      });
    }

    //fontion pour le changement de quantité d'un article
    function changeQuantityFromCart(productId, color, quantity){
      if(quantity > 0){
        let tableau = localStorage.getObj("panier");
        for(let k=0; k<tableau.length; k++){
          if(tableau[k].id == productId && tableau[k].color == color){
            tableau[k].quantity = quantity
            localStorage.setObj("panier", tableau);
            window.location.reload();
          }
        }
      }
      else{
        alert("la quantité ne peut pas être égale à 0, cliquez sur le bouton supprimer si vous ne voulez plus de ce produit.");
      }
    }

    //changement de quantité des articles
    let changeQuantity = document.getElementsByClassName("itemQuantity");
    for(l=0; l<changeQuantity.length; l++){
      changeQuantity[l].addEventListener("change", function(testQuantity){
        changeQuantityFromCart(testQuantity.target.parentNode.parentNode.parentNode.parentNode.dataset.id, testQuantity.target.parentNode.parentNode.parentNode.parentNode.dataset.color, testQuantity.target.value);
      });
    }


    //REGEX
    const orderButton = document.getElementById("order");
    orderButton.addEventListener("click", (e) => {
      e.preventDefault();
      let prenom = document.getElementById("firstName").value;
      let nom = document.getElementById("lastName").value;
      let ville = document.getElementById("city").value;
      let adresse = document.getElementById("address").value;
      let mail = document.getElementById("email").value;

      // email
      let emailErrorMsg = document.getElementById("emailErrorMsg");
      function validateEmail(mail) {
        let regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexMail.test(mail) == false) {
          return false;
        } 
        else {
          emailErrorMsg.innerHTML = null;
          return true;
        }
      }

      //prénom
      let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
      function validateFirstName(prenom) {
        let regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regexName.test(prenom) == false) {
          return false;
        } else {
          firstNameErrorMsg.innerHTML = null;
          return true;
        }
      }

      //nom
      let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
      function validateLastName(nom) {
        let regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regexName.test(nom) == false) {
          return false;
        } else {
          lastNameErrorMsg.innerHTML = null;
          return true;
        }
      }

      //ville
      let cityErrorMsg = document.getElementById("cityErrorMsg");
      function validateCity(ville) {
        let regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regexName.test(ville) == false) {
          return false;
        } else {
          cityErrorMsg.innerHTML = null;
          return true;
        }
      }

      //Messages d'erreur si valeur du formulaire fausse
      if (validateEmail(mail) == false) {
        emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
      }
      if (validateFirstName(prenom) == false) {
        firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre.";
      }
      if (validateLastName(nom) == false) {
        lastNameErrorMsg.innerHTML = "Entrez un nom valide sans chiffre.";
      }
      if (validateCity(ville) == false) {
        cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre.";
      }

      let contact = [];

      let productId = 0;

      let productsApi = [];

      //soumet le résultats à la base de données et change de page
      if(validateEmail(mail)==true && validateFirstName(prenom)==true && validateLastName(nom)==true && validateCity(ville)==true){
        //soumettre resultat
        contact = {
          firstName: prenom,
          lastName: nom,
          address: adresse,
          city: ville,
          email: mail,
        }

        for (m = 0; m<localStorage.getObj("panier").length; m++){
          for(n = 0; n<products.length; n++){
            if(localStorage.getObj("panier")[m] !== undefined && products[n]._id !== undefined){
              if(products[n]._id == localStorage.getObj("panier")[m].id){
                products[n].productId = products[n]._id;
                productsApi.push(products[n]._id);
              }
            }
          }
        }

        let jsonData = JSON.stringify({ contact, products : productsApi });

        // envoi des données à l'API
        fetch(("http://localhost:3000/api/products/order"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        })
        .then((res) => res.json())
        .then((order) => {
          //enleve les produits du panier
          localStorage.clear();
          //renvoi a la page confirmation
          window.location = "../html/confirmation.html?orderId="+order.orderId
        })
        .catch(function(error) {
          console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
      }
    });
  });
};
cardsFetch();
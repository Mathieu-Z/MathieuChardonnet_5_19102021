// récupération des données
updateDisplay(
    fetch('Product.js').then(function(response) {
    response.text().then(function(text) {
      poemDisplay.textContent = text;
    });
  }));

// Boucle pour envoyer plusieurs données
function repeat(){
  if(i<n)n--
  else(i<0)
}

// envoie des données en html
document.addElementById("cart__items").innerHTML();

// calcul prix article
var articlePrice = (productPrice * numberOfProduct);

// calcul prix panier
if (panier=1){
  var panierPrice=articlePrice
}
else if (panier>1){
  var panierPrice = (articlePrice + articlePrice1)
};
return panierPrice;

//
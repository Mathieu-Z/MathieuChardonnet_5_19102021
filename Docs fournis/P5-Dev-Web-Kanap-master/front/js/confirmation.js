let cardsFetch = function () {
  fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
  
  console.log(products);

  function randomOrder(min, max) { // min et max inclus
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  let randomNum = randomOrder(10000000000000000, 99999999999999999);
  document.getElementById("orderID").innerHTML = randomNum;
  })
};

cardsFetch();
(() => {
    
  const productRepository = new ProductRepository();
  const addProduct = document.getElementById("mainPage"); 
  const viewModel = {
    
    createProductRow(result) {        // Création du HTML pour chaqque produit grâce au résultat de la fonction findAll appelée en argument
      result.then(products => {
        if (!!products && products.length) {
          products.forEach(element => {
            const {_id, name, price, imageUrl } = element;
            addProduct.innerHTML +=
              `<div class="product">
                  <figure class="image">
                      <img src="${imageUrl}" alt="Photo de ${name}" class="productPic"></img>
                  </figure>
                  <div class="productInfo">
                      <h3 class="productName">${name}</h3>
                      <p id="price">Prix: ${price/100}€</p> 
                      <button onclick='location.href="view/product.html?id=${_id}"' type="button" id="btnCustom">
                        <i class="fas fa-toolbox"></i>Personnaliser ${name}
                      </button>
                  </div>
              </div>`;      

          });
        }
      });
    },

  };

  viewModel.createProductRow(productRepository.products()); // Passage en argument de la fonction findAll()

})();
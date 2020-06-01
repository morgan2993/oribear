(() => {
    
    const productRepository = new ProductRepository();
    const addProduct = document.getElementById("container"); 

    const viewModel = {
      selectProduct() {
        const link = window.location.href;                          // Récupération de l'ID du produit dans l'URL
        const url = new URL(link)
        const params = new URLSearchParams(url.search);
        const ID = params.get('id');    
        const result = productRepository.findId(ID)                       // Utilisation de findID pour récupérer 1 seul produit
            .then(product => {   
                const { name, price, imageUrl, description, colors } = product; // Création du HTML pour le produit sélectionné avec image / nom / description et prix
                addProduct.innerHTML +=
                    `<div class="product"> 
                        <figure class="image">
                            <h3 class="productName">${name}</h3>
                            <img src="${imageUrl}" alt="Photo de ${name}" class="productPic"></img>
                        </figure>
                        <div class="productInfo"> 
                            <ul class="productDescription">
                                <li id="description">Description : <br />${description}</li>
                                <li id="price">Prix: ${price/100}€</li> 
                            </ul>
                            <form class="productOptions optionsBox">
                                <label for="option">Couleur : </label>
                                <select name="option" id="options"></select>
                            </form>
                            <div class="quantityDiv">
                                <label for="quantityInput">Combien d'oursons souhaitez-vous ajouter à votre panier ?</label><br />
                                <input 
                                    step="number" 
                                    placeholder="Quantité" 
                                    class="quantity-input" 
                                    id="quantityInput" 
                                    name="quantityInput" 
                                    type="number" 
                                    min="1" max="99" 
                                    value='1'>
                                </input>
                            </div>

                            
                        </div>
                        </div>`;

                    let optionItem = document.getElementById("options");   // Ajout du choix de la couleur
                    let options = "";
                    (product.colors).forEach(color => {
                        options += `
                        <option value="${color}" selected>${color}</option>`
                    });
                optionItem.innerHTML = options;

                panier.addEventListener('click', function(e) {              // Clique sur bouton ajouter au panier
                        
                    let color = document.querySelector('select').value;
                    let quantity = document.getElementById('quantityInput').value;
               
                    if (quantity < 1) {                                            
                    
                        swal("Veuillez sélectionner un produit", "", "error");
                
                    } else {
                 
                        swal("Produit ajouté au panier", "", "success");

                        const cartRepository = new CartRepository();                  // fonction ajouter au panier (addToCart) de CartRepository
                        cartRepository.addToCart(product, color, quantity);
                                          
                    } 
                    
                });
            
            })
        }
    }

    viewModel.selectProduct();
   
})();
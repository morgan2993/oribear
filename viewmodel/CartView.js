(() => {
    
    const cartRepository = new CartRepository();
    const totalCartCost = document.getElementById('finalCheckout');
    const result = cartRepository.getCart();
    let title = document.querySelector('#checkoutTitle');
    let productContainer = document.getElementById('productContainer');
    let finalCheckout = 0;
    let closeForm = document.getElementById('close');
    let validateForm = document.getElementById('validate');
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    let contact = new Contact (firstName, lastName, address, city, email);   
    let form = document.getElementById('postData'); 
   

    if (result === null || result.length === 0) {                                     // Si le panier est vide on affiche à la place un texte indiquat que le panier est vide et on cache le formulaire
      title.textContent = 'Désolé, votre panier est vide, merci de séléctionner un produit !';
              document.getElementById('viderPanier').style.display="none";
              document.getElementById('finalPrice').style.display="none";
              document.getElementById('container').style.paddingBottom="0";
              document.getElementById('container').style.minHeight="80vh";
              document.querySelector('#container').style.display="flex";
              document.querySelector('.hiddenOnForm').style.justifySelf="center";
              document.querySelector('.hiddenOnForm').style.margin='auto';

    } else {    

        title.textContent = 'Votre panier :';

        result.forEach(cartItem => {                             // Création du HTML pour chaque Item présent dans le LocalStorage
          let totalPrice = (cartItem.quantity * cartItem.price);

          productContainer.innerHTML += `
            <div class="mainContainer">
              <ul class="itemList">
                <li class="productImg">
                    <img src="${cartItem.product.imageUrl}" alt="Image de l'ours en peluche ${cartItem.product.name}"/>
                </li>
                <li class="productName" id="name">
                  <h2 class="productNameTitle"><a href="product.html?id=${cartItem.product._id}">${cartItem.product.name}</a></h2>
                  <div class="productColor" id="color" >
                    <p> Couleur : </br> ${cartItem.color} </p>
                  </div>
                </li>
                <li class="productQuantity">
                  <button type="button" id="up"; class="btn-up" data-id="${cartItem.product._id}" data-color="${cartItem.color}">  
                    <i class="fas fa-angle-up"></i>
                  </button>
                  <p> Quantité : <span class="test1">${cartItem.quantity}</span></p>
                  <button type="button" id="down"; class="btn-down" data-id="${cartItem.product._id}" data-color="${cartItem.color}">
                    <i class="fas fa-angle-down"></i>
                  </button>
                </li>
                <li class="productPrix">
                  <p class="productPrice"> Prix unitaire : ${cartItem.product.price/100} € </p>
                  <div class="productTotalPrice">
                    <h3 class="productTotalPrice-Title">Prix total pour cet article</h3>
                    <p><span class="productTotalPrice-Amount">${cartItem.quantity * cartItem.product.price/100}</span> €</p>
                  </div>
                </li>
              </ul>       
            </div>`;  // On ajoute data Id et Data Color sur le bouttons pour pouvoir vérifier si c'est bien le même produit avant de modifier la quantité

        });     
            
        const ProductsTotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
           
        ProductsTotalPrice.forEach(product => {                     // Calcul du prix total pour chaque article
          let productTotalPrice = parseInt(product.innerHTML, 10);   
          finalCheckout += productTotalPrice;   
        })

        totalCartCost.innerHTML = finalCheckout + ' €';     // Calcul du prix total du panier
                          
        let down = document.querySelectorAll('.btn-down');
        
        down.forEach((button) => {
          button.addEventListener('click', function(e) {    // Application de la méthode RemoveItem (diminution quantité) pour chaque article (sur chaque boutton down)
            let id = button.dataset.id;
            let color = button.dataset.color;
            cartRepository.removeItem(id, color);
            
          })
            
        })
            
        let up = document.querySelectorAll('.btn-up');

        up.forEach((button) => {
          button.addEventListener('click', function(e) {    // Application de la méthode AddItem (augmentation quantité) pour chaque article (sur chaque boutton up)
            let id = button.dataset.id;
            let color = button.dataset.color;          
            cartRepository.addItem(id, color);
          })
        })
        
        emptyCart.addEventListener('click', cartRepository.emptyCart); // Vider le panier

        confirmCart.addEventListener('click',  function(e) { // Confirmer le panier et affichage du formulaire caché jusqu'à présent

          document.getElementById("form").style.display="block";
          document.querySelector(".hiddenOnForm").style.display="none";
          document.querySelector('#container').style.backgroundColor="#f2f2f2";

        });

        closeForm.addEventListener('click', function(e) {  // Ferme le formulaire et retourne au panier

          document.getElementById("form").style.display="none";
          document.querySelector(".hiddenOnForm").style.display="block";
          document.querySelector('#container').style.backgroundColor="grey";

        });

        validateForm.addEventListener('click', function(e) {    // Validation du formulaire et récupération de l'Order ID grâce à la méthode order() dans OrderRepository

          const orderRepository = new OrderRepository();
          const request = orderRepository.order(contact);
   
          fetch(request)
            .then(response => response.json()) // récupération de l'Order ID
              .then( (response) => {
                if (form.checkValidity() === false) {   // Vérification du formulaire
                      swal("Attention", "Merci de bien vouloir vérifier le formulaire et réessayer", "error");
                } else if (form.checkValidity() ===true) {  
                    let getOrderId = response.orderId;  
                    let getTotalCost = totalCartCost.innerHTML; 
                    localStorage.clear();  
                    let orderRecap = { getOrderId, getTotalCost };  
                    
                    localStorage.setItem("orderIsConfirmed", JSON.stringify(orderRecap));   // Réutilisation du localStorage pour avoir les infos concernant la commande et pouvoir les récupérer via getOrderId()
                    
                    swal("Merci pour votre commande !", "Vous allez être redirigé vers la page de confirmation dans un instant", "success");
                    setTimeout(function() {window.location = 'order.html'; }, 3000);  // Redirection vers page order au bout de 3 secondes
                 
                  } 
            })
                         
        })
    }
   
})();




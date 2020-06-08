(() => {
    
    const cartRepository = new CartRepository();
    const totalCartCost = document.getElementById('finalCheckout');
    const result = cartRepository.getCart();
    let title = document.querySelector('#checkoutTitle');
    let productContainer = document.getElementById('productContainer');
    let finalCheckout = 0;
    let closeForm = document.getElementById('close');
    let validateForm = document.getElementById('validate');
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
          //let totalPrice = (cartItem.quantity * cartItem.price);


         /* let mainDiv = document.createElement("div");
          mainDiv.setAttribute('class', 'mainContainer');
          mainDiv.id = 'mainContainer';
          productContainer.appendChild(mainDiv);

          let list = document.createElement("ul");
          list.setAttribute('class', 'itemList');
          list.id = 'itemList';
          mainDiv.appendChild(list);

          let li = document.createElement('li');
          li.setAttribute('class', 'productImg');
          li.id = 'productImg'
          list.appendChild(li);

          let img = document.createElement('img')
          img.src = `${cartItem.product.imageUrl}`;
          img.alt = `Image de l'ours en peluche ${cartItem.product.name}`;
          li.appendChild(img);

          li = document.createElement('li');
          li.setAttribute('class', 'productName');
          li.id = 'name'
          li.class = 'productName';
          list.appendChild(li);

          let h2 = document.createElement("h2");
          h2.setAttribute('class', 'productNameTitle');
          h2.id = 'productNameTitle';
          li.appendChild(h2);

          let a = document.createElement("a");
          a.href = `product.html?id=${cartItem.product._id}`;
          a.innerText = `${cartItem.product.name}`;
          h2.appendChild(a);

          let color = document.createElement('div');
          color.setAttribute('class',  "productColor");
          color.id = "color";
          li.appendChild(color);

          let couleur = document.createElement('p');
          couleur.innerHTML = `Couleur : </br> ${cartItem.color}`;
          color.appendChild(couleur);

          li = document.createElement('li');
          li.setAttribute('class', 'productQuantity');
          list.appendChild(li);

          let btnup = document.createElement("button")
          btnup.type = "button";
          btnup.id = 'up';
          btnup.setAttribute('class', 'btn-up');
          btnup.setAttribute('data-id', `${cartItem.product._id}`);
          btnup.setAttribute('data-color', `${cartItem.color}`);
          li.appendChild(btnup);

          let angleup = document.createElement('i');
          angleup.setAttribute('class', 'fas fa-angle-up');
          btnup.appendChild(angleup);

          let para = document.createElement('p');
          para.id = "new";
          para.innerText = "Quantité : ";
          li.appendChild(para);
          
          let span1 = document.createElement('span');
          span1.setAttribute('class', 'test1');
          span1.id = 'test1';
          span1.innerText = `${cartItem.quantity}`;
          para.appendChild(span1);
          let btndown = document.createElement("button")
          btndown.type = "button";
          btndown.id = 'down';
          btndown.setAttribute('class', 'btn-down');
          btndown.setAttribute('data-id', `${cartItem.product._id}`);
          btndown.setAttribute('data-color', `${cartItem.color}`);
          li.appendChild(btndown);
          let angledown = document.createElement('i');
          angledown.setAttribute('class', 'fas fa-angle-down');
          btndown.appendChild(angledown);



          li = document.createElement('li');
          li.setAttribute('class', 'productPrix');
          list.appendChild(li);
          let para1 = document.createElement('p');
          para1.setAttribute('class', 'productPrice');
          para1.innerText = `Prix unitaire : ${cartItem.product.price/100} € `
          li.appendChild(para1);
          let div1 = document.createElement('div');
          div1.setAttribute('class', 'productTotalPrice');
          li.appendChild(div1);
          let h3 = document.createElement('h3');
          h3.setAttribute('class', 'productTotalPrice-Title');
          h3.innerText = 'Prix Total pour cet article';
          div1.appendChild(h3);
          let para2 = document.createElement('p');
          para2.id = 'test3'
          div1.appendChild(para2);
          let span2 = document.createElement('span');
          span2.id = 'test2';
          span2.setAttribute('class', 'productTotalPrice-Amount');
          span2.innerText = `${cartItem.quantity * cartItem.product.price/100} €`;
          para2.appendChild(span2); */


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
                  <p id="new"> Quantité : <span class="test1" id="test1">${cartItem.quantity}</span></p>
                  <button type="button" id="down"; class="btn-down" data-id="${cartItem.product._id}" data-color="${cartItem.color}">
                    <i class="fas fa-angle-down"></i>
                  </button>
                </li>
                <li class="productPrix">
                  <p class="productPrice"> Prix unitaire : ${cartItem.product.price/100} € </p>
                  <div class="productTotalPrice">
                    <h3 class="productTotalPrice-Title">Prix total pour cet article</h3>
                    <p><span class="productTotalPrice-Amount">${cartItem.quantity * cartItem.product.price/100} €</span></p>
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



        let up = document.querySelectorAll('.btn-up');

        up.forEach((button) => {
          button.addEventListener('click', function(e) {    // Application de la méthode AddItem (augmentation quantité) pour chaque article (sur chaque boutton up)
            let id = button.dataset.id;
            let color = button.dataset.color;          
            let cart = cartRepository.addItem(id, color);
            
              for(let i = 0; i < cart.length; i++) {
                if (cart[i].product._id == id && cart[i].color == color) {
                 
                  let newQuantity = [...document.getElementsByClassName('test1')];
                  newQuantity.forEach(quantity => {
                    newQuantity[i].innerHTML =  `${cart[i].quantity}`;
                  })
                  let totalPrice = cart[i].quantity * cart[i].product.price /100;
                  let TotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
                  TotalPrice.forEach(price => {
                    TotalPrice[i].innerHTML = totalPrice + ' €';
                  })
          
                }
              }
            
             const ProductsTotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
             let finalCheckout = 0;  
             ProductsTotalPrice.forEach(product => {                     // Calcul du prix total pour chaque article
               let productTotalPrice = parseInt(product.innerHTML, 10);
               finalCheckout += productTotalPrice;   
               })
             totalCartCost.innerHTML = finalCheckout + ' €';  
          })
        })

                          
        let down = document.querySelectorAll('.btn-down');
    
        down.forEach((button) => {
          button.addEventListener('click', function(e) {    // Application de la méthode RemoveItem (diminution quantité) pour chaque article (sur chaque boutton down)
            let id = button.dataset.id;
            let color = button.dataset.color;
            let cart = cartRepository.removeItem(id, color);
            console.log(cart);
            for(let i = 0; i < cart.length; i++) {
              if (cart[i].product._id == id && cart[i].color == color) {
               
                let newQuantity = [...document.getElementsByClassName('test1')];
                newQuantity.forEach(quantity => {
                  newQuantity[i].innerHTML =  `${cart[i].quantity}`;
                })
                let totalPrice = cart[i].quantity * cart[i].product.price /100;
                let TotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
                TotalPrice.forEach(price => {
                  TotalPrice[i].innerHTML = totalPrice + ' €';
                })
        
              } 
              
            }
          
           const ProductsTotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
           let finalCheckout = 0;  
           ProductsTotalPrice.forEach(product => {                     // Calcul du prix total pour chaque article
             let productTotalPrice = parseInt(product.innerHTML, 10);
             finalCheckout += productTotalPrice;   
             })
           totalCartCost.innerHTML = finalCheckout + ' €';  
           
            
            
            
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
          let totalCost = totalCartCost.innerHTML;
          let firstName = document.getElementById('firstName').value;
          let lastName = document.getElementById('lastName').value;
          let address = document.getElementById('address').value;
          let city = document.getElementById('city').value;
          let email = document.getElementById('email').value;
          let contact = new Contact(firstName, lastName, address, city, email);  
          if (form.checkValidity() === false){
            swal("Attention", "Merci de bien vouloir vérifier le formulaire et réessayer", "error")
          } else if (form.checkValidity() === true) {
     
            orderRepository.saveOrder(contact, totalCost);
            swal("Merci pour votre commande !", "Vous allez être redirigé vers la page de confirmation dans un instant", "success");
            setTimeout(function() {window.location = 'order.html'; }, 3000);  // Redirection vers page order au bout de 3 secondes

          }
        
           
                         
        })
        
    }
   
})();




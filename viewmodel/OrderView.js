(() => {
  const orderRepository = new OrderRepository();
  
  const orderId = orderRepository.getOrderId();

  let textZone = document.getElementById('confirmationInfo');

 
  textZone.innerHTML +=   // Création du HTML avec l'identifiant et le prix total de la commande
    `<div class="orderInfos"

    <h3>récapitulatif :</h3>
    <h3>Identifiant de commande : </br></br><span class="importedInfo">${orderId.getOrderId}</span></h3>
    <h3>Prix total de la commande : </br><span class="importedInfo">${orderId.getTotalCost}</span></h3>
    <p>Vous recevrez un email contenant les informations concernant votre commande et sa livraison.</p>

    </div>
    `;

})();
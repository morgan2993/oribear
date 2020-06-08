(() => {
  const orderRepository = new OrderRepository();
  
  const orderId = orderRepository.getOrderId();
  debugger;

  let textZone = document.getElementById('confirmationInfo');

 
  textZone.innerHTML +=   // Création du HTML avec l'identifiant et le prix total de la commande
    `<div class="orderInfos">
    <h1> Merci beaucoup pour votre commande ${orderId.contact.firstName} ${orderId.contact.lastName} ! </h1>
    <h2>Voici votre récapitulatif :</h2>
    <h3>Identifiant de commande : <h3><span class="importedInfo">${orderId.getOrderId}</span></h3>
    <h3>Prix total de la commande : </br><span class="importedInfo">${orderId.totalCost}</span></h3>
    <p>Vous recevrez bientôt un email contenant les informations concernant votre commande et sa livraison.</p>
    <p> À bientôt sur les sites Orinoco </p>
    <img src="../img/orinoco.png">

    </div>
    `;

})();
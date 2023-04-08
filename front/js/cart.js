//     Déclaration des Variables
let objLinea=localStorage.getItem("canapes");
let panier=JSON.parse(objLinea);
const affichagePanier=document.getElementById("cart__items");
const inputQuantite=document.getElementsByClassName('itemQuantity');
const suppression=document.getElementsByClassName('deleteItem');
const prenom=document.getElementById('firstName');
const nom=document.getElementById('lastName');
const adresse=document.getElementById('address');
const ville=document.getElementById('city');
const email=document.getElementById('email');
const bouton= document.getElementById('order');
let sectionContent="";
bouton.disabled=true;

fetch(`http://localhost:3000/api/products/`)   // Recherche les produits du site
.then ((res) => {
    if (res.ok){
        return res.json()
    }
})
.then ((value) => {
    affichage(value);         // Affichage du panier, calcul du nombre d'éléments et du prix total
    modifPanier(value);      // Modification du panier
    eraseElement(value);     // Suppression d'éléments du panier
    calcul(value);           // Calcule le nombre d'éléments dans le panier et le prix total
})
.catch((err) => {
console.log(err);
})
.finally(() => {                        
}
);
    
/**
 * Updates quantity of elements in the cart, price and the localStorage
 * @param {catalogue} Objet
 */
const modifPanier = (catalogue) => {
    for (i=0;i<inputQuantite.length;i++){
        inputQuantite[i].addEventListener('change',(modif)=>{          
            let elToModificateId = modif.target.closest('article').dataset.id;
            let elToModificateColor = modif.target.closest('article').dataset.color;
            for (canape of panier){
                if (canape.id===elToModificateId && canape.couleur===elToModificateColor){
                    if ( modif.target.value<=0 || modif.target.value>100){
                        alert("Erreur: Le nombre de canapes doit être compris entre 1 et 100.");
                        return;//location.reload();
                    }
                    else{
                        canape.quantite=modif.target.value;
                        objLinea=JSON.stringify(panier);
                        localStorage.setItem("canapes",objLinea);
                    }
                }
            }
            calcul(catalogue);
        }); 
    }
}
 
/**
 * Erases elements in the cart
 */
const eraseElement = (catalogue) => {
    for (let i in panier){
        suppression[i].addEventListener('click',(sel)=>{
            panier.splice(i,1);
            let elToModificate= sel.target.closest('#cart__items');
            elToModificate.innerHTML="";
            objLinea=JSON.stringify(panier);
            localStorage.setItem("canapes",objLinea);
            affichage(catalogue);
            location.reload();
        });
    }
}

/**
 * Writes HTML for each product in the cart
 * @param {catalogue} Objet
 */
const affichage=(catalogue)=>{
    for(let canape of panier){
        for(let detail of catalogue){
            if (detail._id==canape.id){
                sectionContent+=`<article class="cart__item" data-id="${canape.id}" data-color="${canape.couleur}">
                                    <div class="cart__item__img">
                                        <img src="${detail.imageUrl}" alt="Photographie d'un canapé";
                                    </div>
                                    <div class="cart__item_content">
                                        <div class="cart__item__content__description">
                                            <h2>${detail.name}</h2>
                                            <p>${canape.couleur}</p>
                                            <p>${detail.price} €</p>
                                        </div>
                                        <div class="cart__item__content__settings">
                                            <div class="cart__item__content__settings__quantity">
                                                <p>Quantité: </p>
                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${canape.quantite}>
                                            </div>
                                            <div class="cart__item__content__settings__delete">
                                                <p class="deleteItem">Supprimer</p>
                                            </div>
                                        </div>
                                    </div>    
                                </article>`;
            }
        }
    }
    affichagePanier.innerHTML=sectionContent;
    calcul(catalogue);
}

/**
 * Calculate quantity and price
 * @param {catalogue} Objet
 */
const calcul = (catalogue) => {
    quantiteTotal=0;
    prixTotal=0;
    for(let canape of panier){
        for(let detail of catalogue){
            if (detail._id==canape.id){
                quantiteTotal+=Number(canape.quantite);
                prixTotal+=Number(canape.quantite)*Number(detail.price);
            }
        }
    }
    document.getElementById("totalQuantity").innerHTML=quantiteTotal;
    document.getElementById("totalPrice").innerHTML=prixTotal;
}

// Checking user's informations
let regexText=/[\.;,?/:§*+=!%ùç*µ£$&~"#{([_|`@\])}0-9]/g;
let regexAdresse=/[?§*+=!%ùç*µ£$&~"_#{[|`@\]}]/g;
let regexEmail=/[a-zA-Z0-9]+[@][a-zA-Z0-9]+[\.][a-zA-Z]{2,3}/g;
let prenomERR=0;
let nomERR=0;
let adresseERR=0;
let villeERR=0;
let emailERR=0;
prenom.addEventListener('change',(modif)=>{
    if (modif.target.value.match(regexText)!=null){
        document.getElementById('firstNameErrorMsg').innerHTML="Erreur: Ne doit pas contenir de caractères spéciaux ni de chiffres.";
        prenomERR=1;
    }
    else {
        document.getElementById('firstNameErrorMsg').innerHTML="";
        prenomERR=0;
    }
    verifFormulaire();
}
);
nom.addEventListener('change',(modif)=>{
    if (modif.target.value.match(regexText)!=null){
        document.getElementById('lastNameErrorMsg').innerHTML="Erreur: Ne doit pas contenir de caractères spéciaux ni de chiffres.";
        nomERR=1;
    }
    else {
        document.getElementById('lastNameErrorMsg').innerHTML="";
        nomERR=0;
    }
    verifFormulaire();
}
);
adresse.addEventListener('change',(modif)=>{
    if (modif.target.value.match(regexAdresse)!=null){
        document.getElementById('addressErrorMsg').innerHTML="Erreur: Ne doit pas contenir de caractères spéciaux.";
        adresseERR=1;
    }
    else {
        document.getElementById('addressErrorMsg').innerHTML="";
        adresseERR=0;
    }
    verifFormulaire();
}
);
ville.addEventListener('change',(modif)=>{
    if (modif.target.value.match(regexText)!=null){
        document.getElementById('cityErrorMsg').innerHTML="Erreur: Ne doit pas contenir de caractères spéciaux ni de chiffres.";
        villeERR=1;
    }
    else {
        document.getElementById('cityErrorMsg').innerHTML="";
        villeERR=0;
    }
    verifFormulaire();
}
);
email.addEventListener('change',(modif)=>{
    if (modif.target.value.match(regexEmail)==null && modif.target.value!=""){
        document.getElementById('emailErrorMsg').innerHTML="Erreur: Renseigner une adresse mail.";
        emailERR=1;
    }
    else {
        document.getElementById('emailErrorMsg').innerHTML="";
        emailERR=0;
    }
    verifFormulaire();
}
);


const verifFormulaire = () =>{
    console.log(prenomERR+nomERR+adresseERR+villeERR+emailERR);
    if (prenomERR+nomERR+adresseERR+villeERR+emailERR>0){
    document.getElementById('order').disabled=true;
    console.log('pb');
    }
    else {
        document.getElementById('order').disabled=false;
        console.log('pas pb');
    }
}
;
bouton.addEventListener('click',(e) => {console.log("envoi");
    
    e.preventDefault();envoiCommande();
});
console.log(window.location.href);

const envoiCommande = () => {
    let produits=[];
    for (Kanap of panier){
        
        produits.push(Kanap.id);
        }
    let commande={
        contact:{
            firstName: prenom.value,
            lastName: nom.value,
            address: adresse.value,
            city: ville.value,
            email: email.value,
            },
        products: produits
    }
        
        console.log("commande:",commande);
    fetch(`http://localhost:3000/api/products/order`,{
        method:'POST',
        headers: {
            "Accept": "application/json",
            'Content-type': 'application/json'
        },
        body: JSON.stringify(commande)
    })
    .then((res)=> {
        if (res.ok) {
          return res.json();
        }
      })
      .then((value) =>{
          console.log("value:",value);
          window.location.href=`./confirmation.html?orderId=${value.orderId}`
      });console.log("contact+produits:",commande);
    //;
}
    //objLinea=JSON.stringify(commande);
    //localStorage.setItem("commande",objLinea)
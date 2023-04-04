//     Déclaration des Variables
let objLinea=localStorage.getItem("canapes");
let panier=JSON.parse(objLinea);
const affichagePanier=document.getElementById("cart__items");
const inputQuantite=document.getElementsByClassName('itemQuantity');
const suppression=document.getElementsByClassName('deleteItem');
let sectionContent="";
let quantiteTotal=0;
let prixTotal=0;


fetch(`http://localhost:3000/api/products/`)   // Recherche les produits du site
.then ((res) => {
    if (res.ok){
        return res.json()
    }
})
.then ((value) => {
    console.log(value);
    affichage(value);         // Affichage du panier, calcul du nombre d'éléments et du prix total
    modifPanier(value);      // Modification du panier
    eraseElement(value);
    calcul(value);           
})
.catch((err) => {
console.log(err);
})
.finally(() => {                       
    console.log('finalement');
    
}
);
    
/**
 * Updates quantity of elements in the cart, price and the localStorage
 * @param {catalogue} Objet
 */
const modifPanier = (catalogue) => {
    for (i=0;i<inputQuantite.length;i++){
        inputQuantite[i].addEventListener('change',(modif)=>{
            console.log('Quantité OK');
            
            let elToModificateId = modif.target.closest('article').dataset.id;
            let elToModificateColor = modif.target.closest('article').dataset.color;
            console.log("id:",elToModificateId,"couleur:",elToModificateColor);
            for (canape of panier){
                if (canape.id===elToModificateId && canape.couleur===elToModificateColor){
                    if ( modif.target.value<=0 || modif.target.value>100){
                        alert("Erreur: Le nombre de canapes doit être compris entre 1 et 100");
                        location.reload();
                    }
                    else{
                        canape.quantite=modif.target.value;
                        console.log("trouvé:",canape);
                        objLinea=JSON.stringify(panier);
                        localStorage.setItem("canapes",objLinea);
                    }
                }
            }
           /*document.getElementById('totalQuantity').innerHTML=quantiteTotal;
            document.getElementById('totalPrice').innerHTML=prixTotal;*/
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
            console.log('Suppression OK',panier);
            
            
            
            panier.splice(i,1);
            console.log('panier',panier,'supp:');
            let elToModificate= sel.target.closest('#cart__items');
            elToModificate.innerHTML="";
            console.log("id:",elToModificate);
            objLinea=JSON.stringify(panier);
            localStorage.setItem("canapes",objLinea);
            location.reload();
            affichage(catalogue);
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
                console.log("id:",canape.id, "nom:",detail.name,"couleur:",canape.couleur,"quantité:",canape.quantite,"prix:",detail.price);
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
                /*quantiteTotal+=Number(canape.quantite);
                prixTotal+=Number(canape.quantite)*Number(detail.price);*/
            }
        }
    }
    affichagePanier.innerHTML=sectionContent;
    calcul(catalogue);
    /*document.getElementById("totalQuantity").innerHTML=quantiteTotal;
    document.getElementById("totalPrice").innerHTML=prixTotal;*/
}

/**
 * Calculate quantity and price
 */
const calcul = (catalogue) => {
    quantiteTotal=0;
    prixTotal=0
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

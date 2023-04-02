let objLinea=localStorage.getItem("canapes");
let objJson=JSON.parse(objLinea);
const nom=document.getElementById("cart__items");
const modifQtite=document.getElementsByClassName('itemQuantity');
const prenom=document.getElementById('firstName');
let sectionContent="";
let quantiteTotal=0;
let prixTotal=0;
let selecteurs=[];
let i=0;

// Displays the selected products with elements form localStorage and API
for (let canape of objJson){/*console.log("id canape boucle: ",canape.id);*/
    fetch(`http://localhost:3000/api/products/${canape.id}`)
    .then ((res)=>{
        if (res.ok){
            return res.json()
        }
    })
    .then ((value)=>{/*console.log("valeur: ",value);*/
        // Affichage des éléments sélectionnés dans le panier, 
        // calcul du nombre d'éléments et du prix total
        affichage(value); 
        document.getElementById("totalQuantity").innerHTML=quantiteTotal;/*console.log(quantiteTotal);*/
        document.getElementById("totalPrice").innerHTML=prixTotal;
        
        return modifQtite[i];
    })
    .catch((err)=>{
        console.log(err);
    });
    
/**
 * Updates quantity of elements ine the cart, price and the localStorage
 */
const modification = () =>{
    console.log('Essai OK');
   }
  

/**
 * Writes HTML for each product in the cart
 * @param {maSelection} Objet
 */
    const affichage=(maSelection)=>{
        sectionContent=sectionContent+
        `<article class="cart__item" data-id="${canape.id}" data-color="${canape.couleur}">
            <div class="cart__item__img">
                <img src="${maSelection.imageUrl}" alt="Photographie d'un canapé";
            </div>
            <div class="cart__item_content">
                <div class="cart__item__content__description">
                    <h2>${maSelection.name}</h2>
                    <p>${canape.couleur}</p>
                    <p>${maSelection.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantité: </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" 
                            min="1" max="100" value=${canape.quantite}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>    
        </article>`;
        nom.innerHTML=sectionContent;
        quantiteTotal+=Number(canape.quantite);
        prixTotal+=Number(canape.quantite)*Number(maSelection.price);
        // Allows quantity to be modified
        selecteurs.push(modifQtite[i]);
        modifQtite[i].addEventListener('change',modification);
        console.log("selecteurs:",selecteurs);
        i++;
    }
}

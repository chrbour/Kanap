let objLinea=localStorage.getItem("canapes");
let objJson=JSON.parse(objLinea);
const nom=document.getElementById("cart__items");
let sectionContent="";

// Displays the selected products
for (let canape of objJson){console.log("id canape boucle: ",canape.id);
    fetch(`http://localhost:3000/api/products/${canape.id}`)
    .then ((res)=>{
        if (res.ok){
            return res.json()
        }
    })
    .then ((value)=>{console.log("valeur: ",value);
        /*console.log("id canape: ",canape.id," objJson:",objJson);*/
        affichage(value);
    })
    .catch((err)=>{
        console.log(err)
    });

    const affichage=(maSelection)=>{console.log("canape:",canape.id);
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
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${canape.quantite}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>    
        </article>`;
        nom.innerHTML=sectionContent;
    }
}
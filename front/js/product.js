let str = document.location.href;
let url = new URL(str);
let recupId = url.searchParams.get("id");
let urlPanier=url.origin+"/front/html/cart.html";

// fetches datas from API of the specified id
fetch(`http://localhost:3000/api/products/${recupId}`)
    .then ((res)=>{
        if (res.ok){
            return res.json();
        }
    })
    .then ((value)=>{
        product(value);
    })
    .catch((err)=>{
        console.log(err)
    });

/**
 * Displays informations of the selected product
 * @param {canape} Object 
 */
const product = (canape) =>{
    let image = canape.imageUrl;
    let altImage = canape.altTxt;
    let name = canape.name;
    let description = canape.description;
    let price=canape.price;
    let couleurs = canape.colors;
    const photo=document.getElementsByClassName('item__img');
    const titre=document.getElementById('title');
    const prix=document.getElementById('price');
    const texte=document.getElementById('description');
    const couleurCanape = document.getElementById('colors');
    photo[0].innerHTML=`<img src="${image}" alt="${altImage}">`;
    titre.innerHTML=name;
    prix.innerHTML=price;
    texte.innerHTML=description;
    for (couleur of couleurs){
        let newOption=document.createElement('option');
        newOption.value=couleur;
        newOption.textContent=couleur;
        couleurCanape.appendChild(newOption);
    }
}

// Check quantity, color and push it in the cart
const mybutton=document.querySelector('button');
mybutton.addEventListener('click', panier =>{
    let id=recupId;
    let quantite=document.getElementById('quantity').value;
    quantite=Number(quantite);
    let couleur=document.getElementById('colors').value;
    if (couleur==""){
        alert("Erreur: La couleur doit être renseignée.");
        document.removeEventListener('click',panier);
        location.reload();
    }
    else if (quantite<=0 || quantite>100){
            alert("Erreur: Le nombre de canapes doit être compris entre 1 et 100.");
            document.removeEventListener('click',panier);
            location.reload();
    }
    else{
        let objLinea=localStorage.getItem("canapes");
        let objJson=JSON.parse(objLinea);
        let canape={
            id: id,
            quantite: quantite,
            couleur: couleur
        }
        if (objJson==null){
            let produit=[];
            produit.push(canape);
            objLinea=JSON.stringify(produit);
            localStorage.setItem("canapes",objLinea);
        }
        else{
            for (let i in objJson){
                if (objJson[i].id===id && objJson[i].couleur===couleur){
                    let nombre=Number(objJson[i].quantite);
                    nombre+=quantite;
                    objJson[i].quantite=nombre;
                    objLinea=JSON.stringify(objJson);
                    localStorage.setItem("canapes",objLinea);
                    window.location.href=urlPanier;
                    return;
                }
            }
            objJson.push(canape);
            objLinea=JSON.stringify(objJson);
            localStorage.setItem("canapes",objLinea);
        } 
        window.location.href=urlPanier;
    }   
}
);
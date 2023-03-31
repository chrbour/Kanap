let str = document.location.href;
let url = new URL(str);
let recupId = url.searchParams.get("id");

// fetches datas from API of the specified id
fetch(`http://localhost:3000/api/products/${recupId}`)
    .then ((res)=>{
        if (res.ok){
            return res.json();
        }
    })
    .then ((value)=>{
        console.log(value);
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
    photo[0].innerHTML=`<img src="${image}" alt="${altImage}">`;
    titre.innerHTML=name;
    prix.innerHTML=price;
    texte.innerHTML=description;
    console.log(image,altImage, name,description,price,couleurs);
    colorCanape(couleurs);
}

/**
 * Defines the list of available colors
 * @param {couleurs} array
 */
const colorCanape=(couleurs)=>{
    const couleurCanape = document.getElementById('colors');
    for (couleur of couleurs){
        let newOption=document.createElement('option');
        newOption.value=couleur;
        newOption.textContent=couleur;
        couleurCanape.appendChild(newOption);
    }
}

const mybutton=document.querySelector('button');
mybutton.addEventListener('click', panier =>{
    let id=canape._id;
    let quantite=document.getElementById('quantity').value;
    let couleur=document.getElementById('colors').value;
    
    if (quantite==0 || couleur==""){
        alert("La couleur ET le nombre d'articles doivent être renseignés.");
        document.removeEventListener('click',panier);
    }
    else{
        let objLinea=localStorage.getItem("canapes");
        let objJson=JSON.parse(objLinea);
        console.log(objJson);
        let produit=[];
        if (objJson!=null){
            produit.push(objJson);
        }
        let canape={
            id: id,
            quantite: quantite,
            couleur: couleur
        }
        produit.push(canape);
        console.log(produit);
        objLinea=JSON.stringify(produit);
        localStorage.setItem("canapes",objLinea)
    } 
}
);

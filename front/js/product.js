let str = document.location.href;
let url = new URL(str);
let recupId = url.searchParams.get("id");

// fetches datas from API
fetch("http://localhost:3000/api/products")
    .then(function(res){
        if (res.ok){
            return res.json();
        }
    })
    .then (function(value){
        product(value);
        console.log(value);
    })
    .catch(function(err){
        console.log(err)
    });

/**
 * Displays informations of the selected product
 * @param {canapes} Object 
 */
const product = (canapes) => {
    for(canape of canapes){
        if (canape._id === recupId){
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
            colorCanape(couleurs);
            return canape._id;
        }
    }
}

/**
 * Defines the list of available colors
 * @param {couleurs} array
 */
function colorCanape(couleurs){
    const couleurCanape = document.getElementById('colors');
    for (couleur of couleurs){
        switch (couleur){
            case 'Blue': couleur='bleu'; break;
            case 'Black': couleur='noir'; break;
            case 'Black/Yellow': couleur='noir et jaune'; break;
            case 'Black/Red': couleur='noir et rouge'; break;
            case 'Green': couleur='vert'; break;
            case 'Red': couleur='rouge'; break;
            case 'Orange': couleur='orange'; break;
            case 'Pink': couleur='rose'; break;
            case 'White': couleur='blanc'; break;
            case 'Grey': couleur='gris'; break;
            case 'Purple': couleur='violet'; break;
            case 'Navy': couleur='bleu marine'; break;
            case 'Silver': couleur='gris argent'; break;
            case 'Brown': couleur='marron'; break;
            case 'Yellow': couleur='jaune'; break;
        } 
        let newOption=document.createElement('option');
        newOption.value=couleur;
        newOption.textContent=couleur;
        couleurCanape.appendChild(newOption);
    }
}



const mybutton=document.querySelector('button');
mybutton.addEventListener('click', panier =>{
    console.log('bouton cliqué');
    let id=canape._id;
    let quantite=document.getElementById('quantity').value;
    let couleur=document.getElementById('colors').value;
    
    if (quantite==0 || couleur==""){
        alert("La couleur ET le nombre d'articles doivent être renseignés.");
        document.removeEventListener('click',panier);
        location.reload();console.log(id, quantite, couleur);
    }
    else{
        let mesCanapes=localStorage.mesCanapes;
        console.log(mesCanapes);
    }
});

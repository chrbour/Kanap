// fetches datas from API
fetch("http://localhost:3000/api/products")
    .then ((res)=>{
        if (res.ok){
            return res.json()
        }
    })
    .then ((value)=>{
        products(value)
    })
    .catch((err)=>{
        alert("Impossible de communiquer avec l'API.\nVérifier que le port 3000 est activé.")
    });

/**
 * Displays the list of products extracted from API
 * @param {canapes} Object 
 *  */    
const products = (canapes) => {
    const articles = document.getElementById("items");
    let listArticles = "";
    for(canape of canapes){
        let image = canape.imageUrl;
        let altImage = canape.altTxt;
        let name = canape.name;
        let description = canape.description;
        let id = canape._id;
        let article = 
            `<a href="./product.html?id=${id}">
                <article>
                    <img src="${image}" alt="${altImage}">
                    <h3 class="productName">${name}</h3>
                    <p class="productDescription">${description}</p>
                </article>
            </a>`;
        listArticles = listArticles + article;
    }
    articles.innerHTML = listArticles;
}
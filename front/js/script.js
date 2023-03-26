// fetches datas from API
fetch("http://localhost:3000/api/products")
    .then(function(res){
        if (res.ok){
            return res.json()
        }
    })
    .then (function(value){
        console.log(value);
        products(value)
    })
    .catch(function(err){
        console.log(err)
    });

/**
 * Displays the list of products extracted from API
 * @param {canapes} Object 
 *  */    
const products = (canapes) => {
    let articles = document.getElementById("items");
    let listArticles = "";
    for(canape of canapes){
        let image = canape.imageUrl; console.log(image);
        let altImage = canape.altTxt; console.log(altImage);
        let name = canape.name; console.log(name);
        let description = canape.description; console.log(description);
        let id = canape._id; console.log(id);
        let article = 
            `<!-- <a href="./product.html?id=${id}"> -->
                <article>
                    <img src="${image}" alt="${altImage}">
                    <h3 class="productName">${name}</h3>
                    <p class="productDescription">${description}</p>
                </article>
            <!-- </a> -->`;
        listArticles = listArticles + article;
    }
    articles.innerHTML = listArticles;
}
let str = document.location.href;
let url = new URL(str);
let recupOrderId = url.searchParams.get("orderId");

document.getElementById('orderId').innerHTML=recupOrderId;


let categoryListElement = document.querySelector("aside ul")  
let productsElement=document.querySelector(".products")
let  currentSlug
let getProducts=( catSlug='')=>{
    let apiUrl;
    if (catSlug=='') {
        apiUrl=`https://dummyjson.com/products`
        
    }
else{
    apiUrl=`https://dummyjson.com/products/category/${catSlug}`
}
 fetch(apiUrl)
.then((res) => res.json())
.then((finalres)=>{
    let{products}=finalres
    let productsList =''
    products.forEach((object)=>{
        productsList += ` <div class="productItems">
                    <img src="${object.thumbnail}">
                   
                    <div class="priceCart">
                        <b>${object.price}</b>
                        <button>Add to cart</button>
                        </div>
                         <h3>${object.title}</h3>
                    </div>`
    })
    productsElement.innerHTML=productsList
    

})


}




let getCategory=()=>{
    fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
.then((finalres)=>{
    let catList=''
    finalres.forEach(element=>{
        catList+=`<li style="background:${element.slug==currentSlug ? 'red':''}" data-slug="${element.slug}">${element.name}<li/>`
    });
    categoryListElement.innerHTML= catList
});
}
categoryListElement.addEventListener("click",(e)=>{
    if(e.target.tagName=="LI"){
     currentSlug=e.target.getAttribute('data-slug')
     getProducts(currentSlug)
     getCategory()
    }
})
getCategory()
getProducts()
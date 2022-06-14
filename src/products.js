
import '../styles/index.scss';

window.addEventListener("popstate", (e) => {
    const category = e.state;
    loadProducts()
})

const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get("category");

const loadProducts = async () => {
    try {
        const productsUrl = "http://localhost:3000/products"

        const res = await Promise.all([
            fetch("http://localhost:3000/categories"),
            fetch(productsUrl),
        ]);
        const json = await Promise.all([
            res[0].json(),
            res[1].json(),
        ]);

        console.log(json);

        const productsSection = document.getElementById("products");

        // display categories

        const aside = document.getElementsByTagName("aside")


        for (let i = 0; i < json[0].length; i++) {
            const element = json[0][i];
            const a = document.createElement("a");
            a.innerHTML = `${element.name}`
            a.href =`products.html?category=${element.id}`;
            a.className = element.id === category ?  "aside-menu selected-menu" : "aside-menu";
            aside[0].appendChild(a);
        }

        // display products
        for (let i = 0; i < json[1].length; i++) {
            const element = json[1][i];

            if(category){
                if(category === element.category){
                    const itemsDiv = document.createElement("div");
                    itemsDiv.className = "products__item";
                    itemsDiv.innerHTML = `
                        <h2>${element.name}</h2>
                        <img src="${element.imageURL}" alt=" Image of ${element.name}" />
                        <p>${element.description}</p>
                        <span>MRP ${new Intl.NumberFormat("en-IN", {
                            currency: "INR",
                            style: "currency"
                        }).format(element.price)}</span>
                        <button class="btn">Buy Now</button>
                    `;
                    productsSection.appendChild(itemsDiv);
                }
            } else{
                const itemsDiv = document.createElement("div");
                itemsDiv.className = "products__item";
                itemsDiv.innerHTML = `
                    <h2>${element.name}</h2>
                    <img src="${element.imageURL}" alt=" Image of ${element.name}" />
                    <p>${element.description}</p>
                    <span>MRP ${new Intl.NumberFormat("en-IN", {
                        currency: "INR",
                        style: "currency"
                    }).format(element.price)}</span>
                `;
                productsSection.appendChild(itemsDiv);

                const itemsDivBtn = document.createElement("button");
                itemsDivBtn.className = 'btn';
                itemsDivBtn.addEventListener("click", function() {
                    addItemToCart(element)
                })
                itemsDivBtn.innerHTML = "Buy Now";
                itemsDiv.appendChild(itemsDivBtn);
            }
        }



    } catch (error) {
        
    }
}

const addItemToCart =  (item) => {
    // const res =  fetch("http://localhost:3000/addToCart", {
    //     method:'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //       },
    //     body: JSON.stringify(item)
    // }).then((response => 
    //     response.json()
    // )).then((res) => {
    //     console.log(res);
    // })
    let selectedItem = [];
    let cartItems = JSON.parse(localStorage.getItem("cart-items"));
    if(cartItems){
        selectedItem = cartItems;
    }
    if(selectedItem.findIndex(x => x.id === item.id) === -1){
        selectedItem.push(item);
    }else{
        selectedItem[selectedItem.findIndex(x => x.id === item.id)].count = selectedItem[selectedItem.findIndex(x => x.id === item.id)].count + 1;
    }
    localStorage.clear();
    localStorage.setItem("cart-items", JSON.stringify(selectedItem));
    alert("Product added to cart");
    updateCartCount();
}

const loadCartSkeleton = () => {
    let cartItems = JSON.parse(localStorage.getItem("cart-items"));
    let cartSum = 0;
    for (let i = 0; i < cartItems.length; i++) {
        cartSum = cartSum + (cartItems[i].price*cartItems[i].count);        
    }
    const cartContainer = document.getElementById("cartContent");
    cartContainer.innerHTML = "";
    const cartContent = document.createElement('div');
    if(cartItems && cartItems.length > 0){
        cartContent.innerHTML = `
        <div class="modal-content">
        <div id="cart-items">                            
        </div>                        
        <div>
            <img src="static/images/lowest-price.png" alt="Image of lowest price guranteed" />
            <span>You won't find it cheaper anywhere</span>
        </div>
        </div>
        <div class="footer">
            <p>Promo code can be applied on payment page</p>
            <button class="btn btn-flex">
                <span> Proceed to Checkout </span>
                <span> Rs.${cartSum} &nbsp &gt</span>    
            </button>
        </div>
        `
        cartContainer.appendChild(cartContent);
    }else{
        cartContent.innerHTML =         
        ` 
        <div>No Items in your cart </div>
        <p>Your favourite items are just a click away</p>
        <button class="btn">Start Shopping>/button>
        `
        cartContainer.appendChild(cartContent);
    }

}

const loadModal = () => {
    let cartItems = JSON.parse(localStorage.getItem("cart-items"));
    console.log(cartItems);
    if(cartItems && cartItems.length > 0){
        loadCartSkeleton();
        const cart = document.getElementById("cart-items");
        cart.innerHTML = "";
        for (let i = 0; i < cartItems.length; i++) {
            const element = cartItems[i];
            const itemDiv = document.createElement('div');
            itemDiv.className = "cart_items"
            itemDiv.innerHTML = 
            `
                <img src=${element.imageURL} alt=${name} />
                <div>
                    <p>${element.name}</p>
                    <p> <span> - </span>${element.count} <span> + </span> x Rs.${element.price }</p>
                </div>
                <p> Rs.${element.count*element.price} </p>
            `
            cart.appendChild(itemDiv);
        }
    }

    var modal = document.getElementById("myModal");
    var btn = document.getElementsByClassName("cart-view")[0];
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }    
    span.onclick = function() {
        modal.style.display = "none";
    }    
    window.onclick = function (event) {
        if(event.target == modal){
            modal.style.display = "none";
        }
    }
}

const cartIcon = document.getElementById("cart-icon");
cartIcon.addEventListener("click" , loadModal);

const updateCartCount = () => {
    const cartItemsCount = document.getElementsByClassName("cartItemsCount");
    const cartCount = document.createElement('span');
    let cartItems = JSON.parse(localStorage.getItem("cart-items"));
    for (let i = 0; i < cartItemsCount.length; i++) {
        const element = cartItemsCount[i];
        element.innerHTML = `${cartItems ? cartItems.length : 0} items`;        
        cartItemsCount[i].appendChild(cartCount);
    }
}

updateCartCount();
loadModal();
loadProducts()
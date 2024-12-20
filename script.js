let cart = []; 
let total = 0; 
function addToCart(button, productName, productPrice) {
    const confirmationMessage = document.getElementById("confirmation-message");
    if (button.classList.contains("in-cart")) {
        removeFromCart(productName, productPrice);
        button.textContent = "Add to Cart";
        button.classList.remove("in-cart");
        confirmationMessage.textContent = `${productName} has been removed from your cart.`;
        confirmationMessage.style.display = "block";
        setTimeout(() => {
            confirmationMessage.style.display = "none";
        }, 3000);
        return;
    }
    cart.push({ name: productName, price: productPrice });
    button.textContent = "In Cart";
    button.classList.add("in-cart");
    confirmationMessage.textContent = `${productName} has been added to your cart.`;
    confirmationMessage.style.display = "block";
    setTimeout(() => {
        confirmationMessage.style.display = "none";
    }, 3000);
    updateCartUI();
}
function removeFromCart(productName, productPrice) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
}
function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(listItem);
    });
    total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("search-box").addEventListener("input", function (event) {
        const searchQuery = event.target.value.toLowerCase();  
        const products = document.querySelectorAll(".product"); 
        let found = false; 
        products.forEach(product => {
            const productName = product.querySelector("h4").textContent.toLowerCase(); 
            if (productName.includes(searchQuery)) { 
                product.style.display = "block"; 
                found = true;
            } else {
                product.style.display = "none"; 
            }
        });
        if (!found && searchQuery !== "") {
            alert("No products found matching your search.");
        }
    });
});
function toggleCart() {
    const cartPopup = document.getElementById("cart-popup");
    const overlay = document.getElementById("overlay");
    if (cartPopup.style.display === "block") {
        cartPopup.style.display = "none";
        overlay.style.display = "none";
    } else {
        cartPopup.style.display = "block";
        overlay.style.display = "block";
    }
}
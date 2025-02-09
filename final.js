 // Get all necessary elements
const categoryFilter = document.getElementById('category');
const priceFilter = document.getElementById('price');
const ratingFilter = document.getElementById('rating');
const productList = document.querySelectorAll('.product');

// Filter products by category
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);
ratingFilter.addEventListener('change', filterProducts);

function filterProducts() {
    const category = categoryFilter.value;
    const price = priceFilter.value;
    const rating = ratingFilter.value;

    productList.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productPrice = parseFloat(product.getAttribute('data-price'));
        const productRating = parseInt(product.getAttribute('data-rating'));

        let isVisible = true;

        // Filter by category
        if (category !== 'all' && category !== productCategory) {
            isVisible = false;
        }

        // Filter by price
        if (price === 'low-to-high' && productPrice > 50) {
            isVisible = false;
        } else if (price === 'high-to-low' && productPrice < 50) {
            isVisible = false;
        }

        // Filter by rating
        if (rating === 'high-to-low' && productRating < 4) {
            isVisible = false;
        } else if (rating === 'low-to-high' && productRating > 3) {
            isVisible = false;
        }

        // Show or hide product based on filters
        product.style.display = isVisible ? 'block' : 'none';
    });
}

let cartCount = 0;

// Handle cart updates
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount = cart.length;
    document.getElementById('cart-count').textContent = cartCount;
}

document.querySelectorAll('.add-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Get product details
        let product = button.closest('.product');
        let productName = product.querySelector('h3').textContent;
        let productPrice = product.querySelector('p').textContent;

        // Update cart in localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));

        // Refresh cart count
        updateCartCount();
    });
});

// Handle product search
document.getElementById("search").addEventListener("input", function() {
    let searchValue = this.value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let name = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = name.includes(searchValue) ? "block" : "none";
    });
});

// Sorting functionality
document.getElementById("price").addEventListener("change", function() {
    sortProducts("price", this.value);
});
document.getElementById("rating").addEventListener("change", function() {
    sortProducts("rating", this.value);
});

function sortProducts(attribute, order) {
    let products = [...document.querySelectorAll(".product")];
    products.sort((a, b) => {
        let valueA = parseFloat(a.dataset[attribute]);
        let valueB = parseFloat(b.dataset[attribute]);

        return order === "low-to-high" ? valueA - valueB : valueB - valueA;
    });

    let container = document.querySelector(".product-list");
    container.innerHTML = "";
    products.forEach(product => container.appendChild(product));
}

// Load cart count on window load
window.addEventListener("load", () => {
    updateCartCount();
});
    document.addEventListener("DOMContentLoaded", function () {
        // Select all "Buy Now" buttons
        const buyButtons = document.querySelectorAll(".buy-btn");

        buyButtons.forEach(button => {
            button.addEventListener("click", function () {
                // Get the parent product element
                const product = this.closest(".product");
                
                // Extract product details
                const productName = product.querySelector("h3").innerText;
                const productPrice = product.querySelector("p").innerText;

                // Display a confirmation message
                alert(`Thank you for purchasing: ${productName}!
                     \n${productPrice}
                                Visit Again to our ✨"Viral Vault"✨`);

                // Log purchase details (You can later use this to store in a database)
                console.log(`Purchased: ${productName} for ${productPrice}`);
            });
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        let cartCount = 0;
        let cart = []; // Array to store cart items
    
        // Add to Cart Button Functionality
        document.querySelectorAll(".add-cart-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                let product = event.target.closest(".product");
                let productName = product.querySelector("h3").textContent;
                let productPrice = product.querySelector("p").textContent.replace("Price: ", "");
                
                // Add product to cart array
                cart.push({ name: productName, price: productPrice });
    
                // Update cart count
                cartCount++;
                document.getElementById("cart-count").textContent = cartCount;
    
                alert(`${productName} has been added to the cart!`);
            });
        });
    
        // View Details Button Functionality
        document.querySelectorAll(".details-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                let product = event.target.closest(".product");
                let productName = product.querySelector("h3").textContent;
                let productPrice = product.querySelector("p").textContent;
                let productImage = product.querySelector("img").src;
                let productRating = product.querySelector(".rating").textContent;
    
                // Display product details in an alert (You can replace this with a modal)
                let details = `Product: ${productName}\n${productPrice}\nRating: ${productRating}`;
                alert(details);
            });
        });
    });
    
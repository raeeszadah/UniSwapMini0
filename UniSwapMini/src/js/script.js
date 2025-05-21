// Header adjustment for <768px
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".nav-menu");
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        // add hamburger icon
        toggle.innerHTML = `<i class="fa fa-bars"></i>`;
    } else {
        menu.classList.add("active");
        // add X icon
        toggle.innerHTML = `<i class="fa fa-times"></i>`;
    }
}
toggle.addEventListener("click", toggleMenu, false);

// Account Page, hide and show elements when, and if required.
var logForm = document.getElementById("loginForm");
var regForm = document.getElementById("registerForm");
var remLog = document.getElementById("removeLog");
var remReg = document.getElementById("removeReg");

function login() {
    remLog.style.display = "none";
    remReg.style.display = "block";
    logForm.style.display = "flex";
    regForm.style.display = "none";
}

function register() {
    remReg.style.display = "none";
    remLog.style.display = "block";
    regForm.style.display = "flex";
    logForm.style.display = "none";
}

// Preview images for the same product slider
var prodImg = document.getElementById("prodImg");
var smallImg = document.getElementsByClassName("small-img");
for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function () {
        prodImg.src = smallImg[i].src;
    }
}

// === Add to Cart Functionality ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem("userLoggedIn") === "true"; // Adjust this condition based on your login logic
}

// Function to handle adding products to the cart
function addToCart(product) {
    if (!isLoggedIn()) {
        alert("You need to log in to add items to your cart.");
        window.location.href = "./account/index.html"; // Redirect to login page
        return;
    }

    const existingProduct = cart.find(item => item.title === product.title);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        product.quantity = 1; // Set initial quantity
        cart.push(product); // Add new product to cart
    }
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart!`); // Notify user
}

// Event listeners for "Add to Cart" and "Buy Now" buttons
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.childprods'); // Get the closest product element
        const productId = productElement.querySelector('a').getAttribute('href').split('-')[1]; // Extract product ID from the link
        const productName = productElement.querySelector('h4').innerText; // Get product name
        const productPrice = productElement.querySelector('p').innerText; // Get product price

        const product = {
            id: productId,
            title: productName,
            price: productPrice,
            image: productElement.querySelector('img').src // Get product image
        };

        if (!isLoggedIn()) {
            alert("You need to log in to purchase items.");
            window.location.href = "./account/index.html"; // Redirect to login page
            return;
        }

        buyNow(product); // Call buyNow function
    });
});

document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.childprods'); // Get the closest product element
        const productId = productElement.querySelector('a').getAttribute('href').split('-')[1]; // Extract product ID from the link
        const productName = productElement.querySelector('h4').innerText; // Get product name
        const productPrice = productElement.querySelector('p').innerText; // Get product price

        const product = {
            id: productId,
            title: productName,
            price: productPrice,
            image: productElement.querySelector('img').src // Get product image
        };

        addToCart(product); // Call addToCart function
    });
});

// Function to handle "Buy Now" action
function buyNow(product) {
    // Simulate a purchase process
    alert(`You have purchased ${product.title} for ${product.price}!`);
    // Here you can add further logic to handle the purchase, like redirecting to a payment page
}

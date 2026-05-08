const whatsappNumber = "94710921311";

const products = [
  {
    id: 1,
    name: "Quantum Magnetic LED Night Lamp",
    category: "Lighting & Decor",
    price: 2500,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1gHj5phB6Bb_jX2s4YcPWZl8iCaA-dhCpeUAiW_nIjxvbC9PMspux8RRqa_9N1fI8-QwiJdZAXycTKry9IgXLDX9uRF7zZvr73SE6M1s212KGrIhk0UH1hYNunsnTC-pZk-hEe14QA9JRruIEphKVRYfhYND50J09HNAoAyKO62pmHJBQuP-iGpBndYM/s320/LED%20Lamp.jpeg",
    description: "Stylish modern magnetic LED night lamp for bedroom, study table and home decoration.",
    badge: "COD | Free Delivery"
  },
  {
    id: 2,
    name: "Premium Water Bottle",
    category: "Bottles & Drinkware",
    price: 1800,
    image: "https://via.placeholder.com/500x400/f85606/ffffff?text=Water+Bottle",
    description: "Durable daily-use bottle for school, office, gym and travel.",
    badge: "COD Available"
  },
  {
    id: 3,
    name: "Home Cleaning Brush Set",
    category: "Home Essentials",
    price: 1200,
    image: "https://via.placeholder.com/500x400/f85606/ffffff?text=Home+Essential",
    description: "Useful cleaning tool set for everyday home improvement and maintenance.",
    badge: "Special Offer"
  },
  {
    id: 4,
    name: "Kitchen Storage Organizer",
    category: "Kitchen Tools",
    price: 2200,
    image: "https://via.placeholder.com/500x400/f85606/ffffff?text=Kitchen+Tool",
    description: "Smart kitchen organizer to keep your kitchen clean and easy to use.",
    badge: "COD Available"
  },
  {
    id: 5,
    name: "Kids Fun Toy",
    category: "Toys & Kids",
    price: 1500,
    image: "https://via.placeholder.com/500x400/f85606/ffffff?text=Kids+Toy",
    description: "Fun and simple toy item suitable for kids and gift purposes.",
    badge: "New Arrival"
  },
  {
    id: 6,
    name: "Beauty Care Tool",
    category: "Beauty Care",
    price: 2000,
    image: "https://via.placeholder.com/500x400/f85606/ffffff?text=Beauty+Care",
    description: "Useful beauty care item for personal grooming and daily care.",
    badge: "Popular"
  },
  {
    id: 7,
    name: "Smart Mini Gadget",
    category: "Smart Gadgets",
    price: 2800,
    image: "https://via.placeholder.com/500x400/f85606/ffffff?text=Smart+Gadget",
    description: "Smart lifestyle gadget for daily convenience and modern living.",
    badge: "Trending"
  },
  {
    id: 8,
    name: "Special Offer Product",
    category: "Special Offers",
    price: 999,
    image: "https://via.placeholder.com/500x400/f85606/ffffff?text=Special+Offer",
    description: "Limited-time offer product with good value for customers.",
    badge: "Offer"
  }
];

let cart = JSON.parse(localStorage.getItem("apekadeCart")) || [];

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const productTitle = document.getElementById("productTitle");

function formatPrice(price) {
  return "Rs " + Number(price).toLocaleString("en-LK") + ".00";
}

function displayProducts(productList = products) {
  productGrid.innerHTML = "";

  if (productList.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach(product => {
    productGrid.innerHTML += `
      <div class="product-card">
        <span class="product-badge">${product.badge}</span>
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <h4>${formatPrice(product.price)}</h4>
          <div class="product-actions">
            <button onclick="addToCart(${product.id})">Add Cart</button>
            <a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent("I want to order " + product.name + " - " + formatPrice(product.price))}" target="_blank">WhatsApp</a>
          </div>
        </div>
      </div>
    `;
  });
}

function filterProducts(category) {
  if (category === "all") {
    productTitle.textContent = "Shop All Products";
    displayProducts(products);
    return;
  }

  const filtered = products.filter(product => product.category === category);
  productTitle.textContent = category;
  displayProducts(filtered);
}

function searchProducts() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue) ||
    product.category.toLowerCase().includes(searchValue) ||
    product.description.toLowerCase().includes(searchValue)
  );

  productTitle.textContent = "Search Results";
  displayProducts(filteredProducts);
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  cart.push(product);
  saveCart();
  updateCart();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("apekadeCart", JSON.stringify(cart));
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = Number(total).toLocaleString("en-LK") + ".00";
}

function openCart() {
  cartPanel.classList.add("active");
}

function closeCart() {
  cartPanel.classList.remove("active");
}

function sendOrderToWhatsApp() {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();

  if (name === "" || phone === "" || address === "") {
    alert("Please fill your name, phone number and delivery address.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty. Please add products first.");
    return;
  }

  let orderText = "ApeKade New Order\n\n";
  orderText += "Name: " + name + "\n";
  orderText += "Phone: " + phone + "\n";
  orderText += "Address: " + address + "\n\n";
  orderText += "Products:\n";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    orderText += `${index + 1}. ${item.name} - ${formatPrice(item.price)}\n`;
  });

  orderText += "\nTotal: " + formatPrice(total);
  orderText += "\n\nPayment: Cash on Delivery / Confirm through WhatsApp";

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`, "_blank");
}

displayProducts();
updateCart();

let allProducts = [];
let displayedCount = 0;
const productsPerLoad = 5;

const productContainer = document.getElementById("productContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    allProducts = data;
    displayProducts();
}

function displayProducts() {
    const filteredProducts = filterProducts(allProducts);
    const productsToShow = filteredProducts.slice(0, displayedCount + productsPerLoad);

    productContainer.innerHTML = "";
    productsToShow.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
        card.onclick = () => {
            window.location.href = `product.html?id=${product.id}`;
        };
        productContainer.appendChild(card);
    });

    displayedCount = productsToShow.length;
    loadMoreBtn.style.display = displayedCount >= filteredProducts.length ? "none" : "inline-block";
    noResults.style.display = filteredProducts.length ? "none" : "block";
}

function filterProducts(products) {
    const query = searchInput.value.toLowerCase();
    return products.filter(product => product.title.toLowerCase().includes(query));
}

searchInput.addEventListener("input", () => {
    displayedCount = 0;
    displayProducts();
});

loadMoreBtn.addEventListener("click", () => {
    displayProducts();
});

fetchProducts();
import { setLocalStorage, getLocalStorage, calculateDiscountedPrice, getDiscountBadgeHtml, qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Determine category from the page URL or fall back to tents
function getCategory() {
  const path = window.location.pathname;
  if (path.includes('backpack')) return 'backpacks';
  if (path.includes('sleeping-bag') || path.includes('sleeping_bag')) return 'sleeping-bags';
  return 'tents';
}

const dataSource = new ProductData(getCategory());

function productDetailTemplate(product) {
  const discountBadge = getDiscountBadgeHtml(product.discount);
  const discountedPrice = product.discount ? calculateDiscountedPrice(product.FinalPrice, product.discount) : null;
  
  const priceHtml = product.discount 
    ? `<div class="price-container">
         <p class="product-card__price original-price"><s>$${product.FinalPrice}</s></p>
         <p class="product-card__price discounted-price">$${discountedPrice}</p>
       </div>`
    : `<p class="product-card__price">$${product.FinalPrice}</p>`;
  
  return `${discountBadge}
<h3>${product.Brand.Name}</h3>
<h2 class="divider">${product.NameWithoutBrand}</h2>
<img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
${priceHtml}
<p class="product__color">${product.Colors[0].ColorName}</p>
<p class="product__description">${product.DescriptionHtmlSimple}</p>`;
}

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (!cart) {
    cart = [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

// Render product details dynamically
async function renderProductDetail() {
  const productElement = qs(".product-detail");
  const addToCartBtn = qs("#addToCart");
  
  if (productElement && addToCartBtn) {
    const productId = addToCartBtn.dataset.id;
    
    try {
      const product = await dataSource.findProductById(productId);
      if (product) {
        // Insert template content before the add to cart button div
        const templateHtml = productDetailTemplate(product);
        addToCartBtn.parentElement.insertAdjacentHTML('beforebegin', templateHtml);
      }
    } catch (error) {
      console.error("Error rendering product details:", error);
    }
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", async () => {
  // First render the template if we have a product element
  await renderProductDetail();
  
  // Then attach listener to Add to Cart button
  const addToCartBtn = qs("#addToCart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addToCartHandler);
  }
});

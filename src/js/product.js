import { setLocalStorage, getLocalStorage, calculateDiscountedPrice, getDiscountBadgeHtml } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function productDetailTemplate(product) {
  const discountBadge = getDiscountBadgeHtml(product.discount);
  const discountedPrice = product.discount ? calculateDiscountedPrice(product.FinalPrice, product.discount) : null;
  
  const priceHtml = product.discount 
    ? `<div class="price-container">
         <p class="product-card__price original-price"><s>$${product.FinalPrice}</s></p>
         <p class="product-card__price discounted-price">$${discountedPrice}</p>
       </div>`
    : `<p class="product-card__price">$${product.FinalPrice}</p>`;
  
  return `
    ${discountBadge}
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
    ${priceHtml}
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
  `;
}

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (!cart) {
    cart = [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

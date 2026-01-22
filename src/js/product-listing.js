import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// Get category from URL parameter
const category = getParam("category") || "tents";

// Update page title
const categoryNames = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks"
};

const titleElement = document.querySelector("#category-title");
if (titleElement) {
  titleElement.textContent = categoryNames[category] || category;
}

// Load and display products
const listElement = document.querySelector(".product-list");
if (listElement) {
  const productList = new ProductList(category, new ProductData(category), listElement);
  productList.init();
}

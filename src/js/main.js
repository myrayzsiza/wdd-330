import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// This will load header and footer
loadHeaderFooter();

// product listing for tents    
const listElement = document.querySelector(".product-list");
if (listElement) {
  const tentsList = new ProductList("tents", new ProductData("tents"), listElement);
  tentsList.init();
}

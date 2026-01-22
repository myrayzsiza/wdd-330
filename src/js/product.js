import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

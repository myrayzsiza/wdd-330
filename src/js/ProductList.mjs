import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/${product.name ? product.name.toLowerCase().replace(/\s+/g, "-") : "product"}.html">
        <img src="${product.image}" alt="${product.name}" />
        <h3 class="card__brand">${product.brand || ""}</h3>
        <h2 class="card__name">${product.name}</h2>
        <p class="product-card__price">$${product.price}</p>
        <p class="product-card__desc">${product.description || ""}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) {
      console.log(`ProductList: ${this.category} already initialized - skipping`);
      return;
    }
    
    this.initialized = true;
    console.log(`ProductList: Initializing ${this.category}`);
    
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    if (!Array.isArray(list)) return;
    
    console.log(`ProductList: Rendering ${list.length} products for ${this.category}`);
    
    const normalized = list.map((p) => ({
      name: p.Name || p.NameWithoutBrand || "",
      description: p.DescriptionHtmlSimple || "",
      image: p.Image || p.Images?.PrimaryLarge || p.Images?.PrimaryMedium || "",
      price: (p.FinalPrice ?? p.ListPrice ?? p.SuggestedRetailPrice) || "",
      brand: p.Brand?.Name || "",
    }));

    renderListWithTemplate(productCardTemplate, this.listElement, normalized, "beforeend", true);
  }
}

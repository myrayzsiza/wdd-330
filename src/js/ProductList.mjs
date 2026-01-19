import { renderListWithTemplate, getDiscountBadgeHtml, calculateDiscountedPrice } from './utils.mjs';

function productCardTemplate(product) {
  const discountBadge = getDiscountBadgeHtml(product.discount);
  const discountedPrice = product.discount ? calculateDiscountedPrice(product.FinalPrice, product.discount) : product.FinalPrice;
  
  return `
    <li class="product-card">
      ${discountBadge}
      <a href="product_pages/${product.Id}.html">
        <img src="/images/${product.Image}" alt="${product.NameWithoutBrand}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">${product.discount ? `<s>$${product.FinalPrice}</s> $${discountedPrice}` : `$${product.FinalPrice}`}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const html = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, html);
}

export function calculateDiscountedPrice(price, discountPercent) {
  return (price * (1 - discountPercent / 100)).toFixed(2);
}

export function getDiscountBadgeHtml(discount) {
  if (!discount) return '';
  return `<span class="discount-badge">${discount}% OFF</span>`;
}


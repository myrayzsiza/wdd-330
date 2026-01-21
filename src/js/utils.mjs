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

// Render a list of items using a template function into a parent element
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  const html = list.map((item) => templateFn(item)).join("");
  parentElement.insertAdjacentHTML(position, html);
}

// get a parameter from the URL query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
// Fetch an HTML partial and return it as text
export async function loadTemplate(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${url}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading template:", error);
    return "";
  }
}

// Insert a single template into the DOM at a specified element
export function renderWithTemplate(template, parentElement, position = "afterbegin") {
  if (!parentElement) return;
  parentElement.insertAdjacentHTML(position, template);
}

// Load header and footer templates and render them
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/public/partials/header.html");
  const footerTemplate = await loadTemplate("/public/partials/footer.html");

  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");

  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement, "afterbegin");
  }
  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement, "afterbegin");
  }
}
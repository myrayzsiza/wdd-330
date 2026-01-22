function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    // accept either 'tents' or 'tents.json'
    this.path = category && category.toLowerCase().endsWith(".json")
      ? `../public/json/${category}`
      : `../public/json/${category}.json`;
  }
  
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
        // Handle both array format (tents.json) and API format with Result property
        if (Array.isArray(data)) {
          return data;
        } else if (data.Result && Array.isArray(data.Result)) {
          return data.Result;
        }
        return [];
      });
  }
  
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}


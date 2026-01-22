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
    this.cachedData = null; // Cache to prevent multiple fetches
    // accept either 'tents' or 'tents.json'
    this.path = category && category.toLowerCase().endsWith(".json")
      ? `../public/json/${category}`
      : `../public/json/${category}.json`;
  }
  
  getData() {
    // Return cached data if already fetched
    if (this.cachedData) {
      console.log(`ProductData: Using cached data for ${this.category}`);
      return Promise.resolve(this.cachedData);
    }
    
    console.log(`ProductData: Fetching data for ${this.category}`);
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
        // Handle both array format (tents.json) and API format with Result property
        if (Array.isArray(data)) {
          this.cachedData = data;
          return data;
        } else if (data.Result && Array.isArray(data.Result)) {
          this.cachedData = data.Result;
          return data.Result;
        }
        this.cachedData = [];
        return [];
      });
  }
  
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}

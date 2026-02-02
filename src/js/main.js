import { loadHeaderFooter } from "./utils.mjs";

// This will load header and footer
loadHeaderFooter();

// The homepage displays static category cards
// No product rendering needed here
console.log("Homepage loaded - category cards are static");

import Alert from "Alert.js"; // Import the Alert class

// Load alerts from alerts.json
fetch("./alerts.json")
  .then(response => response.json())
  .then(data => {
    const alert = new Alert(data); // Create an instance
    alert.render();                // Render alerts to the page
  })
  .catch(err => console.error("Error loading alerts:", err));

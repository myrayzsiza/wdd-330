export default class Alert {
  constructor(alerts) {
    this.alerts = alerts;
  }

  render() {
    if (!this.alerts || this.alerts.length === 0) return;

    // Create section
    const section = document.createElement("section");
    section.classList.add("alert-list");

    // Loop through alerts
    this.alerts.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    // Prepend to main
    const main = document.querySelector("main");
    if (main) {
      main.prepend(section);
    }
  }
}

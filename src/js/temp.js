class Alert {
  constructor({ message, background, color = 'black' }) {
    this.message = message;
    this.background = background;
    this.color = color;
  }

  static renderAll(alerts) {
    if (!alerts || alerts.length === 0) return [];
    return alerts.map(alertObj => {
      const alert = new Alert(alertObj);
      return alert.render();
    });
  }

  render() {
    const alertDiv = document.createElement('div');
    alertDiv.textContent = this.message;
    alertDiv.style.background = this.background;
    alertDiv.style.color = this.color;
    alertDiv.style.padding = '1em';
    alertDiv.style.margin = '1em 0';
    alertDiv.style.borderRadius = '4px';
    alertDiv.style.fontWeight = 'bold';
    alertDiv.setAttribute('role', 'alert');
    return alertDiv;
  }
}

export default Alert;



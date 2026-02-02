import Alert from './Alert.js';

fetch('/alerts.json')
  .then(res => res.json())
  .then(alerts => {
    const container = document.getElementById('alerts');
    alerts.forEach(alertData => {
      const alert = new Alert(alertData);
      container.appendChild(alert.render());
    });
  })
  .catch(err => console.error('Error loading alerts:', err));

const weatherApi = "https://api.weather.gov/alerts/active?area=";


const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const results = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");


function clearUI() {
  results.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

async function fetchWeatherAlerts(state) {
  const response = await fetch(`${weatherApi}${state}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather alerts");
  }

  const data = await response.json();
  return data;
}


function displayAlerts(data) {
  const count = data.features.length;

  
  const title = document.createElement("h2");
  title.textContent = `Weather Alerts: ${count}`;
  results.appendChild(title);

  // list of alerts
  const list = document.createElement("ul");

  data.features.forEach((alert) => {
    const item = document.createElement("li");
    item.textContent = alert.properties.headline;
    list.appendChild(item);
  });

  results.appendChild(list);
}

// show error message
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}


button.addEventListener("click", async () => {
  const state = input.value.trim().toUpperCase();

  clearUI();

  
  if (!state) {
    showError("Please enter a state code");
    return;
  }

  try {
    const data = await fetchWeatherAlerts(state);

    displayAlerts(data);

    // clear input after success
    input.value = "";
  } catch (error) {
    showError(error.message);
  }
});
let BASE_URL = "https://api.weather.gov/alerts/active?area=";

let input = document.getElementById("state-input");
let button = document.getElementById("fetch-alerts");
let results = document.getElementById("alerts-display");
let errorDiv = document.getElementById("error-message");

// clear UI
function clearUI() {
  results.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

// fetch data
async function getAlerts(state) {
  let response = await fetch(BASE_URL + state);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  let data = await response.json();
  return data;
}

// display alerts
function showAlerts(data) {
  let count = data.features.length;

  // summary message (IMPORTANT for tests)
  let summary = document.createElement("h2");
  summary.textContent = data.title + ": " + count;
  results.appendChild(summary);

  // list
  let list = document.createElement("ul");

  data.features.forEach(function(alert) {
    let item = document.createElement("li");
    item.textContent = alert.properties.headline;
    list.appendChild(item);
  });

  results.appendChild(list);
}

// show error
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

// button click
button.addEventListener("click", async function() {
  let state = input.value.trim().toUpperCase();

  clearUI();

  // input validation (simple)
  if (state === "" || state.length !== 2) {
    showError("Enter a valid state code");
    return;
  }

  try {
    let data = await getAlerts(state);

    showAlerts(data);

    input.value = ""; // clear input
  } catch (err) {
    showError(err.message);
  }
});
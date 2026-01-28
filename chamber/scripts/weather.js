// weather.js

const currentTempEl = document.querySelector("#current-temp");
const weatherDescEl = document.querySelector("#weather-desc");
const forecastEl = document.querySelector("#forecast");

// Lehi, UT (approx.)
const lat = 40.391617;
const lon = -111.850769;

const apiKey = "a7b45be961c8c345340384f9bcf8459b";
const units = "imperial"; // Fahrenheit

const currentUrl =
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

function capitalizeWords(text) {
  return text
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDay(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { weekday: "short" });
}

function pick3DayForecast(list) {
  const picks = [];
  const usedDays = new Set();

  // Prefer entries around 12:00:00
  for (const item of list) {
    if (!item.dt_txt.includes("12:00:00")) continue;

    const dayKey = item.dt_txt.split(" ")[0];
    if (usedDays.has(dayKey)) continue;

    usedDays.add(dayKey);
    picks.push(item);

    if (picks.length === 3) break;
  }

  // Fallback: grab first available unique days
  if (picks.length < 3) {
    for (const item of list) {
      const dayKey = item.dt_txt.split(" ")[0];
      if (usedDays.has(dayKey)) continue;

      usedDays.add(dayKey);
      picks.push(item);

      if (picks.length === 3) break;
    }
  }

  return picks;
}

async function loadWeather() {
  try {
    // Current weather
    const currentRes = await fetch(currentUrl);
    if (!currentRes.ok) {
      throw new Error(`Current weather failed: ${currentRes.status} ${currentRes.statusText}`);
    }
    const currentData = await currentRes.json();

    currentTempEl.textContent = Math.round(currentData.main.temp);
    weatherDescEl.textContent = capitalizeWords(currentData.weather[0].description);

    // Forecast
    const forecastRes = await fetch(forecastUrl);
    if (!forecastRes.ok) {
      throw new Error(`Forecast failed: ${forecastRes.status} ${forecastRes.statusText}`);
    }
    const forecastData = await forecastRes.json();

    const picks = pick3DayForecast(forecastData.list);

    forecastEl.innerHTML = "";
    picks.forEach(item => {
      const day = formatDay(item.dt_txt);
      const t = Math.round(item.main.temp);

      const li = document.createElement("li");
      li.innerHTML = `<strong>${day}:</strong> ${t}°F`;
      forecastEl.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    weatherDescEl.textContent = "Weather unavailable.";
  }
}

// Guard: avoid runtime errors if the HTML IDs are missing
if (!currentTempEl || !weatherDescEl || !forecastEl) {
  console.warn("Weather elements not found. Check #current-temp, #weather-desc, and #forecast in your HTML.");
} else {
  loadWeather();
}

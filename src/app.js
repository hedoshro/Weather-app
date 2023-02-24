function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  return `last updated: ${day} ${hours}:${minutes}:${seconds}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastDaily = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = ` <div class="row">`;

  forecastDaily.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="forecast-date"> ${formatDay(forecastDays.time)}</div>
        <img
          src=${forecastDays.condition.icon_url}
          alt=""
          width="42"
          class="forecast-icon"
        />
        <div class="forecast-temp">
          <span class="forecast-max">${Math.round(
            forecastDays.temperature.maximum
          )} °</span>
          <span class="forecast-min"> ${Math.round(
            forecastDays.temperature.minimum
          )}°</span>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates, prevUnits) {
  let apiKey = "a49f0cad903e09dc8e1t8o40aab88ab3";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response);

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML = `Humidity:
    ${response.data.temperature.humidity} %`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  let img = document.querySelector("#icon");
  img.setAttribute("src", `${response.data.condition.icon_url}`);
  let imgAlt = document.querySelector("#icon");
  imgAlt.setAttribute("alt", `${response.data.condition.description}`);
  getForecast(response.data.coordinates);
}
function showDetail(city) {
  let apiKey = "a49f0cad903e09dc8e1t8o40aab88ab3";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city-input").value;
  showDetail(input);
}
document.querySelector("#search-form").addEventListener("submit", search);

showDetail("new york");

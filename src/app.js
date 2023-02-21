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
function displayTemperature(response) {
  console.log(response);

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  ctemp = response.data.temperature.current;

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

function showFarenheite(event) {
  event.preventDefault();
  let convertFarenheit = (ctemp * 9) / 5 + 32;
  celcius.classList.remove("active");
  celcius.classList.add("active");

  document.querySelector("#temperature").innerHTML =
    Math.round(convertFarenheit);
}

let ctemp = null;

let farenheite = document.querySelector("#faren");
farenheite.addEventListener("click", showFarenheite);

function showecelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  celcius.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(ctemp);
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showecelcius);

function displayTemperature(response) {
  console.log(response);
  console.log(response.data.temperature.current);
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
}
let apiKey = "a49f0cad903e09dc8e1t8o40aab88ab3";
let city = "istanbul";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

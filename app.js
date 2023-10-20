const FORM = document.querySelector("form");
const userInput = FORM.querySelector("input");
let weatherDetails = document.querySelector(".weather-details");
let MAIN = document.querySelector("main");

FORM.addEventListener("submit", async (e) => {
  e.preventDefault();
  MAIN.style.display = "flex";
  weatherDetails.style.display = "flex";

  const API_KEY = "399a84855a911bcb58ce3fac8f81f8ad";
  const LOCATION = userInput.value;
  const API_URL =
    "https://api.openweathermap.org/data/2.5/weather?units=metric";

  try {
    const temp = document.querySelector("main .temp");
    const city = document.querySelector("main .location_name");
    const humidity = document.querySelector(".weather-details .percentage");
    const windSpeed = document.querySelector(".windspeed .speed");
    const displayError = document.querySelector(".error");
    const image = document.querySelector("main .weather_img img");

    const response = await fetch(`${API_URL}&q=${LOCATION}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);

    temp.textContent = `${Math.round(data.main.temp)}°C`;
    city.textContent = data.name;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed}km/h`;
    displayError.style.display = "none";

    const weatherArr = [
      "clear",
      "clouds",
      "drizzle",
      "humidity",
      "mist",
      "rain",
      "search",
      "snow",
      "wind",
    ];

    weatherArr.forEach((condition) => {
      if (data.weather[0].main.toLowerCase() === condition) {
        image.src = `/images/${condition}.png`;
      }
    });
  } catch (error) {
    const displayError = document.querySelector(".error");
    displayError.style.display = "block";
    MAIN.style.display = "none";
    weatherDetails.style.display = "none";
  }
});

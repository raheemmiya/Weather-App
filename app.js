const dateElement = document.getElementById("date-heading");
const cityElement = document.getElementById("area-heading");
const weatherElement = document.getElementById("weather-heading");
const temperatureElement = document.getElementById("temperature");
const button = document.getElementById("search-btn");
const input = document.getElementById("input-area");
const message = document.getElementById("message");

const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");
const localTimeElement = document.getElementById("local-time");
const timeZoneIDElement = document.getElementById("time-zone-id");
const feelsLikeElement = document.getElementById("feels-like");


function changeDate() {
  const date = new Date();
  let dateFormat = `${date.toLocaleDateString("en-US", {
    weekday: "long",
  })}, ${date.toLocaleDateString("en-US", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  dateElement.innerHTML = dateFormat;
}

changeDate();


button.addEventListener("click", async () => {

  await getInfo(input.value);
});

async function getInfo(city) {
  
  try {

    const access_key = "ca10c1945ef8b6cb5838dcda93a276d7";
    let promise = await fetch(
      `https://api.weatherstack.com/current?access_key=${access_key}&query=${city}`
    );
    
    let response = await promise.json();
    console.log(response);
    setData(response);

  } catch (error) {
    message.innerText= "API limit reached Sorry I cannot do nothing :)";
}
}

function setData(response) {
  let windSpeed = response.current.wind_speed;
  let feelsLike = response.current.feelslike;
  let localTime = response.location.localtime;
  let localTimeId = response.location.timezone_id;
  let humidity = response.current.humidity;
  let country = response.location.country; 
  let city = response.location.name;

  windSpeedElement.innerText = `Wind Speed: ${windSpeed}m/s`;
  feelsLikeElement.innerText = `FeelsLike: ${feelsLike}°C`;
  localTimeElement.innerText = `Local Time: ${localTime}`;
  timeZoneIDElement.innerText = `Time Zone Id: ${localTimeId}`;
  humidityElement.innerText = `Humidity: ${humidity}%`;
  cityElement.innerText =  `${city} / ${country}`;

  let temperature = response.current.temperature;
  temperatureElement.innerText = `${temperature} °C`;
}

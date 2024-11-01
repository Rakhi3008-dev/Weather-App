let cityNameDisplay = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_feelslike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNames.of(code);
};

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city = 'Pune';
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityInput = document.querySelector(".city_name"); 
  console.log(cityInput.value); 
  city = cityInput.value;
  getWeatherData(); 

  cityInput.value = ""; 
});

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bef203955e2fd1eefa01bf7f35f79f87&units=metric`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();


    console.log(data);

    const { main, name, sys, dt, weather, wind } = data; 

    cityNameDisplay.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon">`;

    w_temperature.innerHTML = `${main.temp}&#176;C`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176;C`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176;C`;
    w_feelslike.innerHTML = `Feels like: ${main.feels_like.toFixed(2)}&#176;C`;
    w_humidity.innerHTML = `Humidity: ${main.humidity}%`;

    w_wind.innerHTML = `Wind Speed: ${wind.speed} m/s`;
    w_pressure.innerHTML = `Pressure: ${main.pressure} hPa`;

  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getWeatherData);

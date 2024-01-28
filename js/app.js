const myKey = config.MY_KEY;
const secretKey = config.SECRET_KEY;

const apiKey = myKey + secretKey;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

// dom selection variable
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// weather checking function
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    setTimeout(() => {
      document.querySelector(".error").style.display = "none";
    }, 2000);
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    // updating data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherIconImage = data.weather[0].main;
    // console.log(weatherIconImage);
    switch (weatherIconImage) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;

      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;

      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;

      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;

      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;

      case "Haze":
        weatherIcon.src = "images/haze.png";
        break;

      default:
        break;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// search button events
searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

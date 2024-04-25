document.addEventListener("DOMContentLoaded", function() {
  const apikey = "66b273ffe86e89530ace705351a34ec2";
  const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
  const searchbox = document.querySelector(".search input");
  const searchbtn = document.querySelector(".search button");
  const cityElement = document.querySelector(".city");
  const tempElement = document.querySelector(".temp");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");
  const weatherIcon = document.querySelector(".weather-icon"); // Added . before weather-icon
  const errorElement = document.querySelector(".error");

  // Hide error message by default
  errorElement.style.display = "none";

  async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    
    if(response.status == 404){
      errorElement.style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return; // Exit function if city not found
    }
    
    var data = await response.json();

    // Update HTML elements with weather data
    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "°C";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + "km/hr";

    // Update weather icon based on weather condition
    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "../components/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "../components/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "../components/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "../components/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "../components/mist.png";
        break;
      case "Smoke":
        weatherIcon.src = "../components/smoke.png";
        break;
      case "Haze":
        weatherIcon.src = "../components/haze.png";
        break;
      default:
        weatherIcon.src = "../components/sun.png"; // Default image if none of the above conditions are met
        break;
    }

    // Show the weather information
    document.querySelector(".weather").style.display = "block";
    errorElement.style.display = "none";
  }

  searchbtn.addEventListener("click", () => {
    const city = searchbox.value;
    checkWeather(city);
  });

  // Add event listener for Enter key press
  searchbox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const city = searchbox.value;
      checkWeather(city);
    }
  });
});

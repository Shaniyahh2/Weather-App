document.addEventListener("DOMContentLoaded", () => {
    // const containerApp = document.querySelector(".small-container");
    const containerApp = document.querySelector(".whole-container");
    const temp = document.querySelector(".temp-details");
    const dateShow = document.querySelector(".date");
    const timeShow = document.querySelector(".time");
    const conditionShow = document.querySelector(
      ".city-name-time-date-information"
    );
    const nameShow = document.querySelector(".city-name");
    const iconShow = document.querySelector(".weather-icon-information img");
    const cloudShow = document.querySelector(".cloud");
    const humidityShow = document.querySelector(".humidity");
    const windShow = document.querySelector(".wind");
    const form = document.querySelector(".check-location");
    const search = document.querySelector(".search-here");
    const citiesShow = document.querySelectorAll(".city");
  
    let cityInput = "MANALI";
  
    citiesShow.forEach((city) => {
      city.addEventListener("click", (evt) => {
        cityInput = evt.target.innerHTML;
        fetchWeatherData();
        containerApp.style.opacity = "0";
      });
    });
  
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (search.value.length === 0) {
        alert("Please type in a city name");
      } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        containerApp.style.opacity = "0";
      }
    });
  
    const fetchWeatherData = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=fcc5355f37742f006545c61338ea7b1e&units=metric`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("City not found");
          }
          return res.json();
        })
        .then((data) => {
          updateWeatherUI(data);
          containerApp.style.opacity = "1";
        })
        .catch((error) => {
          alert(error.message);
          clearWeatherUI();
          containerApp.style.opacity = "1";
        });
    };
  
    const updateWeatherUI = (data) => {
      temp.innerHTML = `${data.main.temp}&#176;`;
      conditionShow.querySelector(".condition-of-the-day").innerHTML =
        data.weather[0].description;
  
      const date = new Date(data.dt * 1000);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
  
      dateShow.innerHTML = date.toLocaleDateString(undefined, options);
      timeShow.innerHTML = `${hours}:${minutes}:${seconds}`;
      nameShow.innerHTML = data.name;
      //iconShow.src = `./icons/day/${data.weather[0].icon}.svg`;
  
      cloudShow.innerHTML = `${data.clouds.all}%`;
      humidityShow.innerHTML = `${data.main.humidity}%`;
      windShow.innerHTML = `${data.wind.speed} km/h`;

        //const iconCode = data.weather[0].icon;
        //document.querySelector('icoo').src = 'https://openweathermap.org/img/wn/${iconCode}@2x.png';

    

        
  
      updateBackgroundImage(data);
    };
  
    const clearWeatherUI = () => {
      temp.innerHTML = "";
      conditionShow.querySelector(".condition-of-the-day").innerHTML = "";
      dateShow.innerHTML = "";
      timeShow.innerHTML = "";
      nameShow.innerHTML = "";
      iconShow.src = "";
      cloudShow.innerHTML = "";
      humidityShow.innerHTML = "";
      windShow.innerHTML = "";
      containerApp.style.backgroundImage = "";
    };
  
    const updateBackgroundImage = (data) => {
      let timeOfDay = data.sys.sunset * 1000 > Date.now() ? "day" : "night";
  
      const condition = data.weather[0].main.toLowerCase();

        let imageFile = "";

        switch(condition){
            case "clear":
                imageFile = "clear-condition.jpg";
                break; 
            case "clouds":
                imageFile = "cloudy-condition.jpg";
                break;
            case "rain":
                imageFile = "rainy-condition.jpg";
                break; 
            case "snow":
                imageFile = "snowy-condition.jpg";
                break; 
            default:
                imageFile = "cloudy-condition.jpg";
        }
        containerApp.style.backgroundImage = 'url(./images/${timeOfDay}/${imageFile})';
    };

        
  
    fetchWeatherData();
    containerApp.style.opacity = "1";
  });
  
  const colors = ["black", "white"];
  
  let colorIndex = 0;
  
  let color_input = document.querySelectorAll("*");
  
  function changeTextColor() {
    color_input.forEach((element) => {
      element.style.color = colors[colorIndex];
    });
  
    colorIndex = (colorIndex + 1) % colors.length;
  }
  
  setInterval(changeTextColor, 2000);
  

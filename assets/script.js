var searchBtn = document.querySelector(".search-btn");
var clearBtn = document.querySelector(".clear-btn");
var cityName = document.querySelector(".city-name");
var currentTemp = document.querySelector(".temp");
var windSpeed = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var uvIndex = document.querySelector("uv-index");
var weatherIcon = document.querySelector("#weather-icon");
var iconContainer = document.querySelector(".icon-container");
var highTemp = document.querySelector(".high-temp");
var lowTemp = document.querySelector(".low-temp");

const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

searchBtn.addEventListener('click', function(){

    var searchInput = document.querySelector('#citySearch');
    var searchInputVal = searchInput.value;
    if (searchInputVal === ""){
        window.alert("you must input SOMETHING!!!!!!!!!!");
    }
    var queryString = requestUrl + searchInputVal + '&units=imperial&appid=7b2be6a1e4a8ba837b735dd2308a21ce';
    fetch(queryString)
      .then(function (response) {
        if (response.status === 404 || response.status === 400){
            window.alert("Please check your spelling")
            location.reload();
        } else return response.json();
      })
      .then(function (data) {
        console.log(data)
        cityName.textContent = moment().format('MMMM Do YYYY') + " " + data.name;
        var iconimg = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconimg + ".png";
        weatherIcon.setAttribute('src', iconUrl);
        iconContainer.append(weatherIcon);
        currentTemp.textContent = "The current temp is: " + data.main.temp + "\u00B0 F";

      });
    var cards = document.getElementById('weather-card');
        cards.classList.remove("hidden");

});



































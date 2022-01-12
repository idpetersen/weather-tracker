// var searchBtn = document.querySelector(".search-btn");
// var clearBtn = document.querySelector(".clear-btn");
// var cityName = document.querySelector(".city-name");
// var currentTemp = document.querySelector(".temp");
// var windSpeed = document.querySelector(".wind");
// var humidity = document.querySelector(".humidity");
// var uvIndex = document.querySelector("uv-index");
// var weatherIcon = document.querySelector("#weather-icon");
// var iconContainer = document.querySelector(".icon-container");
// var iconContainerForcast = document.querySelectorAll(".icon-container-forcast")
// var highTemp = document.querySelector(".high-temp");
// var lowTemp = document.querySelector(".low-temp");
// var searchInput = document.querySelector('#citySearch');
// var searchInputVal = searchInput.value;

// const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
// const fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

// searchBtn.addEventListener('click', function () {

//     var searchInput = document.querySelector('#citySearch');
//     var searchInputVal = searchInput.value;
//     if (searchInputVal === "") {
//         window.alert("you must input SOMETHING!!!!!!!!!!");
//     }
//     var queryString = requestUrl + searchInputVal + '&units=imperial&appid=7b2be6a1e4a8ba837b735dd2308a21ce';
//     fetch(queryString)
//         .then(function (response) {
// if (response.status === 404 || response.status === 400) {
//     window.alert("Please check your spelling")
//     location.reload();
// } else return response.json();
//         })
//         .then(function (data) {
//             // console.log(data)
//             cityName.textContent = moment().format('MMMM Do YYYY') + " " + data.name;
//             var iconImg = data.weather[0].icon;
//             var iconUrl = "http://openweathermap.org/img/w/" + iconImg + ".png";
//             weatherIcon.setAttribute('src', iconUrl);
//             iconContainer.append(weatherIcon);
//             currentTemp.textContent = "The current temp is: " + data.main.temp + "\u00B0 F";
//             highTemp.textContent = "The high for today is: " + data.main.temp_max + "\u00B0 F";
//             lowTemp.textContent = "The low for today is: " + data.main.temp_min + "\u00B0 F";
//             windSpeed.textContent = "The current wind speed is " + data.wind.speed + " MPH from " + data.wind.deg + "\u00B0";
//             humidity.textContent = "The current humidity is " + data.main.humidity + "%";
//         });
//     var cards = document.getElementById('weather-card');
//     cards.classList.remove("hidden");
//     var forecastCards = document.querySelectorAll('.forecast-cards');
//     for (var i = 0; i < forecastCards.length; i++) {
//         forecastCards[i].classList.remove('hidden')
//     }
//     var cardHeader = document.getElementById('card-header');
//     cardHeader.classList.remove("hidden");
//     var forecastFiveInput = fiveDayUrl + searchInputVal + '&units=imperial&appid=7b2be6a1e4a8ba837b735dd2308a21ce';
//     fetch(forecastFiveInput)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             for (var i = 0; i < data.list.length; i+=8) {
//                 console.log("hello")
//                 var weatherIconFive = document.querySelector("#weather-icon-one");
//                 var iconImgForcast = data.list[i].weather[0].icon;
//                 var iconUrlForcast = "http://openweathermap.org/img/w/" + iconImgForcast + ".png";
//                 weatherIconFive.setAttribute('src', iconUrlForcast);
//                 iconContainerForcast.append(weatherIconFive);
//                 console.log(data.list[i].weather[0].icon)
//             }
//             // console.log(data.list[i].weather[0].icon)
//         });
// });
//REDO EVERYTHINGGGGGGGGGGGGGGGGGGGGGGGG
var searchBtn = document.getElementById("#search-button");
var cards = document.querySelectorAll("card");
var savedSearches =
  JSON.parse(window.localStorage.getItem("saved-search")) || [];

$(document).ready(function () {
  $("#search-button").on("click", function () {
    $('#weather-card').removeClass('hidden');
    $('#days5').removeClass('hidden');
    var searchInput = $("#citySearch").val();
    $("#citySearch").val("");
    getlongandlat(searchInput);
  });

  function getlongandlat(searchInput) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=7b2be6a1e4a8ba837b735dd2308a21ce`
    )
      .then(function (response) {
        if (response.status === 404 || response.status === 400) {
          window.alert("Please check your spelling");
          location.reload();
        } else return response.json();
      })
      .then(function (data) {
        console.log(data);
        var lat = data.coord.lat;
        var long = data.coord.lon;
        var cityName = data.name;

        $(".city-name").text(cityName);
        oneCallForecast(lat, long);
      });
  }

  function oneCallForecast(lat, long) {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=7b2be6a1e4a8ba837b735dd2308a21ce&units=imperial`
    )
      .then(function (response) {
        if (response.status === 404 || response.status === 400) {
          window.alert("Please check your spelling");
          location.reload();
        } else return response.json();
      })
      .then(function (data) {
        console.log(data);
        var currentTemp = data.current.temp;
        var humidity = data.current.humidity;
        var wind = data.current.wind_speed;
        var uvIndex = data.current.uvi;
        var weatherIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;

        $("#weather-icon").attr("src", weatherIcon);
        $(".current-temp").text(
          "The current temperature is " + currentTemp + " \u00B0 F");
        $(".humidity").text("The current humidity is " + humidity + "%");
        $(".wind").text("The current wind speed is " + wind + "MPH");
        $(".uv-index").text("The current UV index is " + uvIndex);

        for(var i = 1; i < 6; i++){

        }
      });
  }
});

var searchBtn = document.getElementById("#search-button");
var cards = document.querySelectorAll("card");
// var savedSearches = JSON.parse(window.localStorage.getItem("saved-search")) || [];
//Waiting for imput and a click on the Search Button
$(document).ready(function () {
    $('#search-button').on('click', function () {
        //showing forecast cards and current weather card
        $('#weather-card').removeClass('hidden');
        $('#card-hide').removeClass('hidden');
        var searchInput = $("#citySearch").val();
        $("#citySearch").val("");
        //taking input value and putting it into the call URL
        getlongandlat(searchInput);
    });
    //getting longitude and latitude
    function getlongandlat(searchInput) {
        fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=7b2be6a1e4a8ba837b735dd2308a21ce`
            )
            //Checking if response is 200 or not
            .then(function (response) {
                if (response.status === 404 || response.status === 400) {
                    window.alert('Please check your spelling');
                    location.reload();
                } else return response.json();
            })
            .then(function (data) {
                // console.log(data);
                var lat = data.coord.lat;
                var long = data.coord.lon;
                var cityName = data.name;
                //putting city name and date in
                $('.city-name').text(cityName);
                $('.city-date').text(moment().format('MMMM Do YYYY'));
                //Longitude and Latitude have been stored in variables, now passing them through the one call function
                oneCallForecast(lat, long);
            });
    }

    function oneCallForecast(lat, long) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=7b2be6a1e4a8ba837b735dd2308a21ce&units=imperial`)
            //Using stored longitude and latitude to put into the fetch request^^
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                //Logging neccessary information and storing them in their corresponding variables
                var currentTemp = data.current.temp;
                var humidity = data.current.humidity;
                var wind = data.current.wind_speed;
                var uvIndex = data.current.uvi;
                var weatherIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
                //Changing text content for the current weather data card
                $('#weather-icon').attr('src', weatherIcon);
                $('.current-temp').text('The current temperature is ' + currentTemp + ' \u00B0 F');
                $('.humidity').text('The current humidity is ' + humidity + '%');
                $('.wind').text('The current wind speed is ' + wind + 'MPH');
                $('.uv-index').text('The current UV index is ' + uvIndex);
                //We need this so we can clear all cards before next set is populated. 
                $('.forecast-cards').empty();
                //Using this for loop to grab the neccessary data from the DAILY forcast data. Needs to start at 1 and end at 5 because the 0 place is today and we only need 5 days.
                for (var i = 1; i < 6; i++) {
                    //Creating a new card for each day using [i]
                    var forecastCard = $('<card>')
                    //This one was very irratating, you have to use the string 'x' to grab the current date for reformating. For some reason if you don't it tells you the date 1/19/1970
                    var forecastDate = $('<h4>').text(moment(data.daily[i].dt, 'X').format('MM/DD/YYYY'));
                    var forecastIcon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`);
                    var forecastTemp = $('<p>').text('Temp: ' + data.daily[i].temp.max + ' \u00B0 F');
                    var forecastWind = $('<p>').text('Wind Speed: ' + data.daily[i].wind_speed + ' MPH');
                    var forecastHumidity = $('<p>').text('Humidity: ' + data.daily[i].humidity + '%');
                    //Appending the variables to the new card created above ^^^^^^^
                    forecastCard.append(forecastDate, forecastIcon, forecastTemp, forecastWind, forecastHumidity)
                    //Appending the new cards to 'forecast-cards' in the HTML document
                    $('.forecast-cards').append(forecastCard);
                }
            });
    }
});

//Older attempts using vanilla are below:

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
//USE JQUERY
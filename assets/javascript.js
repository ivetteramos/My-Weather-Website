var Click = $("button")
var fetchButton = document.getElementById('submitBtn')
var searchResultEl = document.querySelector("#searchResult")
console.log(searchResultEl)
var recentSearch = JSON.parse(localStorage.getItem("recentSearch")) || []
var btn = document.getElementById("btn1")
var currentDayEl = document.querySelector("#currentDay")
var UlEl = $("#previousSearchList")
var APIkey = "c9ecfd644095a0e64da1f579c55a340b"
let cityName = $("#cityInput").val();

currentDayEl.textContent = moment().format("MMM Do YY");
// set this item to a local storage and create a list of recent searches
function getApi(cityName) {

    // console.log(cityName)
    var cityInputEl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`;

    fetch(cityInputEl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        // console.log(data)
                        var lat = data[0].lat
                        // console.log(lat)
                        var lon = data[0].lon
                        // console.log(lon)
                        var lonLat = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;

                        fetch(lonLat)
                            .then(function (response) {
                                if (response.ok) {
                                    response.json()
                                        .then(function (data1) {
                                            console.log(data1)
                                            // data1 = searchResultEl (trying to get INFO to populate in the searchResult id and populate on the page)

                                            let p = document.createElement("p");
                                            searchResultEl.appendChild(p)

                                            searchResultEl.innerHTML += cityName + ", " + " " + "Temp:" + "  " + data1.current.temp + "," + " " + "Humidity:" + "  " + data1.current.humidity + "," + "  " + "Wind Speed:" + "  " + data1.current.wind_speed + ", " + " " + "UV Index:" + data1.current.uvi;

                                            let div = document.querySelector("#TomorrowForecast");
                                            searchResultEl.appendChild(div)

                                            searchResultEl.innerHTML += "Tomorrow's forecast:" + " " + "Temp:" + "  " + data1.daily[1].temp.day + "," + " " + "Humidity:" + "  " + data1.daily[1].humidity + "," + "  " + "Wind Speed:" + "  " + data1.daily[1].wind_speed + ", " + " " + "UV Index:" + data1.daily[1].uvi + " ";

                                            let divTwoDay = document.querySelector("#twoForecast");
                                            searchResultEl.appendChild(div)

                                            searchResultEl.innerHTML += "3 day forecast:" + " " + "Temp:" + "  " + data1.daily[2].temp.day + "," + " " + "Humidity:" + "  " + data1.daily[2].humidity + "," + "  " + "Wind Speed:" + "  " + data1.daily[2].wind_speed + ", " + " " + "UV Index:" + data1.daily[2].uvi + " ";

                                            let divThreeDay = document.querySelector("#threeForecast");
                                            searchResultEl.appendChild(div)

                                            searchResultEl.innerHTML += "4 day forecast:" + " " + "Temp:" + "  " + data1.daily[3].temp.day + "," + " " + "Humidity:" + "  " + data1.daily[3].humidity + "," + "  " + "Wind Speed:" + "  " + data1.daily[3].wind_speed + ", " + " " + "UV Index:" + data1.daily[3].uvi + " ";

                                            let divFourDay = document.querySelector("#fourForecast");
                                            searchResultEl.appendChild(div)

                                            searchResultEl.innerHTML += "5 day forecast:" + " " + "Temp:" + "  " + data1.daily[4].temp.day + "," + " " + "Humidity:" + "  " + data1.daily[4].humidity + "," + "  " + "Wind Speed:" + "  " + data1.daily[4].wind_speed + ", " + " " + "UV Index:" + data1.daily[4].uvi + " ";

                                            //    data1.daily[0].temp.day
                                            // need data to show on the screen for selected city
                                            // need the search to be saved on local storage and put into a list of item
                                        })
                                }
                            })

                    })
            }

        });
    // https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}
}

function pastSearches() {
    UlEl.empty()
    for (let i = 0; i < recentSearch.length; i++) {
        const city = recentSearch[i];
        var btn = $("<button>")
        btn.text(city)
        UlEl.append(btn)
    }
}
function searchedCity(event) {
    event.preventDefault();
    console.log(event.target.id)
    if (event.target.id === "submitBtn") {
        var cityName = $("#cityInput").val();
        recentSearch.push(cityName)
        localStorage.setItem("recentSearch", JSON.stringify(recentSearch))
        pastSearches()

    }
    else {
        var cityName = $(this).text()
    }

    console.log(cityName)
    if (cityName) {
        getApi(cityName);
    };
}

pastSearches()

fetchButton.addEventListener("click", searchedCity);
// console.log(textcontent)
UlEl.on("click", "button", searchedCity)
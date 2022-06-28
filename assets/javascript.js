var Click = $("button")
var fetchButton = document.getElementById('submitBtn')
// var cityInputEL = $("cityinput")
var APIkey = "c9ecfd644095a0e64da1f579c55a340b"
let cityName = $("#cityInput").val();
var searchResultEl = document.querySelector("#searchResult")
console.log(searchResultEl)
var recentSearch = localStorage.getItem("recentSearch")
// set this item to a local storage and create a list of recent searches
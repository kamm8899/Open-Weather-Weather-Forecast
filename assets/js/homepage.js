
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city


//GIVEN a weather dashboard with form inputs
//WHEN I search for a city


var APIKey ='eec3413a16d43f5e64f5215a7760f24b';
var temp;
var humidity;
var windSpeed;

//create element to get form and user input
var userSearchEl= document.querySelector("#user-form");
var cityNameEl = document.querySelector("#cityName");
var savedCitiesEl = document.querySelector("#savedCities");
var cityContainerEl = document.querySelector("#city-container");



//get fetch for api
var getWeatherInfo = function(city){
    //fetch request to get Munich as a city
    fetch("http://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&appid="
        + APIKey
        //+ "&units=imperial"
    )

    .then(function(response) {
        return response.json();
      })
      .then(function(response) {
          console.log(response);
});
}

var formSubmitHandler = function(event){
    event.preventDefault();
    //var cityName = cityNameEl.value.trim();

   var city = document.getElementById('cityName').value;

    //check if City name is valid
    if(city){
        getWeatherInfo(city);
        cityNameEl.value= "";
    }else{
        alert("Please enter a valid City Name");
    }
}

var displayCities = function(){
    //clear old content
    cityContainerEl.textContent = "";
    savedCitiesEl.textContent= cityName;

    //add for loop to go over repos
    for (var i=0;i<city.length; i++){
        //format cityName

        // create a conteiner for each repo

        //create a span element to hold city name

        //append to container

        //append to dom

    }


}

var uvIndex = function(){
    
};
//add Listener for the form for city
userSearchEl.addEventListener("submit", formSubmitHandler);
getWeatherInfo();
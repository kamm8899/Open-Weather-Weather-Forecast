
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
var cityName;
var temp;
var humidity;
var windSpeed;
var uvIndex;

//get fetch for api
var getWeatherInfo = function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Clinton&appid=eec3413a16d43f5e64f5215a7760f24b")

    .then(function(response) {
        return response.json();
      })
      .then(function(response) {
          console.log(response);
});
}
getWeatherInfo();
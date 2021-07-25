
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city


//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city





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
var getWeatherInfo = function(cityName){
    //fetch request to get Munich as a city
    fetch("http://api.openweathermap.org/data/2.5/weather?q="
        + cityName
        + "&appid="
        + APIKey
        + "&units=imperial"
    )

    .then(function(response) {
        return response.json();
      })
      .then(function(response) {
          displayWeatherInfo(response);


          
});
}

function displayWeatherInfo(weatherData){
    console.log(weatherData);
    weatherData.clouds.all;
    weatherData.main.humidity;
    weatherData.main.pressure;
    weatherData.main.temp;
    weatherData.wind.speed;

    weatherData.main.temp_max;
    weatherData.main.temp_min;
    uvIndex(weatherData);


document.querySelector('#cityHeading').innerHTML=weatherData.name;
document.querySelector('#temp').innerHTML= "<span> Temperature: " + weatherData.clouds.all +"<span> F";
document.querySelector('#humidity').innerHTML="<span> Humidity: "+ weatherData.main.humidity + "<span> %";
document.querySelector("#pressureId").innerHTML= "<span> Pressure: " + weatherData.main.pressure +"<span> Pa";
document.querySelector("#windSpeed").innerHTML="<span> Wind Speed " + weatherData.wind.speed + "</span>";

 // Create a variable that will select the <div> where the photo will be displayed
 var imgContainer = document.querySelector('#imgIcon');

 // Empty out the <div> before we append a img to it
 imgContainer.innerHTML = '';

 var weatherImg = document.createElement('img');
 weatherImg.setAttribute('src', "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png");

  // Append 'img' to the <div>
  imgContainer.appendChild(weatherImg);

//

    //display weather data 
   // var weatherDisplayContainer = document.createElement("section");
   // weatherDisplayContainer.classList.add("poop");
    //append to container
   // var weatherH1 =document.createElement("h1");
    //weatherH1.innerHTML= weatherData.name;
   // weatherDisplayContainer.appendChild(weatherH1);
    

    //append to Dom
   // document.body.appendChild(weatherDisplayContainer);

}

var formSubmitHandler = function(event){
    event.preventDefault();
    var cityName = cityNameEl.value.trim();
    
  // var city = document.getElementById('cityName').value;

    //check if City name is valid
    if(cityName){
        
        getWeatherInfo(cityName);
        cityNameEl.value= "";
        
    }else{
        alert("Please enter a valid City Name");
    }
    
}
//for search history part 
var displayCities = function(){
    //clear old content
    cityContainerEl.textContent = "";
    savedCitiesEl.textContent= cityName;

    //add for loop to go over repos
    for (var i=0;i<city.length; i++){
        //format cityName

        // create a container for each repo

        //create a span element to hold city name

        //append to container

        //append to dom

    }


}

var uvIndex = function(weatherData){
    
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
    + weatherData.coord.lat
    +"&lon="
    + weatherData.coord.lon
    +"&appid="
    +APIKey
    + "&units=imperial"
    )
    .then(function(response) {
        return response.json();
      })
      .then(function(response) {
          uvData(response);
          console.log(response);
          
});
}

function uvData(uvInfo){
    var uvDisplayContainer = document.createElement("div");
    console.log(uvInfo);
    console.log(uvInfo.current.uvi);

    //check UVIndex
     //favorable under 3    
    //moderate 3-5
    //severe over 5 
    if(uvInfo.current.uvi < 3){
    uvDisplayContainer.classList.add("uvFavorable"); 
    }
    else if(uvInfo.current.uvi > 3 && uvInfo.current.uvi <=5 ){
    uvDisplayContainer.classList.add("uvModerate"); 
    }
    else{
        uvDisplayContainer.classList.add("uvSevere");
    }
    uvDisplayContainer.innerHTML= "<span>UV Index: "+ uvInfo.current.uvi + "</span>";
    document.body.appendChild(uvDisplayContainer)
    

}
//5 day Forecast
//use the daily One call, do the append to HTML 
function Forecast(weatherData){
    //fetch Forecast
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
        + weatherData.coord.lat
        +"&lon="
        + weatherData.coord.lon
        +"&appid="
        +APIKey
        + "&exclude=current,hourly"
        + "&units=imperial"
        )
        //then function to pull fetch with response
        .then(function(response) {
            return response.json();
          })
          .then(function(response) {
              forecastData(response);
              console.log(response);
              
    });
    }

    function getWeatherForecast(forecastData){

    }





//add Listener for the form for city
userSearchEl.addEventListener("submit", formSubmitHandler);



//Fix colors for UV Index
//Bring UV INdex up by the others
//How do I add the date to the image
//How do I add the img to the context
//how do I clear the old UV Index
//***Help with the Forecast
//***get the cities saved
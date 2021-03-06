var APIKey ='eec3413a16d43f5e64f5215a7760f24b';


//dates
var currDate= new Date();
var day= currDate.getDate();
var year= currDate.getFullYear();
var month= currDate.getMonth()+1;

//create element to get form and user input
var userSearchEl= document.querySelector("#user-form");
var cityNameEl = document.querySelector("#cityName");
var savedCitiesEl = document.querySelector("#saved-Cities");
var cityContainerEl = document.querySelector("#saved_response");
var currentCityContainerEl =document.querySelector("#currentCity");
var forecastContainerEl = document.querySelector("#currentForecast");
var savedCitiyContainerEl= document.querySelector("#city-container");
var weatherContainerEl= document.querySelector("#weatherContainer");
var cityButton= document.querySelector("#btn-city");


//Set localStorage
//var savedCities = localStorage.setItem("City", cityName);
var savedCities =JSON.parse(localStorage.getItem("Saved_History")) || [];

//get fetch for api
var getWeatherInfo = function(cityName){
    //fetch request to get Munich as a city
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
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
    //weatherData.clouds.all;
    weatherData.main.humidity;
    weatherData.main.pressure;
    weatherData.main.temp;
    weatherData.wind.speed;

    weatherData.main.temp_max;
    weatherData.main.temp_min;
   uvIndex(weatherData);


document.querySelector('#cityHeading').innerHTML=(weatherData.name + (" " + day + "." + month + "." + year));
document.querySelector('#temp').innerHTML= "<span> Temperature: </span>" + weatherData.main.temp +"<span> F</span>";
document.querySelector('#humidity').innerHTML="<span> Humidity: </span>"+ weatherData.main.humidity + "<span> %</span>";
document.querySelector("#pressureId").innerHTML= "<span> Pressure: </span>" + weatherData.main.pressure +"<span> Pa</span>";
document.querySelector("#windSpeed").innerHTML="<span> Wind Speed: </span>" + weatherData.wind.speed;
//document.querySelector("#date").innerHTML= day + "-" + month + "-" + year;

currentCityContainerEl.classList.remove('hidden');
forecastContainerEl.classList.remove('hidden');
 // Create a variable that will select the <div> where the photo will be displayed
 var imgContainer = document.querySelector('#imgIcon');

 // Empty out the <div> before we append a img to it
 imgContainer.innerHTML = '';

 var weatherImg = document.createElement('img');
 weatherImg.setAttribute('src', "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png");

  // Append 'img' to the <div>
  imgContainer.appendChild(weatherImg);
           
}

var formSubmitHandler = function(event){
    event.preventDefault();
    var cityName = cityNameEl.value.trim();

    //check if City name is valid
    if(cityName){
        
        getWeatherInfo(cityName);
        
        cityNameEl.value= "";
        var savedCities =JSON.parse(localStorage.getItem("Saved_History")) || [];
        if(!savedCities.includes(cityName.toLowerCase())){
        savedCities.push(cityName.toLowerCase());
        localStorage.setItem("Saved_History", JSON.stringify(savedCities));
        var cityButton =document.createElement("button");

        cityButton.textContent= cityName;
        document.querySelector("#city-container").appendChild(cityButton);
        }
    }else{
        alert("Please enter a valid City Name");
    }

    
}

var savedCitySearch =function(event){
   // console.log("Hello");
    event.preventDefault();
    // var cityName = cityNameEl.value.trim();
    var savedCity= event.target.innerHTML;
    if(savedCity){
        console.log(savedCity);
        getWeatherInfo(savedCity);
        
        
    }
    
}

//for search history part 
var displaySearchedCities = function(){
    //event.preventDefault();
    //for page refresh
    var savedCities =JSON.parse(localStorage.getItem("Saved_History"))|| [];
    for(var i=0; i<savedCities.length; i++){
        var cityButton = document.createElement("button");
        //add class and id to see if it works
        cityButton.classList.add("renderCities");
        cityButton.textContent=savedCities[i];
        document.querySelector("#city-container").appendChild(cityButton);
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
          uvData(response ,weatherData);
          console.log(response);
          
});
}

function uvData(uvInfo , weatherData){
    // var uvDisplayContainer = document.createElement("div");
    // uvDisplayContainer.classList="uvi";
    // console.log(uvInfo);
    // console.log(uvInfo.current.uvi);
    var uvDisplayContainer=document.querySelector("#uvIndex");
    //check UVIndex
     //favorable under 3    
    //moderate 3-5
    //severe over 5 
    if(uvInfo.current.uvi < 3){
    uvDisplayContainer.classList.add("uvFavorable"); 
    }
    else if(uvInfo.current.uvi > 3 && uvInfo.daily.uvi <=5 ){
    uvDisplayContainer.classList.add("uvModerate"); 
    }
    else{
        uvDisplayContainer.classList.add("uvSevere");
    }
    uvDisplayContainer.innerHTML= "<span>UV Index: </span>"+ uvInfo.current.uvi;
    weatherContainerEl.append(uvDisplayContainer)
    //call forecast
    forecast(weatherData)
    

}

//5 day Forecast
//use the daily One call, do the append to HTML 
function forecast(weatherData){
    //fetch Forecast
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
        + weatherData.coord.lat
        +"&lon="
        + weatherData.coord.lon
        +"&appid="
        +APIKey
        + "&units=imperial"
        +"&exclude=current,hourly"
        )
        //then function to pull fetch with response
        .then(function(response) {
            return response.json();
          })
          .then(function(response) {
              getWeatherForecast(response);
              //console.log(response);
              
    });
    }

    function getWeatherForecast(forecastData){
        forecastContainerEl.textContent="";
        //console.log(forecastData);
        for(var i=1;i<6;i++){
            
            //console.log(forecastData.daily[i]);
            //create element first
            var forecastcard =document.createElement("div");
            var forecasttemp=document.createElement("h4");
            var titleTemp=document.createElement("span");
            titleTemp.textContent=("Temp: " + forecastData.daily[i].temp.day + "F");
            forecastcard.classList ="border border-secondary border-5 bg-secondary mr-4 mt-2 flex-column";
            forecasttemp.appendChild(titleTemp);
            
            
            var forecasthum=document.createElement("h4");
            var titlehum= document.createElement("span");
            titlehum.textContent=("Humidity: " + forecastData.daily[i].humidity+ "%");
            forecasthum.appendChild(titlehum);


            var forecastPres= document.createElement("h4");
            var titlePres = document.createElement("span");
            titlePres.textContent=("Pres: " + forecastData.daily[i].pressure +" Pa");
            forecastPres.appendChild(titlePres);


            var forecastUV= document.createElement("h4");
            var titleUV = document.createElement("span");
            // forecastUV.textContent= "";
            titleUV.textContent=("UV Index: "+ forecastData.daily[i].uvi );
            forecastUV.appendChild(titleUV);

            var forecastWind=document.createElement("h4");
            var titleWind = document.createElement("span");
            titleWind.textContent=("Wind Speed: " + forecastData.daily[i].wind_speed+ " mph" )
            forecastWind.appendChild(titleWind);

            //img
            var imgforecastContainer= document.createElement("img");
            imgforecastContainer.setAttribute('src', "http://openweathermap.org/img/wn/" + forecastData.daily[i].weather[0].icon + ".png");
            forecastcard.appendChild(imgforecastContainer);

            //add Dayssa
            var dateContainer= document.createElement("p");
            dateContainer.classList=("date");
            var date = appendDays(currDate, i);
            var month = date.getMonth()+1;
            dateContainer.textContent=(month + "." + date.getDate() + "." + date.getFullYear());
            

            forecastcard.appendChild(dateContainer);
           

            forecastcard.append(forecasttemp, forecasthum, forecastPres, forecastUV,forecastWind);

           
            
            forecastContainerEl.append(forecastcard);

    }

}

function appendDays (date, days){
    var new_date = new Date (date);
    new_date.setDate(new_date.getDate()+days);
    new_date.toLocaleString("en-GB");
    return new_date;
}

//add Listener for the form for city
userSearchEl.addEventListener("submit", formSubmitHandler);
var cityItem = document.getElementById("city-container"); 

displaySearchedCities();
cityItem.addEventListener("click", savedCitySearch);


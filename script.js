//add button click event to search weather & forecast for city
//send city to history section
//render current city weather details
//render current 5 day forecast
//uv index - different api to get this

$(document).ready(function () {
  const cities = [];
  const searchBtn = $("#btn");
  const history = $(".history");
  const city = $(".city");
  const forecast = $(".forecasts");

  $("button").on("click", async function () {
    event.preventDefault();
    const userCity = $("#city-input").val().trim().toLowerCase();
    renderWeather(userCity)
    renderForecast(userCity)
  });

  renderWeather = () => {
    const userCity = $("#city-input").val().trim().toLowerCase();
    const apiKey = "45dc9b511ea376337abf6c099c7c9895";
    const queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      userCity +
      "&units=imperial&appid=" +
      apiKey;
    

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      city.empty();
      console.log(response)
      const results = response;
      console.log(results);
      const newDiv = $("<div>");
      const name = $("<p>").text(results.name);
      newDiv.append(name);
      const icon = $("<p>").text(results.weather.icon);
      newDiv.append(icon);
      const unixTimestamp = (results.dt*1000)
      const dateObj = new Date(unixTimestamp); 
        const newDate = dateObj.toLocaleDateString() 
      const date = $("<p>").text(newDate);
      newDiv.append(date);
      const temp = $("<p>").text(results.main.temp);
      newDiv.append(temp);
      const humidity = $("<p>").text(results.main.humidity);
      newDiv.append(humidity);
      const windspeed = $("<p>").text(results.wind.speed);
      newDiv.append(windspeed);
      city.append(newDiv);
    });
  };

  renderForecast = () => {
    const userCity = $("#city-input").val().trim().toLowerCase();
    const apiKey2 = "45dc9b511ea376337abf6c099c7c9895";
    const queryURL2 =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&units=imperial&appid=" +
      apiKey2;

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(response => {
      forecast.empty();
      console.log(response)
      const result = response.list;
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        const forecastDiv = $("<div>");
        const forecastDate = (result[i].dt_txt)
        const dateObj = new Date(forecastDate); 
          const newDate = dateObj.toLocaleDateString() 
        const dt = $("<p>").text(newDate);
        forecastDiv.append(dt);
        const icon2 = $("<p>").text(result[i].weather.icon);
        forecastDiv.append(icon2);
        const temperature = $("<p>").text(result[i].main.temp);
        forecastDiv.append(temperature);
        const humid = $("<p>").text(result[i].main.humidity);
        forecastDiv.append(humid);
        forecast.append(forecastDiv);
      }
    });
  };
});

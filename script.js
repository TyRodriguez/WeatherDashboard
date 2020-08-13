$(document).ready(function () {
  const cities = [];
  const searchBtn = $("#btn");
  const history = $(".history");
  const city = $(".city");
  const forecast = $(".forecasts");
  let geolocation = {};

  $("button").on("click", async function () {
    event.preventDefault();
    const userCity = $("#city-input").val().trim().toLowerCase();
    const apiKey = "45dc9b511ea376337abf6c099c7c9895";
    const queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      userCity +
      "&units=imperial&appid=" +
      apiKey;

    const latlng = await $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      console.log(response);
      geolocation = response;
    });

    let lat = geolocation.coord.lat;
    let lon = geolocation.coord.lon;
    let name = geolocation.name;

    const queryURL2 =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=hourly,minutely&units=imperial&&appid=" +
      apiKey;

    const oneCall = await $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(response => {
      city.empty();
      forecast.empty();
      console.log(response);
      const weather = response.current;
      console.log(weather);
      const forecasts = response.daily;
      console.log(forecasts);
      const newRow = $("<div>").addClass("row")
      const newDiv = $("<div>").addClass("details col")
      newRow.append(newDiv)
      const cityName = $("<h2>").text(name);
      newDiv.append(cityName);
      const unixTimestamp = weather.dt * 1000;
      const dateObj = new Date(unixTimestamp);
      const newDate = dateObj.toLocaleDateString();
      const date = $("<p>").text(`(${newDate})`);
      newDiv.append(date);
      const icon = weather.weather[0].icon;
      const img = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      newDiv.append(img);
      const temp = $("<p>").text(`Temperature: ${weather.temp}°F`);
      newDiv.append(temp);
      const humidity = $("<p>").text(`Humidity: ${weather.humidity}%`);
      newDiv.append(humidity);
      const windspeed = $("<p>").text(`Wind Speed: ${weather.wind_speed} MPH`);
      newDiv.append(windspeed);
      const uvindex = $("<p>").text(`UV Index: ${weather.uvi}`);
      newDiv.append(uvindex);
      city.append(newRow);
      const forecastTitle = $("<h2>").text("5-Day Forecast");
      forecast.append(forecastTitle);
      const cardRow = $("<div>").addClass("card-deck")
      forecast.append(cardRow);

      for (let i = 1; i <= 5; i++) {
        const forecastDiv = $("<div>")
          .addClass("card text-white bg-primary col")
          .attr("style", "width: 12rem;");
        const cardBody = $("<div>").addClass("card-body");
        forecastDiv.append(cardBody);
        const forecastDate = forecasts[i].dt * 1000;
        const dateObj = new Date(forecastDate);
        const newDate = dateObj.toLocaleDateString();
        const dt = $("<h5>").text(newDate).addClass("card-title");
        forecastDiv.append(dt);
        const icons = weather.weather[0].icon;
        const images = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/wn/${icons}@2x.png`
        ).attr("style","width:6rem")
        forecastDiv.append(images);
        const max = $("<p>")
          .text(`High: ${forecasts[i].temp.max}°F`)
          .addClass("card-text");
        forecastDiv.append(max);
        const min = $("<p>")
          .text(`Low: ${forecasts[i].temp.min}°F`)
          .addClass("card-text");
        forecastDiv.append(min);
        const humid = $("<p>")
          .text(`Humidity: ${forecasts[i].humidity}`)
          .addClass("card-text");
        forecastDiv.append(humid);
        cardRow.append(forecastDiv);
      }
    });
  });
});

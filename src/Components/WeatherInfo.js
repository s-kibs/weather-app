import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Create a Component to Display Weather Info
function WeatherInfo({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) {
    return <div>Select a city to view its weather.</div>;
  }
    const kelvinTemp = weather.main.temp;
    const celsiusTemp = (kelvinTemp - 273.15).toFixed(1); 
  return (
    <div>
      <h2>Weather in {city.name}</h2>
      <p>Temperature: {celsiusTemp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Weather: {weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherInfo;

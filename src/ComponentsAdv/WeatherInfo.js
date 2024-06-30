import axios from 'axios';

async function fetchWeatherInfo(city) {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  if (!apiKey) {
    console.error('Missing API Key');
    return null;
  }

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      console.error(`Error fetching weather data: ${response.status}`);
      return null;
    }
    const data = response.data;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    return { ...data, iconUrl };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    console.log(city)
    return null;
  }
}

export default fetchWeatherInfo;

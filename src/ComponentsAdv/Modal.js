
import React from 'react';
import './Modal.css';

function Modal({ city, weatherInfo, onClose }) {
  if (!city || !weatherInfo) return null;

  return (
    <div className="modal-container active" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="link-2" onClick={onClose}></button>
        <div className="modal-header">
          <img src={weatherInfo.iconUrl} alt={weatherInfo.weather[0].description} className="weather-icon" />
          <h2 className="modal__title">{city.name}, {city.sys.country}</h2>
        </div>
        <div className="modal__content">
          <p><strong>Temperature:</strong> {(weatherInfo.main.temp - 273.15).toFixed(1)}°C</p>
          <p><strong>Humidity:</strong> {weatherInfo.main.humidity}%</p>
          <p><strong>Pressure:</strong> {weatherInfo.main.pressure} mb</p>
          <p><strong>Wind Speed:</strong> {weatherInfo.wind.speed} m/s</p>
          <p><strong>Visibility:</strong> {weatherInfo.visibility} m</p>
          <p><strong>Weather:</strong> {weatherInfo.weather[0].description}</p>
          <p><strong>Cloudiness:</strong> {weatherInfo.clouds.all}%</p>
          <p><strong>Sunrise:</strong> {new Date(weatherInfo.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p><strong>Sunset:</strong> {new Date(weatherInfo.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
        <div className="modal__btn-container">
        <button className="modal__btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

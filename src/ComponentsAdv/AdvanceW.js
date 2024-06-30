import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "../ComponentsAdv/AdvEarth1";
import SearchBar from './SearchBar';
import Modal from './Modal';
import fetchWeatherInfo from './WeatherInfo.js'; 
import './AdvanceW.css';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SearchBarContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
`;

function AdvanceW() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeInContent, setFadeInContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); 
  const CHAR_TIME = 70; 
  const SPLASH_DURATION = 4500;
  const [modalCity, setModalCity] = useState(null);
  const [modalWeatherInfo, setModalWeatherInfo] = useState(null);

  useEffect(() => {
    const startAnimation = () => {
      const title = document.querySelector(".splash-screen h1");
      if (!title) {
        console.error("Title element not found."); 
        return; 
      }
      const text = title.textContent.trim();
      let index = 0;
      title.textContent = ""; 
      const requestCharAnimation = (char, value) => {
        setTimeout(() => {
          char.textContent = value;
          char.classList.add("fade-in");
        }, CHAR_TIME);
      };

      const addChar = () => {
        const char = document.createElement("span");
        char.classList.add("char");
        char.textContent = "▌";
        title.appendChild(char);
        requestCharAnimation(char, text.charAt(index++));
        if (index < text.length) {
          requestChar();
        }
      };

      const requestChar = (delay = 0) => {
        setTimeout(addChar, CHAR_TIME + delay);
      };

      requestChar(1000);
    };

    startAnimation();
    const fadeOutTimeout = setTimeout(() => {
      setFadeOut(true); 
    }, SPLASH_DURATION - 1000); 

    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_DURATION);

    const fadeTimeout = setTimeout(() => {
      setFadeInContent(true); 
    }, SPLASH_DURATION);

    return () => {
      clearTimeout(timeout);
      clearTimeout(fadeOutTimeout); 
      clearTimeout(fadeTimeout);
    }; 
  }, []);

// handle city k andr yeh jaa hi nahi raha hai toh


  const handleSelectCity = async (city) => {
    console.log("Selected city:", city.name);
    setModalCity(city);
    try {
      const weatherInfo = await fetchWeatherInfo(city.name);
      console.log("Fetched weather info:", weatherInfo);
      setModalWeatherInfo(weatherInfo);
    } catch (error) {
      console.error("Error fetching weather info:", error);
    }
  };

  const handleCloseModal = () => {
    setModalCity(null);
    setModalWeatherInfo(null);
  };

  return (
    <>
      <div>
        {showSplash ? (
          <div className={`splash-screen splash-overlay ${fadeOut ? 'fade-out' : ''}`}>
            <h1>Welcome to the Future</h1>
          </div>
        ) : (
          <div className={`main-content ${fadeInContent ? 'fade-in' : ''}`}> 
            <h1>Weather App +</h1>
          </div>
        )}
      </div>
      <SearchBarContainer>
        <SearchBar onSelectCity={handleSelectCity} />
      </SearchBarContainer>
      {modalCity && (
        <Modal
          city={modalCity}
          weatherInfo={modalWeatherInfo}
          onClose={handleCloseModal}
        />
      )}
      <CanvasContainer>
        <Canvas camera={{ position: [0.5, 1, -2], fov: 65 }}>
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
        </Canvas>
      </CanvasContainer>
    </>
  );
}

export default AdvanceW;


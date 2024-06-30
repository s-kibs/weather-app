//advEarth1.js
import React, { useRef, useState, useEffect  } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../Img/8k_earth_daymap.jpg";
import EarthNormalMap from "../Img/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../Img/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../Img/8k_earth_clouds.jpg";
import { TextureLoader } from "three";
import  cities  from "../Components/cities.js";
import  fetchWeatherInfo  from './WeatherInfo.js'; 
import { latLonTo3D } from '../Components/latLonTo3D.js'
import './AdvanceW.css';

export function Earth(onClickCity) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();
  const pointLightRef = useRef();
  const [hoveredCity, setHoveredCity] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [weatherIconUrl, setWeatherIconUrl] = useState(null); 
  const [isHovered, setIsHovered] = useState(false);
  

  useEffect(() => {
    if (hoveredCity) {
      fetchWeatherInfo(hoveredCity.name).then(data => {
        setWeatherInfo(data);
        // console.log(weatherInfo)
        setWeatherIconUrl(data?.iconUrl); 
    });
  }
  }, [hoveredCity]);



  useFrame(({}) => {
    // const elapsedTime = clock.getElapsedTime();
    // earthRef.current.rotation.y = elapsedTime / 6;
    // cloudsRef.current.rotation.y = elapsedTime / 6;
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const seconds = istTime.getSeconds();
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    const sunPosition = calculateSunPosition(timeInSeconds);
    pointLightRef.current.position.copy(sunPosition);
  });

  const calculateSunPosition = (timeInSeconds) => {

    const orbitRadius = 10;
    const angularSpeed = (2 * Math.PI) / (24 * 60 * 60);
    const x = Math.cos(angularSpeed * (timeInSeconds + 15300)) * orbitRadius;
    const y = 0; 
    const z = Math.sin(angularSpeed * (timeInSeconds + 15300)) * orbitRadius;
    return new THREE.Vector3(x, y, z);
  };


  return (
<>
      <ambientLight intensity={0.8} /> 
      <pointLight ref={pointLightRef} color="#f6f3ea" intensity={300} />
      {/* <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={20} /> */}
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.3}
          roughness={0.7}
          />
         { <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          /> }
        {cities.map((city) => {
          const position = latLonTo3D(city.lat, city.lon, 1.01);
          return (

            <mesh
                key={city.name}
                position={position}
                onPointerOver={() => setHoveredCity(city)}
                onPointerOut={() => setHoveredCity(null)}
                onClick={() => setHoveredCity(hoveredCity === city ? null : city)}
              >
                <sphereGeometry args={[0.01, 16, 16]} />
                <meshBasicMaterial 
                  color="#0cf" 
                  transparent 
                  opacity={hoveredCity && hoveredCity.name === city.name ? 1 : 0.2}
                  
                />
                {hoveredCity && hoveredCity.name === city.name && (
                  <Html>
                    <div className="tooltip-container">
                      <div className="tooltip">
                        <div className="tooltip-header">
                          <span className="tooltip-title">{hoveredCity.name}</span>
                          {weatherIconUrl && (
                            <img src={weatherIconUrl} alt="Weather Icon" className="tooltip-icon" />
                          )}
                          {weatherInfo ? (
                            <span className="tooltip-temp">{`${(weatherInfo.main.temp - 273.15).toFixed(1)}°C`}</span>
                          ) : (
                            <span className="tooltip-temp">--°C</span>
                          )}
                        </div>
                        <div className="tooltip-content">
                        {weatherInfo ? (
                            <>
                              <p>Humidity: {weatherInfo.main.humidity}%</p>
                              <p>Pressure: {weatherInfo.main.pressure} mb</p>
                              <p>Wind: {weatherInfo.wind.speed} m/s</p>
                              <p>Visibility: {weatherInfo.visibility} m</p>
                              <p>Description: {weatherInfo.weather[0].description}</p>
                              
                            </>
                          ) : (
                            <p>Loading...</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Html>
                )}
              </mesh>

            );
          })}
       </mesh>
    </>
  );
}
export default Earth;
// src/components/Earth.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import earthTexture from '../Img/8k_earth_daymap.jpg'; // Ensure you have an Earth texture
import cities from './cities.js';
import { latLonTo3D } from './latLonTo3D.js';
function Earth({ onClickCity }) {
  const radius = 6; // Example Earth radius
  const texture = new TextureLoader().load(earthTexture);

  return (
  <>

    <Canvas camera={{ position: [15, 0, 15], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 3, 5]} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />

      <Sphere args={[radius, 32, 32]}>
        <meshStandardMaterial map={texture} />
      </Sphere>

      {cities.map((city, index) => (
        <mesh
          key={index}
          position={latLonTo3D(city.lat, city.lon, radius)}
          onClick={() => onClickCity(city)}
        >
          <sphereGeometry args={[0.05, 16, 16]} /> {/* Small green dot */}
          <meshBasicMaterial color="red" />
        </mesh>
      ))}
    </Canvas>
  </>
  );
}

export default Earth;

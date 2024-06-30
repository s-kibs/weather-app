import { useEffect, useRef } from 'react';
import { Raycaster, Vector2 } from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import findClosestCity from './findClosestCity.js'; // Import the function

// Create a Raycaster Component
function CityClickHandler({ onClickCity, cities }){ {
  const { camera, scene } = useThree();
  const raycaster = useRef(new Raycaster());
  const mouse = useRef(new Vector2());
  function handleClick(event) {
    // Normalize mouse coordinates
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);

    const intersects = raycaster.current.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const intersectPoint = intersects[0].point;

      // Here you would convert the point to lat/lon and determine the closest city
      const closestCity = findClosestCity(intersectPoint, cities);

      if (closestCity) {
        onClickCity(closestCity);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
}

export default CityClickHandler;

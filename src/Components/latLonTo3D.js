// // src/utils/geoHelpers.js
// import * as THREE from 'three';

// export function latLonTo3D(lat, lon, radius = 6) {
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (180 - lon) * (Math.PI / 180);

//   const x = radius * Math.sin(phi) * Math.cos(theta);
//   const y = radius * Math.cos(phi);
//   const z = radius * Math.sin(phi) * Math.sin(theta);

//   return new THREE.Vector3(x, y, z);
// }


import * as THREE from 'three';

// Convert latitude/longitude to 3D Cartesian coordinates
export function latLonTo3D(lat, lon, radius = 3) {
  const latInRadians = (lat * Math.PI) / 180;  // Convert latitude to radians
  const lonInRadians = (lon * Math.PI) / 180;  // Convert longitude to radians

  // Latitude translates to φ (polar angle)
  const phi = latInRadians;  // Latitude is directly φ in spherical coordinates

  // Longitude translates to θ (azimuthal angle)
  const theta = lonInRadians;  // Longitude is directly θ in spherical coordinates

  const x = radius * Math.cos(phi) * Math.cos(theta);  // Calculate x-coordinate
  const y = radius * Math.sin(phi);  // Calculate y-coordinate
  const z = radius * Math.cos(phi) * Math.sin(theta);  // Calculate z-coordinate

  return new THREE.Vector3(x, y, z);  // Return a 3D vector
}

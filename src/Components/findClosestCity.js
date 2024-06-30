import city from './cities.js'; // Import your list of cities

function findClosestCity(point, cities) {
    // Example logic to find the closest city based on a simple distance calculation
    let closestCity = null;
    let minDistance = Infinity;
  
    cities.forEach((city) => {
      const distance = Math.sqrt(
        Math.pow(city.lat - point.lat, 2) + Math.pow(city.lon - point.lon, 2)
      );
  
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    });
  
    return closestCity;
  }

  export default findClosestCity;

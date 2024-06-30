# Weather App

An alien friendly Weather App 😊
Weather App is a web-based application that provides weather information for cities around the globe. The app offers basic and advanced versions, with the advanced version featuring more sophisticated functionalities and an interactive 3D Earth visualization. As humans inhabit more planets we will add each one of them in this Weather App covering the Solar System and beyond.

## Features

### Basic Weather App

The basic version was completely build by ChatGPT. This basic version of the Weather App provides the following features:

- **City Weather Information**: Displays weather details including temperature, humidity, weather.
- **Basic 3d Earth Model**: A basic Earth model with highlighted cities (200+ cities) as pins which on click shows the mentioned details about that particular city.
- **Static Weather Box**: Basic tootltip nothing much. Displays the necessary information.

### Advanced Weather App (Weather App+)

The advanced version was made by unlike basic version was developed by human hands and it enhance its UI to a level beyond. It is moslty focused on futuristic Sci-fi design having animations and components which boosts the user experience. This advanced version, known as Weather App+, extends the functionality of the basic app with additional features:

- **3D Interactive Earth**: Utilizes Three.js and @react-three/fiber to provide an interactive 3D Earth component where cities are visualized. A high resoloution Earth design.
- **Weather Icons**: Displays weather condition icons fetched from the OpenWeatherMap API.
- **Advanced Tooltip**: A more detailed tooltip with glitch effects, providing information on temperature, humidity, cloudiness, precipitation, wind speed, and weather descriptions.
- **City Search**: City search option is added where the user is no more restricted to the pins and can search any city and its weather.
- **Detailed Modal**: With the search option a detailed Modal is added to include much more information about that particular city.
- **Enhanced Styling**: Includes a futuristic Sci-fi and interactive website design with CSS-based glitch effects, animations and responsive adjustments for various devices. (! the app is not yet completely optimized for all mobile devices and ipads in particular, user may face some issues with certain deivces)

## Components

### Basic Weather App Components

1. **`WeatherApp`**: The main component that encapsulates the overall functionality of the app.
2. **`City Pins`**: Represents a city on the map.
3. **`Weather box`**: Displays the weather information in a basic tooltip when a city is clicked.

### Advanced Weather App (Weather App+) Components

1. **`WeatherAppPlus`**: The main component for the advanced version, extending functionalities of the basic app.
2. **`Earth`**: Renders an interactive 3D Earth with city markers using Three.js and @react-three/fiber with high reseloution, better pins and design.
3. **`City`**: Similar to the basic version but includes advanced interactions for 3D visualization.
4. **`Tooltip`**: Enhanced tooltip with detailed weather information, hovering effect and glitch effects.
5. **`WeatherInfo`**: Handles fetching weather information from the OpenWeatherMap API.
6. **`WeatherIcon`**: Displays weather icons based on the fetched weather data.
7. **`Weaether Modal`**: A detailed Modal is that includes much more information about a city.
8. **`Versatile Search box`**: Device responsive search box with amazing design and funtionalities.

## Project Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **npm**: Comes with Node.js, used for managing dependencies.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-app.git

2. Navigate to the project directory:
   ```bash
   cd weather-app
3. Install dependencies:
   ```bash
    npm install

### Running the App

1. Start the development server:
   ```bash
    npm start
2. This will automatically run in the browser and the app but if it doesn't open your browser and navigate to http://localhost:3000 to view the app.

## Usage

### Basic Weather App

- **Hover over a city** to view weather details in a tooltip.
- The tooltip will display the **temperature, humidity, cloudiness, precipitation, and wind speed** for the hovered city.

### Advanced Weather App (Weather App+)

- **Interact with the 3D Earth** by rotating and zooming.
- Hover over a city marker to view a detailed weather tooltip, including weather icons and a glitch effect.

## Customization

### Adding Cities

- To add more cities, update the **City component** with the new city data and coordinates.

### Styling

- Modify the **Tooltip component's CSS** for custom styling of the tooltip.
- Update the glitch effect by modifying the CSS animations in the **Tooltip component**.

### API Key

- The OpenWeatherMap API key must be set in the `fetchWeatherInfo` function. Replace `'YOUR_API_KEY'` with your actual API key in the `WeatherInfo.js` file.

  ```javascript
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
### Acknowledgments

 - Three.js: For the 3D rendering library.
 - @react-three/fiber: For integrating Three.js with React.
 - OpenWeatherMap API: For providing weather data.

### Authors
 - s.kibs
 - Mohsin 

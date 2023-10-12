import React, { useEffect, useState } from "react";

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
    const [userCity, setUserCity] = useState("Loading...");

    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position.coords);
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject("Geolocation is not available in this browser.");
        }
      });
    };

    const getCityFromCoordinates = async (lat, lon) => {
      const apiKey = "a0e02d705ef3115c379a3bd9cd84a527";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&pretty=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const city = data.results[0]?.components.city || "Unknown";
        return city;
      } catch (error) {
        console.error("Error fetching city data:", error);
        return "Unknown";
      }
    };
    useEffect(() => {
      getUserLocation()
        .then((coords) => {
          setUserLocation(coords);
          return getCityFromCoordinates(coords.latitude, coords.longitude);
        })
        .then((city) => {
          setUserCity(city);
        })
        .catch((error) => {
          console.error("Error getting user location:", error);
        });

      // Fetch weather data based on userCity here...
    }, []);

    return (
      <div className="weather-info">
        <strong>Location:</strong> {userCity}
        {weatherData && (
          <>
            <br />
            <strong>Weather:</strong> {weatherData.weather[0].description},{" "}
            <strong>Temperature:</strong>{" "}
            {Math.round(weatherData.main.temp - 273.15)}°C
          </>
        )}
      </div>
    );
  };
  return { weatherData, setWeatherData };
};
export default useWeatherData;

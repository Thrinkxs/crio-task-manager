import React, { useEffect, useState } from "react";

const useWeatherData = () => {
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
    const apiKey = "30eed2d5a628423c8763dc8c496d9060";
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
    const fetchData = async () => {
      try {
        const coords = await getUserLocation();
        setUserLocation(coords);
        const city = await getCityFromCoordinates(
          coords.latitude,
          coords.longitude
        );
        setUserCity(city);

        const apiKey = "a0e02d705ef3115c379a3bd9cd84a527";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  return { weatherData, userCity };
};

export default useWeatherData;

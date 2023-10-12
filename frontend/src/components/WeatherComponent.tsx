import React from "react";
import useWeatherData from "../hooks/useWeatherData";

const WeatherComponent = () => {
  const { weatherData } = useWeatherData();
  return (
    <div className="weather-info">
      {/* <strong>Location:</strong> {weatherData.userCity} */}
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

export default WeatherComponent;

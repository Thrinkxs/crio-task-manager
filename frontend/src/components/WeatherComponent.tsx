import React from "react";
import useWeatherData from "../hooks/useWeatherData";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const WeatherComponent = () => {
  const { weatherData, userCity } = useWeatherData();

  // Define icons for weather conditions
  const weatherIcons = {
    Clear: <WiDaySunny size={48} className="text-yellow-500" />,
    Clouds: <WiCloudy size={48} className="text-gray-500" />,
    Rain: <WiRain size={48} className="text-blue-500" />,
    Snow: <WiSnow size={48} className="text-blue-300" />,
    Thunderstorm: <WiThunderstorm size={48} className="text-yellow-800" />,
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md ">
      <strong className="text-2xl block mb-4  ">Weather Information</strong>
      <div className="mb-4">
        <strong className="text-lg">Location:</strong> {userCity}
      </div>
      {weatherData && (
        <div>
          <strong className="text-lg">Weather:</strong>
          <div className="flex items-center">
            {weatherData?.weather[0]?.main in weatherIcons
              ? weatherIcons[weatherData?.weather[0]?.main]
              : null}
            <span className="ml-2">{weatherData?.weather[0]?.description}</span>
          </div>
          <strong className="text-lg">Temperature:</strong>{" "}
          {Math.round(weatherData?.main?.temp - 273.15)}°C
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;

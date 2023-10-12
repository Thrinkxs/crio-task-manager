import React from "react";
import useWeatherData from "../hooks/useWeatherData";
import WeatherComponent from "./WeatherComponent";

const Dashboard = () => {
  // const { weatherData, setWeatherData } = useWeatherData();
  return (
    <div className="bg-white p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <WeatherComponent />
      <p className="text-gray-700">
        Welcome to the Dashboard. This is where you can view important
        information.
      </p>
    </div>
  );
};

export default Dashboard;

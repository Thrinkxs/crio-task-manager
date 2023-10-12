import React, { useEffect, useState } from "react";
import WeatherComponent from "../components/WeatherComponent";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className="bg-fav1 min-h-screen  flex gap-4  items-center justify-center w-full mx-20">
        <WeatherComponent />
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">Welcome to Crio Task Manager</h1>
          <p className="text-xl mt-4">
            your one spot to organize and manage tasks.
          </p>
          <p className="text-2xl mt-4">
            Current Time: {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

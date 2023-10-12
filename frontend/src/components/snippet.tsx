// import { useState, useEffect,createContext, useContext, ReactNode } from "react";
// import { Axios } from "../Axios";
// type Props = {
//   children: ReactNode;
// };

// const userContext = createContext({});

// const UserContextProvider = ({ children }: Props) => {
//   const [user, setUser] = useState({});

// useEffect(() => {

// })

//   return (
//     <userContext.Provider value={{ user, setUser }}>
//       {children}
//     </userContext.Provider>
//   );
// };

// export const useUser = () => useContext(userContext);

// useEffect(() => {
//     // Fetch weather data from an API (e.g., OpenWeatherMap)
//     const fetchWeatherData = async () => {
//       try {
//         const apiKey = "YOUR_API_KEY"; // Replace with your API key
//         const city = "New York"; // Replace with your desired city
//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//         const response = await fetch(url);
//         const data = await response.json();

//         setWeatherData(data);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     };

//     fetchWeatherData();
//   }, []);


{
    coord: {
    lon: 27.975,
    lat: -26.0961
    },
    weather: [
    {
    id: 804,
    main: "Clouds",
    description: "overcast clouds",
    icon: "04n"
    }
    ],
    base: "stations",
    main: {
    temp: 289.67,
    feels_like: 289.39,
    temp_min: 289.67,
    temp_max: 290.04,
    pressure: 1019,
    humidity: 77
    },
    visibility: 10000,
    wind: {
    speed: 2.06,
    deg: 240
    },
    clouds: {
    all: 85
    },
    dt: 1697147443,
    sys: {
    type: 1,
    id: 1958,
    country: "ZA",
    sunrise: 1697081791,
    sunset: 1697127154
    },
    timezone: 7200,
    id: 993800,
    name: "Randburg",
    cod: 200
    }
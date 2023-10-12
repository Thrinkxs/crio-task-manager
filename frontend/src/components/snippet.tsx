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

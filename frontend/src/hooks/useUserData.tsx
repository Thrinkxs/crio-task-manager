import { useState, useEffect } from "react";
import { Axios } from "../Axios";

type User = {
  _id: string;
  username: string;
};

const useUserData = () => {
  const [userData, setUserData] = useState<User[]>([]);

  // Function to fetch data from the API endpoint
  const fetchData = async () => {
    try {
      const response = await Axios.get("/api/users/");
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const data: { users: User[] } = await response.data;
      setUserData(data.users);

      localStorage.setItem("userData", JSON.stringify(data.users));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Check if data is available in local storage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }

    //updates the local storage every 5 mins 5 * 60 * 1000 || 5 secs
    const fetchInterval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return { userData };
};

export default useUserData;

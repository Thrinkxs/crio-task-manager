import { useState, useEffect } from "react";
import { Axios } from "../Axios";

type Task = {
  _id: string;
  name: string;
  description: string;
  assignee: string;
  status: string;
  category: string;
};

const useTaskData = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);

  // Function to fetch data from the API endpoint
  const fetchData = async () => {
    try {
      const response = await Axios.get("/api/tasks/");
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const data: { tasks: Task[] } = await response.data;
      setTaskData(data.tasks);

      localStorage.setItem("taskData", JSON.stringify(data.tasks));
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };

  useEffect(() => {
    // Check if data is available in local storage
    const storedData = localStorage.getItem("taskData");
    if (storedData) {
      setTaskData(JSON.parse(storedData));
    }

    //updates the local storage every 5 mins 5 * 60 * 1000 || 5 secs
    const fetchInterval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return { taskData };
};

export default useTaskData;

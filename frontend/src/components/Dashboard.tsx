import React from "react";
import useWeatherData from "../hooks/useWeatherData";
import WeatherComponent from "./WeatherComponent";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ChakraProvider,
} from "@chakra-ui/react";
import useTaskData from "../hooks/useTaskData";

const Dashboard = () => {
  const { taskData } = useTaskData();
  const Tasks = taskData;
  return (
    <div className="bg-white p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <WeatherComponent />
      <p className="text-gray-700">
        Welcome to the Dashboard. This is where you can view important
        information.
      </p>
      <ChakraProvider>
        <TableContainer className="my-20">
          <Table variant="striped">
            <TableCaption>List of all tasks in progress </TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Assignee</Th>
                <Th>Status</Th>
                <Th>Category</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Tasks.filter((task) => task.status === "In Progress").map(
                (task) => {
                  return (
                    <Tr key={task._id}>
                      <Td>{task.name}</Td>
                      <Td>{task.description}</Td>
                      <Td>{task.assignee}</Td>
                      <Td>{task.status}</Td>
                      <Td>{task.category}</Td>
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </ChakraProvider>
    </div>
  );
};

export default Dashboard;

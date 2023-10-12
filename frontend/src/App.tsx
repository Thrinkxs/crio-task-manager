import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <>
      <div className="app flex">
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { UserHome, Home, NewFeed, Login, FindFood, Result } from "./components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/client" element={<Home />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/news" element={<NewFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/food" element={<FindFood />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

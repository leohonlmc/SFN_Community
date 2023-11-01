import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home, NewFeed, Login } from "./components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/news" element={<NewFeed />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

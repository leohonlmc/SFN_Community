import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {
  UserHome,
  NewFeed,
  Login,
  FindFood,
  Result,
  Wishlist,
  Donate,
  Inventory,
} from "./components";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/news" element={<NewFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/food" element={<FindFood />} />
        <Route path="/result" element={<Result />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

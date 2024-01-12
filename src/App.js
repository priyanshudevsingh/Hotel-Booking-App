import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import HotelListings from "./Components/HotelListings";
import HotelDetails from "./Components/HotelDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel_listings" element={<HotelListings />} />
          <Route path="/hotel_details/:id" element={<HotelDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

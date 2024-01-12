import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/navbar";
import Home from "./Components/home";
import HotelListings from "./Components/hotelListings";
import HotelDetails from "./Components/hotelDetails";
import Thanks from "./Components/thanks";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotel_listings" element={<HotelListings />} />
          <Route path="/hotel_details/:id" element={<HotelDetails />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

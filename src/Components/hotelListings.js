import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";

import "leaflet/dist/leaflet.css";
import { GOOGLE_MAPS_API_KEY } from "./apiKey";

const HotelListings = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const res = await fetch(
          `https://65841ac24d1ee97c6bcefd4e.mockapi.io/hotellistings`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        // Filter hotels based on the search query
        const filteredHotels = data.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setHotels(filteredHotels);
        setTotalPages(Math.ceil(filteredHotels.length / 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotelsData();
  }, [currentPage, searchQuery]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const lastCardIndex = currentPage * 4;
  const firstCardIndex = lastCardIndex - 4;
  const currentCards = hotels.slice(firstCardIndex, lastCardIndex);

  const customRectangleIcon = {
    path: 'M -10 -5 L -10 5 L 10 5 L 10 -5 Z',
    fillColor: 'orange',
    fillOpacity: 1,
    strokeColor: 'black',
    strokeWeight: 1,
    scale: 2,
  };

  return (
    <>
      <div className="home-container">
        {/* left side google maps */}
        <div className="map-container">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={3}
            >
              {currentCards.map((hotel) => (
                <Marker
                  position={{
                    lat: parseFloat(hotel.latitude),
                    lng: parseFloat(hotel.longitude),
                  }}
                  label={`$ ${parseInt(hotel.price)}`}
                  title={hotel.name}
                  icon={customRectangleIcon}
                >
                </Marker>
              ))}
            </GoogleMap>
          )}
        </div>

        {/* right side hotels list */}
        <div className="cards-container">
          {currentCards.map((hotel) => (
            <div key={hotel.id} className="card">
              <div className="card-link">
                <div className="card-content">
                  <img
                    src={hotel.imageURL}
                    alt="img"
                    className="card-image"
                  ></img>
                  <h2 className="card-title">{hotel.name}</h2>
                  <p className="card-price">Price: ${hotel.price}</p>
                  <NavLink to={`/hotel_details/${hotel.id}`}>
                    <button type="submit" id="submit">
                      View Details
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by hotel name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>

            <button
              onClick={() => handlePageChange(currentPage)}
              disabled={currentPage > totalPages}
            >
              {currentPage}
            </button>

            {currentPage + 1 <= totalPages ? (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage + 1 > totalPages}
              >
                {currentPage + 1}
              </button>
            ) : (
              <span></span>
            )}

            {currentPage + 2 <= totalPages ? (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage + 2 > totalPages}
              >
                {currentPage + 2}
              </button>
            ) : (
              <span></span>
            )}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelListings;

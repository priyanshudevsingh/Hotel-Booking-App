import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import { GOOGLE_MAPS_API_KEY } from "./apiKey";

const HotelListings = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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
        setHotels(data);
        // Filter hotels based on the search query
        const filteredHotels = data.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setHotels(filteredHotels);
        setTotalPages(Math.ceil(data.length / 4));
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

  return (
    <>
      <div className="home-container">
        {/* left side google maps */}
        <div className="map-container">
          <MapContainer
            center={[48.8589633, 2.1822227]}
            zoom={13}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              url={`https://maps.googleapis.com/maps/api/tile?key=${GOOGLE_MAPS_API_KEY}&zoom={z}&x={x}&y={y}`}
            />
            {hotels.map((hotel) => (
              <Marker
                key={hotel.id}
                position={[hotel.latitude, hotel.longitude]}
              >
                <Popup>{hotel.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* right side hotels list */}

        <div className="cards-container">
          {currentCards.map((hotels) => (
            <div key={hotels.id} className="card">
              <div className="card-link">
                <div className="card-content">
                  <img
                    src={hotels.imageURL}
                    alt="img"
                    className="card-image"
                  ></img>
                  <h2 className="card-title">{hotels.name}</h2>
                  <p className="card-price">Price: ${hotels.price}</p>
                  <NavLink to={`/hotels/${hotels.id}`}>
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

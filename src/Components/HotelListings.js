import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "leaflet/dist/leaflet.css";

const HotelListings = () => {
  // State variables
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Google Maps configuration
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  // Load Google Maps API script
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Fetch hotels data from the mock API
  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_MOCK_API,
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

  // Handlers for pagination
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

  // Calculate indices for the currently visible cards
  const lastCardIndex = currentPage * 4;
  const firstCardIndex = lastCardIndex - 4;
  const currentCards = hotels.slice(firstCardIndex, lastCardIndex);

  // Custom marker icon for Google Maps
  const customRectangleIcon = {
    path: "M -10 -5 L -10 5 L 10 5 L 10 -5 Z",
    fillColor: "orange",
    fillOpacity: 1,
    strokeColor: "black",
    strokeWeight: 1,
    scale: 2,
  };

  return (
    <>
      <div className="home-container">
        {/* Left side: Google Maps */}
        <div className="map-container">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={3}
            >
              {/* Display markers on the map for each hotel */}
              {currentCards.map((hotel) => (
                <Marker
                  key={hotel.id}
                  position={{
                    lat: parseFloat(hotel.latitude),
                    lng: parseFloat(hotel.longitude),
                  }}
                  label={`$ ${parseInt(hotel.price)}`}
                  title={hotel.name}
                  icon={customRectangleIcon}
                />
              ))}
            </GoogleMap>
          )}
        </div>

        {/* Right side: Hotels list and search */}
        <div className="cards-container">
          {/* Display hotel cards */}
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
                  {/* Link to hotel details page */}
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

          {/* Pagination buttons */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>

            {/* Display current and next pages */}
            {[currentPage, currentPage + 1].map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page > totalPages}
              >
                {page}
              </button>
            ))}

            {/* Display second next page if applicable */}
            {currentPage + 2 <= totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 2)}
                disabled={currentPage + 2 > totalPages}
              >
                {currentPage + 2}
              </button>
            )}

            {/* Next page button */}
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

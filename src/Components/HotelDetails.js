import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const HotelDetails = () => {
  // Extracting the hotel ID from the route parameters
  const { id } = useParams();

  // State to store details of the selected hotel
  const [details, setDetails] = useState(null);

  // Fetch hotel details when the component mounts or the ID changes
  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        // Fetching hotel details from the mock API using the provided ID
        const res = await fetch(
          `https://65841ac24d1ee97c6bcefd4e.mockapi.io/hotellistings/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        // Updating the state with fetched hotel details
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotelsData();
  }, [id]);

  // Function to format and display the listed date and time
  const calDateTime = (createdAt) => {
    const dateTime = new Date(createdAt);

    const day = String(dateTime.getDate()).padStart(2, "0");
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const year = dateTime.getFullYear();

    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");

    // Formatting the date and time
    const formattedDate = `${day}-${month}-${year} at ${hours}:${minutes}`;

    return formattedDate;
  };

  return (
    // Container for displaying hotel details
    <div className="listing-details-container">
      {details && (
        // Displaying hotel details if available
        <div className="listing-details">
          <img src={details.imageURL} alt="Listing" className="listing-image" />
          <div className="listing-info">
            {/* Hotel details: name, description, price, listed by, listed on, zipcode */}
            <h2 className="listing-name">{details.name}</h2>
            <p className="listing-description">{details.description}</p>
            <p className="listing-price">Price: ${details.price}</p>
            <p className="listing-listed-by">Listed By: {details.listedBy}</p>
            <p className="listing-listed-on">
              Listed On: {calDateTime(details.listedOn)}
            </p>
            <p className="listing-zipcode">Zipcode: {details.zipcode}</p>

            {/* Button to reserve the hotel (disabled if status is false) */}
            <button
              className="book-now-button"
              disabled={details.status === false}
            >
              Reserve
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;

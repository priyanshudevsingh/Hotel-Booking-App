import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const HotelDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
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
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotelsData();
  }, [id]);

  const calDateTime = (createdAt) => {
    const dateTime = new Date(createdAt);

    const day = String(dateTime.getDate()).padStart(2, "0");
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const year = dateTime.getFullYear();

    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year} at ${hours}:${minutes}`;

    return formattedDate;
  };

  return (
    <div className="listing-details-container">
      {details && (
        <div className="listing-details">
          <img src={details.imageURL} alt="Listing" className="listing-image" />
          <div className="listing-info">
            <h2 className="listing-name">{details.name}</h2>
            <p className="listing-description">{details.description}</p>
            <p className="listing-price">Price: ${details.price}</p>
            <p className="listing-listed-by">Listed By: {details.listedBy}</p>
            <p className="listing-location">
              Location: {details.latitude}, {details.longitude}
            </p>
            <p className="listing-listed-on">
              Listed On: {calDateTime(details.listedOn)}
            </p>
            <p className="listing-zipcode">Zipcode: {details.zipcode}</p>
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

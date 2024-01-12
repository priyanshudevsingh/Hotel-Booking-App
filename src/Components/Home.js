import React from "react";
import bookingmeme from "../assets/bookingmeme.gif";
import { useNavigate } from "react-router-dom";

// Functional component for the Home page
const Home = () => {
  const navigate = useNavigate();

  // Function to handle the redirection to the "/hotel_listings" route
  const redirect = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    navigate("/hotel_listings"); // Navigating to the "/hotel_listings" route
  };

  // JSX structure for the Home component
  return (
    <>
      <section className="homepage">
        <p className="text4">
          Welcome to <span className="tuoj">BookKing</span>, one stop
          accommodation solution for Travellers!
        </p>

        <p className="text1">
          Made With ❤️ By &nbsp;
          <a
            className="linkedinlink"
            href="https://www.linkedin.com/in/priyanshudevsingh/"
          >
            Priyanshu Singh
          </a>
        </p>

        <img className="bookingmeme" src={bookingmeme} alt="booking meme"></img>

        {/* Button to trigger the redirection */}
        <button className="redirectbut" onClick={redirect}>
          Book Hotel Now
        </button>
      </section>
    </>
  );
};

// Exporting the Home component as the default export
export default Home;

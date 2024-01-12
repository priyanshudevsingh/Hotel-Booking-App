import React from "react";
import bookingmeme from "../assets/bookingmeme.gif";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const redirect = (e) => {
    e.preventDefault();
    navigate("/hotel_listings");
  };
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

        <button className="redirectbut" onClick={redirect}>
          Book Hotel Now
        </button>
      </section>
    </>
  );
};

export default Home;

// {cinemaData.cinema.movies.shows.map((show, j)=>
//     <div key={j}>
//     {/* {show.seats.filter(seat=> !seat.booked).length} */}
//     <h2>{show.room}</h2>
//     </div>
//     )}
import "./ShowCard.css";

import { useState, useEffect } from "react";
// import BookingButton from "../booking-button/BookingButton";

export default function ShowCard() {
  // const [cinemaData, setCinemaData] = useState(null);
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);

  // state to track if application is loading
  const [loading, setLoading] = useState(true);

  // state to track any error message
  const [error, setError] = useState(null);


  // trigger the arrow function inside useEffect ONE time before loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/cinema.json");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const allShows = data.cinema.movies.flatMap((movie) => movie.shows);


        setMovies(data.cinema.movies);
        // setCinemaData(data);
        setShows(allShows);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // check if loading, if true then we should display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // check if there is an error, if true then we should display it
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  function bookIt() {
    alert(`du har bokat`)
    console.log(shows);

  }

  return (
    
    <>

      {movies.map((movie, i) => (
        <div key={i} className="show-card">
          <h3>{movie.title}</h3>
          <div className="movie-info">
            <div>År: {movie.year}</div>
            <div>Längd: {movie.duration}</div>
          </div>

          {movie.shows.map((show, j) => (
            <div key={j} className="test">
              <h2>{show.room}</h2>
              <div className="time">Tid: {show.time}</div>
              <div>
                Antal platser kvar: {" "}
                {show.seats.filter((seat) => !seat.booked).length}
              </div>
              <div className="seats">
                {show.seats.map((seat) => (
                  <button key={seat.seatNumber} onClick={bookIt} className={seat.booked ? "booked seat-visual" : "not-booked seat-visual"}>
                    &#8470; {seat.seatNumber}

                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}


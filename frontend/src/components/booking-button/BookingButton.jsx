

import { useState, useEffect } from "react";

export default function BookingButton() {

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
    console.log("BUTTON CLICKED")
  }

  return (
    <>
      {console.log(shows)}
      {movies.map((movie, i) => (
        <div key={i}>
            {movie.shows.map((show, j) => (
            <div key={j}>
              {show.seats.map((seat) => (
                <button key={seat.seatNumber} onClick={bookIt} className={seat.booked ? "booked seat-visual" : "not-booked seat-visual"}>
              &#8470; {seat.seatNumber}</button>
            ))}
            </div>
           
          ))}
        </div>
      ))}
    </>
  );
}


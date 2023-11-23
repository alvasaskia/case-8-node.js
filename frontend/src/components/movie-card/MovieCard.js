import "./MovieCard.css";
import { useState, useEffect } from "react";



export default function MovieCard() {
  // const [cinemaData, setCinemaData] = useState(null);
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
        // setCinemaData(data);
        setMovies(data.cinema.movies);
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
    return <div>Loading...</div>
  }

  // check if there is an error, if true then we should display it
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {movies.map((movie, i) =>
        <div key={i} className="movie-card">
          <div className="movie-card-content">
            <img src={movie.img} alt="movieposter" />
            {/* <h3>{movie.title}</h3> */}
            <div className="movie-text">
              <p>År: {movie.year}</p>
              <p>Längd: {movie.duration}</p>
              <details>
                <summary>Handling:</summary>
                {movie.description}
              </details>
              {/* <div className="button-img">
             <img src="/img/button.png" alt="" />
             </div> */}
              {/* <NavLink to={movie.id}>Läs mer om filmen här...</NavLink> */}
            </div>

          </div>
        </div>
      )}
    </>
  )

}
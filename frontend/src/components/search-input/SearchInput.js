import { useState, useEffect } from "react";
import "./SearchInput.css"


export default function SearchInput() {
    const [cinemaData, setCinemaData] = useState(null);
    // const [movies, setMovies] = useState([]);
    const [searchString, setSearchString] = useState("Sök");

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
                setCinemaData(data);
                // setMovies(data.cinema.movies);
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
    const filteredMovies = cinemaData.cinema.movies.filter(movie => movie.title.toLocaleLowerCase().includes(searchString))
// if(searchString==="")
// return (
//     <div>Sök på något
  
//     </div>
// ) 
    return (
        <div>
            <div><input placeholder="Search movie title" type="text" name="search" onInput={e => setSearchString(e.target.value)} value={searchString} /></div>
            <div>  {filteredMovies.map(movie => (
            <div className='search-result' key={movie.id}>
                <span>
                <p className="heading">Title:</p><p>{movie.title}</p> 
                </span>
                <span><p className="heading">Längd:</p><p>{movie.duration}</p></span>
               <span> <p className="heading">År:</p><p>{movie.year}</p> </span>
                </div>
                ))}
                </div>
        </div>
    )

}
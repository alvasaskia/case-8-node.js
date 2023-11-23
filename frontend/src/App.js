import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { useState, useEffect } from "react";

// pages
import Welcome from "./pages/Welcome";
import Booking from "./pages/Booking";
import Movie from "./pages/Movie";

// components


// layouts
import RootLayout from "./layouts/RootLayout";
import SearchInput from "./pages/Search";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Welcome />} />
      <Route path="booking" element={<Booking />} />
      <Route path="1" element={<Movie />} />
      <Route path="search" element={<SearchInput/>}/>
    </Route>
  )
);

function App() {
  const [cinemaData, setCinemaData] = useState(null);

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

  return (
    /* <h1>{cinemaData.cinema.name}</h1>
      <h3>{cinemaData.cinema.movies[0].title}</h3>
      {console.log(cinemaData.cinema.movies[0])}

    
    


      {/* Render other details from the cinemaData object here */
    <>
      {console.log(cinemaData.cinema.name)}
   
      <RouterProvider router={router} />



    </>
  );
}

export default App;

import { NavLink, Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import "./RootLayout.css"



export default function RootLayout() {


  return (
    <div className="root-layout">
      <header>
        <nav>
        <img src="/img/logo.png" alt="" />
          <NavLink to="/">Start</NavLink>
          <NavLink to="booking">Alla visningar</NavLink>
          <NavLink to="search">Sök på filmer</NavLink>
        </nav>
      </header>
      <Header/>
      <main className="outlet-main">
        <Outlet />
      </main>
    </div>
  )
}
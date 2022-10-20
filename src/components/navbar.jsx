import "bootstrap/dist/css/bootstrap.css";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light my-2 shadow ms-auto">
      <div className="container-fluid ">
        <Link className="navbar-brand " to="/home">
          <h3 className="bg-white head-style shadow-sm p-2 rounded head">
            Movie Rental
          </h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        </div>
        <div className=" collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/home">
                <h6 className=" ">Home</h6>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                <h6 className="">Customers</h6>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/genres">
                <h6 className=" ">Genres</h6>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                <h6 className=" ">Movies</h6>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="rentals">
                <h6 className=" ">Rentals</h6>
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mx-5 ">
            <li className="nav-item">
              <NavLink className="nav-link bg-secondary text-white btn-radius" to="login">
                <h6 className=" ">Login</h6>
              </NavLink>
            </li>
            <li className="nav-item ms-2">
              <NavLink className="nav-link bg-secondary text-white btn-radius" to="register">
                <h6 className=" ">Register</h6>
              </NavLink>
            </li>
          </ul>
        </div>
      
    </nav>
  );
}

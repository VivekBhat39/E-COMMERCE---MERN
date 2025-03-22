import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let cartProduct = JSON.parse(localStorage.getItem("cart")) || [];
    setCartProduct(cartProduct);

    let storedUserId = localStorage.getItem("_id");
    setUserId(storedUserId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("_id");
    setUserId(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm position-fixed w-100 top-0 z-3 py-2">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcnBZPHn2UE-Jnad9N0Kj-Lneq4QxJA4XKjA&s"
            alt="Logo"
            style={{ width: "120px", height: "auto" }}
          />
        </Link>

        {/* Toggle Button for Mobile */}
        <button className="navbar-toggler border-0" type="button" onClick={() => setIsOpen(!isOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <Link className="nav-link fw-bold text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold text-dark" to="/allProduct">All Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold text-dark" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold text-dark" to="/contact">Contact</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link fw-bold text-dark" to="/adminLogin">Admin Login</Link>
            </li> */}
          </ul>
        </div>

        {/* Cart & Authentication Buttons */}
        <ul className="navbar-nav d-flex align-items-center gap-3">
          {/* Cart Icon */}
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center text-dark fw-bold" to="/cart">
              <i className="bi bi-cart3 me-1 fs-5"></i> Cart [ {cartProduct.length} ]
            </Link>
          </li>

          {/* Authentication Section */}
          {userId ? (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-dark fw-bold" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-user mx-1"></i> Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-outline-primary px-3 fw-bold" to="/signin">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary px-3 fw-bold" to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
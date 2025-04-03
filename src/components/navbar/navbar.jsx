import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">MOCKCRYPTO</h1>
      <ul>
        <li>Home</li>
        <li>Featured</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select>
          <option value="usd">USD</option>
          <option value="euro">EURO</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign Up <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;

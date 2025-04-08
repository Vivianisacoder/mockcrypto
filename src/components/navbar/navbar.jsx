import React, { useContext } from "react";
import "./navbar.css";
import { CoinContext } from "../../context/coincontext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className="navbar">
      <Link to={`/`}>
        <h1 className="logo">MOCKCRYPTO</h1>
      </Link>
      <ul>
        <Link to={`/`}>
          <li>Home</li>
        </Link>
        <li>Featured</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign Up <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

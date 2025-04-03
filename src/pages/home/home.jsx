import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/coincontext";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("All Coins:", allCoin);
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = displayCoin.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="home">
        <div className="hero">
          <h1>
            Biggest <br />
            Crypto Marketplace
          </h1>
          <p>
            Welcome to the world's biggest cryptocurrency marketplace. Sign up
            to explore more cryptos.
          </p>
          <form>
            <input
              type="text"
              placeholder="Search Crypto.."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="crypto-table">
          <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H Change</p>
            <p className="market-cap">Market Cap</p>
          </div>
          {filteredCoins.slice(0, 10).map((item, index) => (
            <div className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div className="coin-name">
                <img src={item.image} alt="" />
                <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p>
                {currency.symbol}
                {item.current_price.toLocaleString()}
              </p>
              <p
                style={{ textAlign: "center" }}
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className="market-cap">
                {currency.symbol}
                {item.market_cap.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

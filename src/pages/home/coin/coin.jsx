import React, { useEffect, useState, useContext } from "react";
import "./coin.css";
import { useParams } from "react-router-dom";
import LineChart from "../../../components/LineChart/LineChart";
import { CoinContext } from "../../../context/coincontext";

function Coin() {
  const { coinId: _coinId } = useParams();
  const { currency } = useContext(CoinContext); // Use currency from context
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${_coinId}`,
          options
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    const fetchHistoricalData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${_coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
          options
        );
        const data = await response.json();
        setHistoricalData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setLoading(false);
      }
    };

    setLoading(true); // Set loading to true before fetching
    fetchCoinData();
    fetchHistoricalData();
  }, [_coinId, currency]); // Re-fetch data when _coinId or currency changes

  if (loading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (!coinData || !historicalData) {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <div className="coin">
      <div className="coin-page-name">
        <img src={coinData.image.large} alt={`${coinData.name} logo`} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}
            {coinData.market_data.current_price[
              currency.name
            ]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24-hour High</li>
          <li>
            {currency.symbol}
            {coinData.market_data.high_24h[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24-hour Low</li>
          <li>
            {currency.symbol}
            {coinData.market_data.low_24h[currency.name]?.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Coin;

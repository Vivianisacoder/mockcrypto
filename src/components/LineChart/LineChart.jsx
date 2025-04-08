import React, { useEffect, useState, useContext } from "react";
import Chart from "react-google-charts";
import { CoinContext } from "../../context/coincontext";

const LineChart = ({ historicalData }) => {
  const { currency } = useContext(CoinContext); // Use currency from context
  const [data, setData] = useState([["Date", "Prices"]]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const dataCopy = [["Date", `Prices (${currency.symbol})`]];
      historicalData.prices.forEach((item) => {
        dataCopy.push([
          new Date(item[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          item[1],
        ]);
      });
      setData(dataCopy);
      setIsLoading(false);
    }
  }, [historicalData, currency]); // Re-render when historicalData or currency changes

  const handleToggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const dataToDisplay = showMore ? data : data.slice(0, 11);

  return isLoading ? (
    <div>Loading Chart...</div>
  ) : (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={dataToDisplay}
        options={{
          title: `Price History (${currency.symbol})`,
          hAxis: { title: "Date" },
          vAxis: { title: `Price (${currency.symbol})` },
        }}
      />
      <button onClick={handleToggleShowMore} style={{ marginTop: "1rem" }}>
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default LineChart;

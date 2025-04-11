import { createContext, useEffect, useState } from "react";

// Named export for the context
export const CoinContext = createContext();

// Default export for the provider
const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "USD",
    symbol: "$",
  });
  const [error, setError] = useState(null); // Add error state for better error handling

  useEffect(() => {
    const fetchAllCoin = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-TFTN8UKgcS2QSSCXGFrchPQC",
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coin data");
        }
        const data = await response.json();
        setAllCoin(data);
      } catch (err) {
        console.error("Error fetching coin data:", err);
        setError(err.message); // Set the error message
      }
    };

    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    error, // Provide error state in the context
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;

import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );

  // 🔥 Real conversion rate (can later fetch from API)
  const USD_TO_INR = 90.96;

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const convertAmount = (amount) => {
    if (currency === "INR") {
      return amount * USD_TO_INR;
    }
    return amount;
  };

  const formatCurrency = (amount) => {
    const converted = convertAmount(amount);

    if (currency === "INR") {
      return `₹ ${converted.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;
    }

    return `$ ${converted.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
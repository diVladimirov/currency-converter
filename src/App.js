import { useState, useEffect } from "react";
import { fetchLatest, fetchConvert } from "./services/api";
import CurrencyTemplate from "./components/Main/CurrencyTemplate";
import Header from "./components/Header/Header";
import GlobalStyle from "./config/GlobalStyle";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    async function fetchCurr() {
      try {
        const response = await fetchLatest();
        const firstCurrency = Object.keys(response.results)[0];
        setCurrencies([response.base, ...Object.keys(response.results)]);
        setFromCurrency(response.base);
        setToCurrency(firstCurrency);
        setExchangeRate(response.results[firstCurrency]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurr();
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      async function fetchConvertCurrency() {
        try {
          const response = await fetchConvert(fromCurrency, toCurrency, amount);
          setExchangeRate(response?.result?.rate);
        } catch (error) {
          console.log(error);
        }
      }
      fetchConvertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <h1>Currency Convert</h1>
      <CurrencyTemplate
        currencies={currencies}
        selectedCurrency={fromCurrency}
        handleChangeCurrency={(event) => setFromCurrency(event.target.value)}
        amount={fromAmount.toString()}
        handleChangeAmount={handleFromAmountChange}
      />
      <CurrencyTemplate
        currencies={currencies}
        selectedCurrency={toCurrency}
        handleChangeCurrency={(event) => setToCurrency(event.target.value)}
        amount={toAmount.toString()}
        handleChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;

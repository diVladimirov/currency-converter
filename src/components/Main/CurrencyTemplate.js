import React from "react";
import { InputStyled, SelectStyled } from "./CurrencyTemplate.styled";

const CurrencyTemplate = ({
  currencies,
  selectedCurrency,
  handleChangeCurrency,
  amount,
  handleChangeAmount,
}) => {
  return (
    <div>
      <InputStyled type="number" value={amount} onChange={handleChangeAmount} />
      <SelectStyled value={selectedCurrency} onChange={handleChangeCurrency}>
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </SelectStyled>
    </div>
  );
};

export default CurrencyTemplate;

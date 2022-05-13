import React, { useEffect, useState } from "react";
import { fetchUsd, fetchEur } from "../../services/api";
import { Wrapper, UlStyled } from "./Header.styled";

const Header = () => {
  const [usd, setUsd] = useState();
  const [euro, setEuro] = useState();

  useEffect(() => {
    async function fetchHeaderCurrency() {
      try {
        const responseUsd = await fetchUsd();
        setUsd(Object.values(responseUsd.result));
        const responseEur = await fetchEur();
        setEuro(Object.values(responseEur.result));
      } catch (error) {
        console.log(error);
      }
    }
    fetchHeaderCurrency();
  }, []);

  return (
    <Wrapper>
      <UlStyled>
        <li>USD: {usd}</li>
        <li>EUR: {euro}</li>
      </UlStyled>
    </Wrapper>
  );
};

export default Header;

import axios from "axios";

const APIkey = "ed00aab58f-73caece5b2-rbtypa";
const BASE_URl = "https://api.fastforex.io/";

export const fetchLatest = async () => {
  const response = await axios.get(`${BASE_URl}fetch-all?api_key=${APIkey}`);
  return response.data;
};

export const fetchConvert = async (from, to, amount) => {
  const response = await axios.get(
    `${BASE_URl}convert?from=${from}&to=${to}&amount=${amount}&api_key=${APIkey}`
  );
  return response.data;
};

export const fetchUsd = async () => {
  const response = await axios.get(
    `${BASE_URl}fetch-one?from=USD&to=UAH&api_key=${APIkey}`
  );
  return response.data;
};

export const fetchEur = async () => {
  const response = await axios.get(
    `${BASE_URl}fetch-one?from=EUR&to=UAH&api_key=${APIkey}`
  );
  return response.data;
};

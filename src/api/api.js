import axios from "axios";
import { defaultWeatherData } from "./defaults";

const searchLocation = async (query) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/search.json",
    params: {
      q: query,
    },
    headers: {
      "X-RapidAPI-Key": "4be6ebbec6msh2f2b885f4e62b6ap17cccdjsn8fdfe5c80d81",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    if (!query) return [];
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error in searchLocation API : ", error);
    return [];
  }
};

const searchByCoordinates = async ({ lat, lon }) => {
  return await searchLocation(`${lat},${lon}`);
};

const weatherForecast = async (query) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: {
      q: query,
      days: "3",
    },
    headers: {
      "X-RapidAPI-Key": "4be6ebbec6msh2f2b885f4e62b6ap17cccdjsn8fdfe5c80d81",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    if (!query) return {};
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error in weatherForecast API : ", error);
    return {};
  }
};

const weatherForecastByCoordinates = async ({ lat, lon }) => {
  // return await weatherForecast(`${lat},${lon}`);
  return defaultWeatherData;
};

export {
  defaultWeatherData,
  searchLocation,
  searchByCoordinates,
  weatherForecastByCoordinates,
};

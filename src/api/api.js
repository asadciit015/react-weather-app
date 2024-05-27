import axios from "axios";

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
    console.error("Error in searchLocation : ", error);
  }
};

const searchByCoordinates = async ({ lat, lon }) => {
  return await searchLocation(`${lat},${lon}`);
};

export { searchLocation, searchByCoordinates };

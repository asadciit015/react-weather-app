import axios from "axios";

const searchLocation = async (query) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/search.json",
    params: {
      q: query,
      //   q: "31.5656873,74.2934531",
    },
    headers: {
      "X-RapidAPI-Key": "4be6ebbec6msh2f2b885f4e62b6ap17cccdjsn8fdfe5c80d81",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export { searchLocation };

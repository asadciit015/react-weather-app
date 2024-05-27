// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import parse from "autosuggest-highlight/parse";

// // This key was created specifically for the demo in mui.com.
// // You need to create a new one for your application.
// const GOOGLE_MAPS_API_KEY = "AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE";

// function loadScript(src, position, id) {
//   if (!position) {
//     return;
//   }

//   const script = document.createElement("script");
//   script.setAttribute("async", "");
//   script.setAttribute("id", id);
//   script.src = src;
//   position.appendChild(script);
// }

// const autocompleteService = { current: null };

// export default function SearchBar() {
//   const [value, setValue] = React.useState(null);
//   const [inputValue, setInputValue] = React.useState("");
//   const [options, setOptions] = React.useState([]);
//   const loaded = React.useRef(false);

//   if (typeof window !== "undefined" && !loaded.current) {
//     if (!document.querySelector("#google-maps")) {
//       loadScript(
//         `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
//         document.querySelector("head"),
//         "google-maps"
//       );
//     }

//     loaded.current = true;
//   }

//   const fetch = React.useMemo(
//     () =>
//       debounce((request, callback) => {
//         autocompleteService.current.getPlacePredictions(request, callback);
//       }, 400),
//     []
//   );

//   React.useEffect(() => {
//     let active = true;

//     if (!autocompleteService.current && window.google) {
//       autocompleteService.current =
//         new window.google.maps.places.AutocompleteService();
//     }
//     if (!autocompleteService.current) {
//       return undefined;
//     }

//     if (inputValue === "") {
//       setOptions(value ? [value] : []);
//       return undefined;
//     }

//     fetch({ input: inputValue }, (results) => {
//       if (active) {
//         let newOptions = [];

//         if (value) {
//           newOptions = [value];
//         }

//         if (results) {
//           newOptions = [...newOptions, ...results];
//         }

//         setOptions(newOptions);
//       }
//     });

//     return () => {
//       active = false;
//     };
//   }, [value, inputValue, fetch]);

//   return (
//     <Autocomplete
//       id="google-map-demo"
//       fullWidth
//       sx={{
//         borderRadius: 20,
//       }}
//       getOptionLabel={(option) =>
//         typeof option === "string" ? option : option.description
//       }
//       filterOptions={(x) => x}
//       options={options}
//       autoComplete
//       includeInputInList
//       filterSelectedOptions
//       value={value}
//       noOptionsText="No locations"
//       onChange={(event, newValue) => {
//         setOptions(newValue ? [newValue, ...options] : options);
//         setValue(newValue);
//       }}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//       }}
//       renderInput={(params) => (
//         <TextField {...params} label="Search a location" fullWidth />
//       )}
//       renderOption={(props, option) => {
//         const matches =
//           option.structured_formatting.main_text_matched_substrings || [];

//         const parts = parse(
//           option.structured_formatting.main_text,
//           matches.map((match) => [match.offset, match.offset + match.length])
//         );

//         return (
//           <li {...props}>
//             <Grid container alignItems="center">
//               <Grid item sx={{ display: "flex", width: 44 }}>
//                 <LocationOnIcon sx={{ color: "text.secondary" }} />
//               </Grid>
//               <Grid
//                 item
//                 sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
//               >
//                 {parts.map((part, index) => (
//                   <Box
//                     key={index}
//                     component="span"
//                     sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
//                   >
//                     {part.text}
//                   </Box>
//                 ))}
//                 <Typography variant="body2" color="text.secondary">
//                   {option.structured_formatting.secondary_text}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </li>
//         );
//       }}
//     />
//   );
// }

import * as React from "react";
import { debounce } from "@mui/material/utils";
import SearchSelectField from "@commercetools-uikit/async-select-field";

const SearchBar = () => {
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [cacheOptions, setCacheOptions] = React.useState([]);

  //   const fetchLocationData = React.useCallback(
  //     debounce((name, controller) => {
  //       console.log(`Search by: ${name}`);
  //       const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}`;

  //       try {
  //         const response = fetch(apiUrl);

  //         if (!response.ok) {
  //           const errorData = {
  //             error: "Network response was not ok",
  //             value: response.status,
  //           };
  //           return errorData; // Include error information in the JSON response
  //         }

  //         const data = response.json();
  //         return data.results && data.results.length
  //           ? data.results.map((r) => {
  //               return {
  //                 id: r.id,
  //                 name: r.name,
  //                 label: `${r.name}, ${r.country}`,
  //                 value: {
  //                   country: r.country,
  //                   country_code: r.country_code,
  //                   latitude: r.latitude,
  //                   longitude: r.longitude,
  //                 },
  //               };
  //             })
  //           : []; // Return the JSON response
  //       } catch (error) {
  //         const errorData = {
  //           value: error.message,
  //           error: "error",
  //         };

  //         return errorData; // Include error information in the JSON response
  //       }

  //       // return () => {
  //       //   // Cancel the request on unmount
  //       //   controller.abort();
  //       // };
  //     }, 2000),
  //     []
  //   );

  const fetchLocationData = async (name) => {
    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${name}`;
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = {
          error: "Network response was not ok",
          value: response.status,
        };
        return errorData; // Include error information in the JSON response
      }

      const data = await response.json();
      return data.results && data.results.length
        ? data.results.map((r) => {
            return {
              id: r.id,
              name: r.name,
              label: `${r.name}, ${r.country}`,
              value: {
                country: r.country,
                country_code: r.country_code,
                latitude: r.latitude,
                longitude: r.longitude,
              },
            };
          })
        : []; // Return the JSON response
    } catch (error) {
      const errorData = {
        value: error.message,
        error: "error",
      };

      return errorData; // Include error information in the JSON response
    }
  };

  return (
    <SearchSelectField
      title="location"
      id="location"
      name="location"
      isRequired={true}
      horizontalConstraint={7}
      optionType="single-lined"
      isAutofocussed={false}
      backspaceRemovesValue={true}
      isClearable={true}
      isDisabled={false}
      isReadOnly={false}
      isMulti={false}
      value={selectedLocation}
      onChange={(event, info) => {
        const value = event.target.value;
        setSelectedLocation(value);
        console.log(`selected location: ${JSON.stringify(value)}`);
        return value;
      }}
      // noOptionsMessage="No exact match found"
      loadingMessage="Searching location ..."
      placeholder="Search by location ..."
      loadOptions={(inputValue) => {
        const results = fetchLocationData(inputValue);
        setCacheOptions(results);
        return results;
      }}
      //   loadOptions={(inputValue) =>
      //     delay(2200).then(async () => {
      //       const results = await fetchLocationData(inputValue);
      //       setCacheOptions(results);
      //       return results;
      //     })
      //   }
      renderError={(key) => {
        // This example shows how to handle custom errors on top of the
        // predefined errors of FieldErrors which this component and other
        // Field components use under the hood.
        switch (key) {
          case "missing":
            return "This field is required.";
          case "duplicate":
            return "This location is already attached to the store. Customers must be unique.";
          case "error":
            return "A custom error.";
          default:
            return null;
        }
      }}
      defaultOptions={cacheOptions}
      cacheOptions={cacheOptions}
    />
  );
};

export default SearchBar;

import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";

import { AppContext } from "./store/AppContext";
import Header from "./components/Header";
import DateAndTimeInfo from "./components/DateAndTimeInfo";
import WeatherDetails from "./components/WeatherDetails";
import DaysForeCast from "./components/DaysForeCast";
import HourlyForeCast from "./components/HourlyForeCast";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

const MainContainer = styled(Box)(({ theme }) => ({
  margin: "28px 60px",
  background: "none",
  boxShadow: "none",

  [theme.breakpoints.down("md")]: {
    margin: "20px 40px",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "18px 20px",
  },
}));

export default function App() {
  const { theme } = useContext(AppContext);

  const myTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: theme === "light" ? "#292929" : "#FFFFFF",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "Poppins",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "light" ? "colored" : "dark"}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background:
            theme === "light"
              ? "linear-gradient(110deg, rgba(158, 158, 158, 0.00) 0%, #383838 71.82%)"
              : "linear-gradient(110deg, #383838 0%, rgba(158, 158, 158, 0.00) 71.82%)",
        }}
      >
        <Header />

        <MainContainer component="main" display={"flex"}>
          <Grid
            container
            columnSpacing={6}
            rowSpacing={5}
            // sx={{marginLeft: 0}}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <DateAndTimeInfo />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={7}>
              <WeatherDetails weatherType={"Sunny"} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={4}>
              <DaysForeCast />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={8}>
              <HourlyForeCast />
            </Grid>
          </Grid>
        </MainContainer>
      </Box>
    </ThemeProvider>
  );
}

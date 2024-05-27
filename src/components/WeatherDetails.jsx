import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const WeatherDetailsContainer = styled(Grid)(({ theme }) => ({
  // paddingTop: 30.33,
  // paddingLeft: 30.33,
  padding: 24,
  filter:
    theme.palette.mode === "light"
      ? "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.50))"
      : "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5))",
  backgroundColor: theme.palette.mode === "light" ? "#D9D9D9" : "#444",
  borderRadius: 30,
  // [theme.breakpoints.up("md")]: {
  //   height: 330,
  // },
  [theme.breakpoints.down("sm")]: {
    "& .MuiGrid-item": {
      textAlign: "center",
    },
  },
  [theme.breakpoints.down("md")]: {
    "& .MuiGrid-item": {
      paddingTop: 64,
    },
  },
}));

const Temperature = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "80px",
  lineHeight: 1,
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(80deg, #292929 -2.93%, rgba(255, 255, 255, 0.00) 212.44%)"
      : "linear-gradient(84deg, #FFF -16.56%, rgba(255, 255, 255, 0.00) 118.43%)",
  backgroundImage:
    theme.palette.mode === "light"
      ? "linear-gradient(#292929, #FFFFFF00)"
      : "linear-gradient(#FFFFFF, #FFFFFF00)",
  backgroundClip: "text",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
}));

const FeelsLike = styled(Box)({
  display: "inline-flex",
  verticalAlign: "middle",
  alignItems: "center",
});

const FeelsLikeLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "#4c4c4c" : "#bcbcbc",
  fontFamily: "Poppins",
  fontWeight: 800,
  fontSize: "20px",
  lineHeight: 1,
  marginRight: theme.spacing(1),
}));

const FeelsLikeValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "#4c4c4c" : "#bcbcbc",
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: "32px",
  lineHeight: 0,
}));

const SunTimes = styled(Box)(({ theme }) => ({
  display: "flex",
  verticalAlign: "middle",
  alignItems: "start",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const SunRiseLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "#4c4c4c" : "#FFF",
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: 20,
}));

const SunRiseValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "#4c4c4c" : "#FFF",
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: 16,
}));

const WeatherType = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: theme.palette.mode === "light" ? 700 : 600,
  fontSize: 32,
  textAlign: "center",
}));

const ExtraDetailLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: 16,
}));

const ExtraDetailValue = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: 20,
}));

function WeatherDetails(props) {
  const { weatherType } = props;
  const theme = useTheme();

  return (
    <WeatherDetailsContainer container>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        // lg={4}
      >
        <Temperature color="primary">24°C</Temperature>
        <FeelsLike>
          <FeelsLikeLabel>Feels like:</FeelsLikeLabel>
          <FeelsLikeValue>22°C</FeelsLikeValue>
        </FeelsLike>
        <SunTimes p={"36.49px 0 0 20px"}>
          <img
            src={require(`../icons/sunrise-${theme.palette.mode}.png`)}
            alt={"sunrise-icon"}
            loading="lazy"
          />
          <Box marginLeft={2}>
            <SunRiseLabel>Sunrise</SunRiseLabel>
            <SunRiseValue>06:37 AM</SunRiseValue>
          </Box>
        </SunTimes>

        <SunTimes p={"10.33px 0 0 20px"}>
          <img
            src={require(`../icons/sunset-${theme.palette.mode}.png`)}
            alt={"sunset-icon"}
            loading="lazy"
          />

          <Box marginLeft={2}>
            <SunRiseLabel>Sunset</SunRiseLabel>
            <SunRiseValue>20:37 AM</SunRiseValue>
          </Box>
        </SunTimes>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        // lg={4}
      >
        <Box display={"inline-grid"} sx={{ marginTop: "-56px" }}>
          <Box
            sx={{
              width: 270,
              height: 270,
              flexShrink: 0,
              backgroundImage: `url(${require(`../icons/${weatherType.toLowerCase()}.png`)})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
          <WeatherType>{weatherType}</WeatherType>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        // lg={4}
      >
        <Grid
          container
          columnSpacing={1}
          rowSpacing={3}
        //   sx={{ marginLeft: "80px !important" }}

        >
          <Grid item xs={6}>
            <img
              src={require(`../icons/humidity-${theme.palette.mode}.png`)}
              alt={"humidity-icon"}
              loading="lazy"
              style={{
                width: 60,
                height: 50.127,
              }}
            />
            <ExtraDetailValue color="primary" sx={{ marginLeft: 2 }}>
              41%
            </ExtraDetailValue>
            <ExtraDetailLabel color="primary">Humidity</ExtraDetailLabel>
          </Grid>
          <Grid item xs={6}>
            <img
              src={require(`../icons/wind-${theme.palette.mode}.png`)}
              alt={"wind-icon"}
              loading="lazy"
              style={{
                width: 60,
                height: 50.127,
              }}
            />
            <ExtraDetailValue color="primary" sx={{ marginLeft: 0.5 }}>
              2km/h
            </ExtraDetailValue>
            <ExtraDetailLabel color="primary">Wind Speed</ExtraDetailLabel>
          </Grid>
          <Grid item xs={6}>
            <img
              src={require(`../icons/pressure-${theme.palette.mode}.png`)}
              alt={"pressure-icon"}
              loading="lazy"
              style={{
                width: 58,
                height: 58,
              }}
            />
            <ExtraDetailValue color="primary">997hPa</ExtraDetailValue>
            <ExtraDetailLabel color="primary">Pressure</ExtraDetailLabel>
          </Grid>
          <Grid item xs={6}>
            <img
              src={require(`../icons/uv-${theme.palette.mode}.png`)}
              alt={"uv-icon"}
              loading="lazy"
              style={{
                width: 58,
                height: 58,
              }}
            />
            <ExtraDetailValue color="primary" sx={{ marginLeft: 3 }}>
              8
            </ExtraDetailValue>
            <ExtraDetailLabel color="primary" sx={{ marginLeft: 2.5 }}>
              UV
            </ExtraDetailLabel>
          </Grid>
        </Grid>
      </Grid>
    </WeatherDetailsContainer>
  );
}

export default WeatherDetails;

import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  day: {
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(171deg, #F88508 -12.41%, rgba(246, 250, 217, 0.00) 163.32%)"
        : "#373636",
  },
  night: {
    background:
      theme.palette.mode === "light"
        ? "linear-gradient(174deg, #443D64 -15.92%, rgba(101, 130, 198, 0.00) 192.45%)"
        : "#373636",
  },
}));

const WidgetContainer = styled(Box)(({ theme }) => ({
  filter:
    theme.palette.mode === "light"
      ? "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.50))"
      : "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5))",
  backgroundColor: theme.palette.mode === "light" ? "#D9D9D9" : "#444444",
  borderRadius: 30,
  minHeight: 230,
}));

const Heading = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: 32,
  textAlign: "center",
});

const DayContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  "& > :not(style)": {
    margin: "19px auto 0 auto",
    // margin: "19px 19px 0px 33px",
    minWidth: 130,
    minHeight: 270,
    flexShrink: 0,
  },
}));

const Time = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: 24,
  textAlign: "center",
  margin: "12px 0 0 0",
});

const DayCard = styled(Paper)(({ theme }) => ({
  borderRadius: 40,
  boxShadow: "none",
}));

const Temperature = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "20px",
  textAlign: "center",
}));

const Wind = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "20px",
  textAlign: "center",
}));

function HourlyForeCast() {
  const classes = useStyles();

  return (
    <WidgetContainer p={2}>
      <Heading> Hourly Forecast:</Heading>

      <DayContainer>
        <DayCard elevation={0} className={classes.day}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <Time>12:00</Time>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 80,
                  height: 80,
                }}
                src={require(`../icons/clear-3.png`)}
                alt={"clear-icon"}
                loading="lazy"
              />
              <Temperature>26°C</Temperature>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 55,
                  height: 55,
                }}
                src={require(`../icons/navigation-1.png`)}
                alt={"navigation-icon"}
                loading="lazy"
              />
              <Wind>3km/h</Wind>
            </Grid>
          </Grid>
        </DayCard>

        <DayCard elevation={0} className={classes.day}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <Time>15:00</Time>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 80,
                  height: 80,
                }}
                src={require(`../icons/clear-4.png`)}
                alt={"clear-icon"}
                loading="lazy"
              />
              <Temperature>27°C</Temperature>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 55,
                  height: 55,
                  transform: "rotate(-30deg)",
                }}
                src={require(`../icons/navigation-1.png`)}
                alt={"navigation-icon"}
                loading="lazy"
              />
              <Wind>2km/h</Wind>
            </Grid>
          </Grid>
        </DayCard>

        <DayCard elevation={0} className={classes.day}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <Time>18:00</Time>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 80,
                  height: 80,
                }}
                src={require(`../icons/cloud-2.png`)}
                alt={"cloud-icon"}
                loading="lazy"
              />
              <Temperature>27°C</Temperature>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 55,
                  height: 55,
                }}
                src={require(`../icons/navigation-1.png`)}
                alt={"navigation-icon"}
                loading="lazy"
              />
              <Wind>2km/h</Wind>
            </Grid>
          </Grid>
        </DayCard>

        <DayCard elevation={0} className={classes.night}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <Time>21:00</Time>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 80,
                  height: 80,
                }}
                src={require(`../icons/cloud-2.png`)}
                alt={"cloud-icon"}
                loading="lazy"
              />
              <Temperature>25°C</Temperature>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 55,
                  height: 55,
                  transform: "rotate(30deg)",
                }}
                src={require(`../icons/navigation-1.png`)}
                alt={"navigation-icon"}
                loading="lazy"
              />
              <Wind>3km/h</Wind>
            </Grid>
          </Grid>
        </DayCard>

        <DayCard elevation={0} className={classes.night}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <Time>00:00</Time>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 80,
                  height: 80,
                }}
                src={require(`../icons/clear-3.png`)}
                alt={"clear-icon"}
                loading="lazy"
              />
              <Temperature>22°C</Temperature>
            </Grid>
            <Grid item xs>
              <img
                style={{
                  width: 55,
                  height: 55,
                }}
                src={require(`../icons/navigation-1.png`)}
                alt={"navigation-icon"}
                loading="lazy"
              />
              <Wind>3km/h</Wind>
            </Grid>
          </Grid>
        </DayCard>
      </DayContainer>
    </WidgetContainer>
  );
}

export default HourlyForeCast;

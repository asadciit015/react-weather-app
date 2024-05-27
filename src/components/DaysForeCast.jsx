import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

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

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(2),
    flex: "1 1",
  },
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  flex: "1 1",
}));

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  flex: "1 1",
}));

function DaysForeCast() {
  return (
    <WidgetContainer p={3}>
      <Heading> 5 Days Forecast:</Heading>
      <List dense>
        <ListItemStyled>
          <ListItemIconStyled>
            <img
              style={{
                width: 45,
                height: 45,
              }}
              src={require(`../icons/cloud-1.png`)}
              alt={"sunrise-icon"}
              loading="lazy"
            />
          </ListItemIconStyled>
          <ListItemTextStyled id="forecast_temp-value" primary="20°C" />
          <ListItemTextStyled id="forecast-date" primary="Friday, 1 Sep" />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemIconStyled>
            <img
              style={{
                width: 40,
                height: 40,
              }}
              src={require(`../icons/mist-1.png`)}
              alt={"sunrise-icon"}
              loading="lazy"
            />
          </ListItemIconStyled>
          <ListItemTextStyled id="forecast_temp-value" primary="22°C" />
          <ListItemTextStyled id="forecast-date" primary="Saturday, 2 Sep" />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemIconStyled>
            <img
              style={{
                width: 40,
                height: 40,
              }}
              src={require(`../icons/clear-2.png`)}
              alt={"sunrise-icon"}
              loading="lazy"
            />
          </ListItemIconStyled>
          <ListItemTextStyled id="forecast_temp-value" primary="27°C" />
          <ListItemTextStyled id="forecast-date" primary="Sunday, 3 Sep" />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemIconStyled>
            <img
              style={{
                width: 40,
                height: 40,
              }}
              src={require(`../icons/drizzle-1.png`)}
              alt={"sunrise-icon"}
              loading="lazy"
            />
          </ListItemIconStyled>
          <ListItemTextStyled id="forecast_temp-value" primary="18°C" />
          <ListItemTextStyled id="forecast-date" primary="Monday, 4 Sep" />
        </ListItemStyled>

        <ListItemStyled>
          <ListItemIconStyled>
            <img
              style={{
                width: 40,
                height: 40,
              }}
              src={require(`../icons/rain-1.png`)}
              alt={"sunrise-icon"}
              loading="lazy"
            />
          </ListItemIconStyled>
          <ListItemTextStyled id="forecast_temp-value" primary="16°C" />
          <ListItemTextStyled id="forecast-date" primary="Tuesday, 5 Sep" />
        </ListItemStyled>
      </List>
    </WidgetContainer>
  );
}

export default DaysForeCast;

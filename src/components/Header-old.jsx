import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { alpha, styled } from "@mui/material/styles";
import ThemeSwitcher from "./ThemeSwitcher";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid #000",
  borderRadius: 40,
  background: theme.palette.mode === "light" ? "#D9D9D9" : "#444",
  boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.25)",
  backgroundColor: theme.palette.mode === "light" ? "#D9D9D9" : "#444",
  height: 62,
  flexShrink: 0,
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  marginRight: theme.spacing(2),

  marginLeft: theme.spacing(5),
  width: "40%",

  [theme.breakpoints.down("md")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color:
    theme.palette.mode === "light" ? "#292929" : "rgba(255, 255, 255, 0.60)",
  background: "none",
  fontSize: 18,
  height: 64,
  "& .MuiInputBase-input": {
    // margin-left: 30px;
    // margin-right: 30px;

    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(8)})`,
    transition: theme.transitions.create("width"),

    width: "54ch",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

const SearchIcon = ({ isDarkMode = false }) => {
  return isDarkMode ? (
    <svg
      width="40"
      height="46"
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="40" height="46" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_17_128"
            transform="matrix(0.0212766 0 0 0.0185014 0 -0.00878816)"
          />
        </pattern>
        <image
          id="image0_17_128"
          width="47"
          height="55"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAA3CAYAAACcohNaAAAAAXNSR0IArs4c6QAABQBJREFUaEPVWr9vHEUUnnl7bmhwKpcEiSYVZ5ECGnAqKoj/AFBMgVzGiILGt/t2T7boYiRKCiNSUhioUUIDAhFhVynjVIiKuIksfPsGfavd093czOzens++G+lkybsz97037+f3TqsZFzPfFJG7nU6nKyI3y+O6RLQqIi+UUsf4HxGdDgaDYyL6gZlPZ/zaYrtucwgAE9F9Edkkogpw46NE5JSIjkTkq1kEmQp8CTpRSm01Rlr/4qGIpG2EaASemVejKLpvjOF6LNO/AfOKouggz3PcBEyt0aoFD+BKqUdE1G104gwviQj8405TAYLgkyTpaq0BHAKE1olSCtdfOCecFABKwQuhS+Fhbm+GDsItGGPupGlaneV93Qs+y7ItEXkQAH6mlGIROWyqKaCAQEQEIWCCr7qQQQAi+iyO48OQoE7wNRo/M8Yc4DMNaBsEhNBa7+DjEqLJDUyAL6/6mUfjZ3mebzS50qamD0VFUfTYJ4BS6nWfksbA1zjniYhszKJtn0ClKUGACX8IOfEY+DRNWWuNOG6vkziO5xptQgIYY9IkSSbC9BB8mYCeOYA/F5HuPDTu8gOUEbYJlWXGup3IRsEfEtE968BLt/E6X/D5gIh8y8xjmb0A79O677rqAMz63Ge+IgLnHRZ1FfgDFFq21lElXoW5TGE+KB8QWotVgUdotKtDJImDWbXYdn+WZQD5YHQ/Ig8zrw/B+0xGRG5ch9YrYGX0+dcWftR0tEtCpdTcQ2OTG8myDPWNHfuHFqGZ2RVlrtVkKsE8pjOMOjpJksdRFL1n2RbKUmS8a13MvEFEj0ZB5Hn+S5qmG4XDLjX4LMuMwymu1VlDTotsy8w3Cs27wMdxXNthXZU9hfAtNHhPuDyL47jo7Jbb5pfaYZn5iIjuWja8HHG+SQ1xVc7pKND+clAuYxkW1N1EE7IUtQ2kzbIMNfJri2Q6TWoubz1ftl7ezn2epuRjMEpidqKed5rOUnRS0KKrumxC/Fz2DfgIL28PW4KH9lE/j1FwV2k+AcLrrGQwxoYSjXibadnbNrcRIrxqeZtS+yBBp2au2oAd3dOWqXNylS7iB182Dx+oI3VDDIaXJQ6Rn22mGI7sWUxb8jzfaUvqBvl5pRSoDy+HLiJMROgpG49iYCIico+IsHc4tBCRQj4iwh9w/zut+PlKSyH62ep5jzFk6HQ6xTRDRE6qyQgRFd3/YDDAeHOryXjo4uLi036//02dL9V2TCH2tu7wuufQdqlp+9V/zs/P1/f39/8OnVELvopCoSlGHcjQ84AAT9bW1t7Z3t6+8O1vBL7aDHYNydjBJrfGLyIPlVJvE9Eb9iF2LWM/nwq8JQSixKajGm0iCKYsyCeYa532+/1beZ7/6oo6g8HgwyzLfnId2gq8lWBQVmwifRtjCrI2iiJMURClwO8XTqy1xsgejn3kmnbHcfxBp9P50aH9F/hdw+7u7vNL0XwT1bZ5J03TL7XWXzj2PhGRd5n55eizmTXfBqRvDzMjyP9MRAWdN7qCVeVlgpjlrL29vbU8z3/3+NIno4lroTRfCd3r9d5aWVn5TSm1Yinipdb6dq/Xe1r40SxamudeTw+Lr3wqIrdh/wsLHiiZ+Tsi+shh/w+Z+eNFB/8KEf2plLo1KoAx5g9jzPsLDR6A7QQmIl8bYz5P0/S/hQcPAcoEht/zbDPz99UtLAX40v5X7b7hf4HOQPVQhLfOAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  ) : (
    <svg
      width="40"
      height="46"
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="40" height="46" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_9_372"
            transform="matrix(0.0212766 0 0 0.0185014 0 -0.00878816)"
          />
        </pattern>
        <image
          id="image0_9_372"
          width="47"
          height="55"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAA3CAYAAACcohNaAAAAAXNSR0IArs4c6QAABS5JREFUaEPVWT1sI0UUnrd2YouGXBNKchLNVTjCBTSQFBHasZa7KFIq0IUCUV5OFJQcHd0lEiWFT1AiJeB4J1KC7mhAIE441ZWXqxAVRIouu1l7H3rLrmWPd2Z27Ti2R0qT3X3+3jfvb74BNuISQiyFYXjbsqwKIi7F5ioAsICI/zLGWvQ/ADgNw7BlWdYPtm2fjviz0ecwjBECDAD3wjC8AwAJ4MymEPHUsqx9RNwdxZFc4Ak0Y+wLxthWZqTmF+uMsS+HcSIT+L29vYVyuXyPMfbAjCX/GxReALDjed7u+vo6hVqmZQRPwEul0mMAqGSyOMJLiNjyfX81qwNa8M1mkxKPgC8YMJ0gYr3T6UTJ2W63WwSAHC8Wi5HThUKBbFG4vamzRbuAiKu1Wi2ypVtK8EKILUR8qAF+hogPfN+vZ2WKgMQ7uQUAFIKvpoGLw+i+bduUD8qVCt7A+BljjOJzJw9oGUGcR9uMMfobcCLLDgyAj5l5rmD8LAzDlSxbatry5DkRZVnWE5UDvu/fVJHUB96QnCee562MwrbKoXgXyIGBfNAlcR94IQTFIdVxeZ3Ytj3WaqNzIO4DA2W6Cz5uQM9TgL/wPK8yDsYVeUCjQ18OxAm8LDeyLnjXdesAcFcyeOUxbsoFVQ4g4iPOeV9nj8BrWKe2PZauqnNCE743e9mPwLuuu0ODlsy653lL1xEuOcJnl3NOpTVaCXgqjX3TISLe55zvmLZ5XM9d190GgIe99qnycM6Xu+BVIeN53o1JsJ4Ai6vPPynkdEMH0jxkjI29NGbZMSEEzTd9tb83Igj8QJWZdMgkjilCp1t1CPwTAHivl4l2u73qOA51vImuRqOxUiwWH0tx/zPnfCVK2JkGL4RAmd5JJ6suaanbcs5vRMyngbdt23jCuq540uGbavCKcnlm23Z0spvtmJ/1hN1njN2WytFER4M8dd44Q1xXcsq/47run7Lk0tdhZ3q2IW+FEHR6eX2aQifLzKWc56kZ6E7u4wwllYJBwuzAPD/TJyliUTFdZpbermonVIKX8gwbxz2dpGh+Hji5X1f4aAQvUukqSvUgdiBVt8mr3g6zCwbBK1UIGFDMyuVybuVqGLC93wyr1KVqleVyeUD4oR/LIn7mdcQk6uoUDKVKrBM/h7nFkJ1KblsQkTp8mv5vFLy0+jxJ2ToNnfT5y8vLR3lUBgI9Pz9/l/T5XtCI/5+JACJIlKDbQ+nzCUs6+Vnqxi26GQGA6DbD9/2T5GakVCpFp39EjG5GslwPtdvtTxzH+cYUgsYTk0G9NdnXPie2Y6b73kPEvy8uLpY3Njb+0hkwgqePTbcYo3igceDp4uLiO9VqNVDZzwQ++ZjGCIrzFDV5aPxhGH4HAG8DwBuyEXmWkZ/nAi85QVXijjyNZvSCbg9JL9qhrnl0dHQrCIJf0qoOIn7AOW+k2R0KfK+heDfICbo5icTaOClpzKAbw+RKknpHCwD20267Xdd1AODHFPZpvqrUarUXV8J8RnZzv3Z4ePgVIn6e4sDTTqfzruM4L3ufjcx8boSaDxDREkL8BACRnCeV4/SbkasEMKqt4+Pj14Ig+E2RSx/3Nq6pYj5x/ODg4K1CofArY2xOIuNlsVisrq2tPYtya1SmxvW94gxLxeBZEARViv+pBU+kNJvNby3L+lAmiHpDrVb7aKrBNxqNV+bm5v5AxFuSA797nvf+VIMnwHIDQ8Svz8/PP9vc3LycevDkQNzA6oj4Kef8+2QXZgI8gaXhUD43/AfzEF+COQpjtQAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export default function Header(props) {
  const { isDarkMode, setIsDarkMode } = props;
  return (
    <React.Fragment>
      {/* <HideOnScroll {...props}> */}
      {/* <AppBar
        color="default"
        elevation={0}
        sx={{
          background: "transparent",
          //   background: isDarkMode
          //     ? "linear-gradient(110deg, #383838 0%, rgba(158, 158, 158, 0.00) 71.82%)"
          //     : "linear-gradient(110deg, rgba(158, 158, 158, 0.00) 0%, #383838 71.82%)",
          padding: "60px 30px",
        }}
      > */}
        {/* <Toolbar> */}
          <ThemeSwitcher
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />

          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon isDarkMode={isDarkMode} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={`Search for your preffered city...`}
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
        {/* </Toolbar> */}
      {/* </AppBar> */}
      {/* </HideOnScroll> */}
      {/* <Toolbar /> */}
    </React.Fragment>
  );
}

import React, { useEffect, useState } from "react";
import NavbarContainer from "../containers/common/NavbarContainer";
import SidebarContainer from "../containers/common/SidebarContainer";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import FrameRoutes from "../routes/FrameRoutes";
import { useLocation } from "react-router-dom";
import UnFrameRoutes from "../routes/UnFrameRoutes";
const useStyles = makeStyles((theme) => {
  return {
    main: {
      display: "flex",
      minWidth: "480px",
      [theme.breakpoints.down("md")]: {
        margin: 0,
        justifyContent: "center",
      },
    },
    content: {
      width: "calc(100% - 200px)",
      [theme.breakpoints.down("md")]: {
        margin: 0,
        width: "100%",
      },
      minWidth: "480px",
    },
  };
});

function PathCheck(path) {
  switch (path) {
    case "/login":
    case "/register":
    case "/find":
    case "/password":
    case "/error":
      return false;
    default:
      return true;
  }
}

function Wrapper() {
  const classes = useStyles();
  const [frame, setFrame] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setFrame(PathCheck(pathname));
  }, [pathname]);
  return frame ? (
    <>
      <NavbarContainer />
      <Container className={classes.main} disableGutters>
        <SidebarContainer />
        <Container className={classes.content}>
          <FrameRoutes />
        </Container>
      </Container>
      <FooterComponent />
    </>
  ) : (
    <UnFrameRoutes />
  );
}

export default Wrapper;

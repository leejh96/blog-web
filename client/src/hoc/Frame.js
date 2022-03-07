import React, { Fragment } from "react";
import Navbar from "../containers/common/NavbarContainer";
import SideBar from "../containers/common/SidebarContainer";
import Footer from "../components/FooterComponent/FooterComponent";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

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

function Frame(Component) {
  function WithFrameComponent() {
    const classes = useStyles();
    return (
      <Fragment>
        <Navbar />
        <Container className={classes.main} disableGutters>
          <SideBar />
          <Container className={classes.content}>
            <Component />
          </Container>
        </Container>
        <Footer />
      </Fragment>
    );
  }
  return WithFrameComponent;
}

export default Frame;

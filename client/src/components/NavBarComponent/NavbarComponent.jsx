import React from "react";
import AuthF from "./section/AuthF";
import AuthT from "./section/AuthT";
import { Link } from "react-router-dom";
import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SideSection from "./section/SideSection";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      margin: 0,
      textAlign: "center",
      minWidth: "480px",
      borderBottom: "0.25px solid #dcdcdc",
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
    logoBox: {
      padding: "1.5rem 0",
    },
    logo: {
      fontWeight: "bold",
    },
    side: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
  };
});
function NavbarComponent({
  onList,
  offList,
  onClickLogout,
  user,
  pathname,
  onClickMenu,
  toggle,
  onClickDeleteStudy,
  onClickCreateStudy,
  onClickPlusBtn,
  onChangeText,
  study,
  createToggle,
  boardList,
}) {
  const classes = useStyles();
  return (
    <Container className={classes.area} disableGutters maxWidth="xl">
      {Object.keys(user).length > 0 ? (
        <AuthT onList={onList} onClickLogout={onClickLogout} />
      ) : (
        <AuthF offList={offList} />
      )}

      <Box className={classes.logoBox}>
        <Typography variant="h4" className={classes.logo}>
          <Link to="/" className={classes.link}>
            JULOG
          </Link>
        </Typography>
        <Box className={classes.side}>
          <SideSection
            onClickDeleteStudy={onClickDeleteStudy}
            onClickCreateStudy={onClickCreateStudy}
            onClickPlusBtn={onClickPlusBtn}
            onChangeText={onChangeText}
            pathname={pathname}
            onClickMenu={onClickMenu}
            toggle={toggle}
            user={user}
            study={study}
            createToggle={createToggle}
            boardList={boardList}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default NavbarComponent;

import React from "react";
import AuthF from "./section/AuthF";
import AuthT from "./section/AuthT";
import { Link } from "react-router-dom";
import { Container, Box, Typography, Button } from "@material-ui/core";
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

    btn: {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        margin: "0 auto",
        minWidth: "32px",
        fontSize: "24px",
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
  studies,
  createToggle,
  boardList,
  access,
  OauthCookie,
  categories,
}) {
  const classes = useStyles();
  return (
    <Container className={classes.area} disableGutters maxWidth="xl">
      {access || OauthCookie ? (
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
        <Button
          size="small"
          className={classes.btn}
          onClick={onClickMenu}
          variant="text"
        >
          Menu
        </Button>
        {toggle ? (
          <Box className={classes.side}>
            <SideSection
              onClickDeleteStudy={onClickDeleteStudy}
              onClickCreateStudy={onClickCreateStudy}
              onClickPlusBtn={onClickPlusBtn}
              onChangeText={onChangeText}
              pathname={pathname}
              user={user}
              studies={studies}
              createToggle={createToggle}
              boardList={boardList}
              categories={categories}
            />
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}

export default NavbarComponent;

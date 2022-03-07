import React from "react";
import { Divider, Container, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Study from "./section/Study";
import Board from "./section/Board";
import Setting from "./section/Setting";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      width: "100%",
    },
    titlediv: {
      display: "flex",
      justifyContent: "center",
    },
    btn: {
      margin: 0,
      minWidth: "32px",
      fontSize: "24px",
    },
    divide1: {
      marginBottom: "10px",
    },
    divide2: {
      margin: "10px 0",
    },
  };
});
function SideSection({
  pathname,
  onClickMenu,
  toggle,
  onClickDeleteStudy,
  onClickCreateStudy,
  onClickPlusBtn,
  onChangeText,
  user,
  study,
  createToggle,
  boardList,
}) {
  const classes = useStyles();

  return (
    <Container className={classes.area} disableGutters>
      {pathname.indexOf("/setting") !== -1 ? (
        <Setting />
      ) : (
        <>
          <Box className={classes.titlediv}>
            <Button
              size="small"
              className={classes.btn}
              onClick={onClickMenu}
              variant="text"
            >
              Menu
            </Button>
          </Box>
          {toggle ? (
            <Box>
              <Divider className={classes.divide1} />
              <Study
                onClickDeleteStudy={onClickDeleteStudy}
                onClickCreateStudy={onClickCreateStudy}
                onClickPlusBtn={onClickPlusBtn}
                onChangeText={onChangeText}
                user={user}
                study={study}
                createToggle={createToggle}
              />
              <Divider className={classes.divide2} />
              <Board boardList={boardList} />
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </Container>
  );
}

export default SideSection;

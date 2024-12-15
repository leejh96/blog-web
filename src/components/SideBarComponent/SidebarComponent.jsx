import React from "react";
import { Divider, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Study from "./section/Study";
import Board from "./section/Board";
import MyPage from "./section/MyPage";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      position: "sticky",
      top: "0",
      height: "100vh",
      width: "200px",
      border: "1px solid #eeeeee",
      borderTop: 0,
      borderBottom: 0,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    sidetitle: {
      fontWeight: "bold",
      margin: 0,
      padding: "20px 0 20px 0",
      textAlign: "center",
    },
    divide1: {
      marginBottom: "10px",
    },
    divide2: {
      margin: "10px 0",
    },
  };
});
function SidebarComponent({
  boardList,
  settingList,
  pathname,
  onClickDeleteStudy,
  onClickCreateStudy,
  onClickPlusBtn,
  onChangeText,
  studies,
  user,
  toggle,
}) {
  const classes = useStyles();
  return (
    <Container className={classes.area} disableGutters>
      {pathname.indexOf("mypage") !== -1 ? (
        <MyPage settingList={settingList} />
      ) : (
        <>
          <Typography className={classes.sidetitle}>Menu</Typography>
          <Divider className={classes.divide1} />
          <Study
            onClickDeleteStudy={onClickDeleteStudy}
            onClickCreateStudy={onClickCreateStudy}
            onClickPlusBtn={onClickPlusBtn}
            onChangeText={onChangeText}
            studies={studies}
            user={user}
            toggle={toggle}
          />
          <Divider className={classes.divide2} />
          <Board boardList={boardList} />
        </>
      )}
    </Container>
  );
}

export default SidebarComponent;

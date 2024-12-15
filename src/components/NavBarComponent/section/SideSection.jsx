import React from "react";
import { Divider, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Study from "./section/Study";
import Board from "./section/Board";
import MyPage from "./section/MyPage";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      width: "100%",
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
  onClickDeleteStudy,
  onClickCreateStudy,
  onClickPlusBtn,
  onChangeText,
  user,
  studies,
  createToggle,
  boardList,
  categories,
}) {
  const classes = useStyles();

  return (
    <Container className={classes.area} disableGutters>
      {pathname.indexOf("/mypage") !== -1 ? (
        <MyPage categories={categories} />
      ) : (
        <Box>
          <Divider className={classes.divide1} />
          <Study
            onClickDeleteStudy={onClickDeleteStudy}
            onClickCreateStudy={onClickCreateStudy}
            onClickPlusBtn={onClickPlusBtn}
            onChangeText={onChangeText}
            user={user}
            studies={studies}
            createToggle={createToggle}
          />
          <Divider className={classes.divide2} />
          <Board boardList={boardList} />
        </Box>
      )}
    </Container>
  );
}

export default SideSection;

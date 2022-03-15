import React from "react";
import Intro from "./section/Introduce";
import Notice from "./section/Notice";
import RecentPost from "./section/RecentPost";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import BoxWrap from "./section/BoxWrap";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      marginTop: "10px",
      paddingBottom: "10px",
      justifyContent: "space-around",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
  };
});

function MainComponent({ notices, user, posts }) {
  const classes = useStyles();
  document.title = "JULOG";
  return (
    <>
      <Intro />
      <Container className={classes.area} disableGutters>
        <BoxWrap>
          <Notice title="공지사항" notices={notices} user={user} />
        </BoxWrap>
        <BoxWrap>
          <RecentPost title="최근 게시물" posts={posts} />
        </BoxWrap>
      </Container>
    </>
  );
}
export default MainComponent;

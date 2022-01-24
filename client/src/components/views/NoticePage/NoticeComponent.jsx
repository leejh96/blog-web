import React from "react";
import TableSection from "./section/TableSection";
import Pagination from "./section/Pagination";
import Search from "./section/Search";
import ButtonSection from "./section/ButtonSection";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Typography } from "@material-ui/core";
import Loading from "../LoadingPage/Loading";
const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    title: {
      margin: "16px 0",
      fontWeight: "bold",
    },
  };
});
function NoticeComponent({
  user,
  search,
  load,
  posts,
  pageCnt,
  page,
  onChangeText,
  onSubmithandler,
  onChangeSelect,
}) {
  const classes = useStyles();

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <Box>
          <Typography className={classes.title} variant="h5">
            공지사항
          </Typography>
          <Container className={classes.area} disableGutters>
            <TableSection
              page={parseInt(page)}
              search={search}
              posts={posts}
              user={user}
            />
            <ButtonSection user={user} />
            {!search && <Pagination pageCnt={pageCnt} page={parseInt(page)} />}
            <Search
              onChangeText={onChangeText}
              onSubmithandler={onSubmithandler}
              onChangeSelect={onChangeSelect}
            />
          </Container>
        </Box>
      )}
    </>
  );
}

export default NoticeComponent;

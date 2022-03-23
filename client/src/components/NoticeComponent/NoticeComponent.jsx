import React from "react";
import TableSection from "./section/TableSection";
import Pagination from "./section/Pagination";
import Search from "./section/Search";
import ButtonSection from "./section/ButtonSection";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Typography } from "@material-ui/core";
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
  notices,
  pageCnt,
  page,
  input,
  onSubmithandler,
  onChangeInput,
  countSearch,
}) {
  const classes = useStyles();
  document.title = "공지사항";

  return (
    <Box>
      <Typography className={classes.title} variant="h5">
        공지사항
      </Typography>
      <Container className={classes.area} disableGutters>
        <TableSection
          page={parseInt(page)}
          search={search}
          notices={notices}
          user={user}
        />
        <ButtonSection user={user} />
        {!search && <Pagination pageCnt={pageCnt} page={parseInt(page)} />}
        <Search
          search={search}
          onChangeInput={onChangeInput}
          onSubmithandler={onSubmithandler}
          input={input}
          countSearch={countSearch}
        />
      </Container>
    </Box>
  );
}

export default NoticeComponent;

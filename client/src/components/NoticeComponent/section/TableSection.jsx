import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import TimeLib from "../../../util/time";
const useStyles = makeStyles((theme) => {
  return {
    table: {
      marginBottom: "30px",
    },
    number: {
      width: "10%",
    },
    title: {
      width: "50%",
    },
    author: {
      width: "20%",
    },
    date: {
      width: "20%",
    },
    link: {
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "#999999",
        textDecoration: "underline",
      },
    },
    noticeDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "50vh",
      fontSize: "2rem",
    },
  };
});

function TableSection({ posts, user, page, search }) {
  const classes = useStyles();
  return (
    <>
      {posts.length === 0 ? (
        <Box className={classes.noticeDiv}>
          <Typography variant="h3">게시물이 없습니다.</Typography>
        </Box>
      ) : (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.number} align="center">
                번호
              </TableCell>
              <TableCell className={classes.title} align="center">
                제목
              </TableCell>
              <TableCell className={classes.author} align="center">
                작성자
              </TableCell>
              <TableCell className={classes.date} align="center">
                작성일
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((val, i) => (
              <TableRow key={val._id}>
                {search ? (
                  <TableCell align="center">{i + 1}</TableCell>
                ) : (
                  <TableCell align="center">
                    {(page - 1) * 10 + (i + 1)}
                  </TableCell>
                )}
                <TableCell align="center">
                  <Link
                    className={classes.link}
                    to={user._id ? `/notice/detail/${val._id}` : `/login`}
                  >
                    {val.title}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {val.author ? val.author.nick : "알수없음"}
                </TableCell>
                <TableCell align="center">
                  <TimeLib date={val.date} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default TableSection;

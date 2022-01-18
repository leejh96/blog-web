import React, { useState, useEffect } from "react";
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
import { Link, useParams } from "react-router-dom";
import Loading from "../../LoadingPage/Loading";
import { useDispatch, useSelector } from "react-redux";
import { loadNotice } from "../../../../actions/NoticeAction";
import TimeLib from "../../../../util/time";
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

function TableSection() {
  const classes = useStyles();
  const page = useParams().page;
  const dispatch = useDispatch();
  const [post, setPost] = useState([]);
  const [load, setLoad] = useState(false);
  const searchData = useSelector((state) => state.NoticeReducer.searchNotice);
  const user = useSelector((state) => state.UserReducer.user);
  const search = useSelector((state) => state.NoticeReducer.search);
  useEffect(() => {
    setLoad(true);
    dispatch(loadNotice()).then((res) => {
      setPost(res.data.slice((page - 1) * 10, page * 10));
      setLoad(false);
    });
    return () => {
      setPost([]);
      setLoad(false);
    };
  }, [dispatch, page]);

  useEffect(() => {
    setPost(searchData);
  }, [searchData]);
  return (
    <Box>
      {load ? (
        <Loading />
      ) : post.length === 0 ? (
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
            {post.map((val, i) => (
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
                    to={user._id ? `/notice/${page}/${val._id}` : `/login`}
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
    </Box>
  );
}

export default TableSection;

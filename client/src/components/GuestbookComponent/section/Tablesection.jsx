import React, { Fragment } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimeLib from "../../../util/time";

const useStyles = makeStyles((theme) => ({
  area: {
    marginBottom: "20px",
  },
  nick: {
    width: "15%",
  },
  content: {
    width: "60%",
  },
  time: {
    width: "25%",
  },
  delete: {
    width: "auto",
    padding: "16px 0",
    "$:hover": {
      display: "inline",
    },
  },
}));

// //useSelector의 값은 reducer에서의 return 값을 갖는다. 비구조화할당을 할경우 각각의 변수가
// // state의 뭔 값을 의미하는지 정해주어야 한다.
// const {addGuestbook, delGuestbook} = useSelector(state => ({
//     addGuestbook : state.GuestbookReducer.addGuestbook,
//     delGuestbook : state.GuestbookReducer.delGuestbook
// }));

function Tablesection({ guest, onClickDeleteBtn, load, user }) {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.nick} align="center">
              닉네임
            </TableCell>
            <TableCell className={classes.content} align="center">
              내용
            </TableCell>
            <TableCell className={classes.date} colSpan="2" align="center">
              작성일
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guest.map((val, idx) => {
            return (
              <TableRow key={val._id}>
                <TableCell align="center">
                  {val.writer ? val.writer.nick : "알수없음"}
                </TableCell>
                <TableCell align="center">{val.text}</TableCell>
                <TableCell align="center">
                  <TimeLib date={val.date} />
                </TableCell>
                {user ? (
                  val.writer ? (
                    user._id === val.writer._id || user.role === 3 ? (
                      <TableCell className={classes.delete}>
                        <Button onClick={() => onClickDeleteBtn(val._id)}>
                          X
                        </Button>
                      </TableCell>
                    ) : (
                      <Fragment></Fragment>
                    )
                  ) : user.role === 3 ? (
                    <TableCell className={classes.delete}>
                      <Button onClick={() => onClickDeleteBtn(val._id)}>
                        X
                      </Button>
                    </TableCell>
                  ) : (
                    <Fragment></Fragment>
                  )
                ) : (
                  <Fragment></Fragment>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

export default Tablesection;

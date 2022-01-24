import { Link } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      padding: "30px 12px 30px 12px",
      align: "center",
      borderBottom: "1px solid #eeeeee",
    },
    post: {
      padding: "12px",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "1.25rem",
    },
    postLink: {
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "#ffcaca",
      },
    },
  };
});

function Notice({ title, notices, user }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" align="center" className={classes.title}>
        {title}
      </Typography>
      {notices.map((val, i) => (
        <Box className={classes.post} display="flex" key={i}>
          <Box>{i + 1}</Box>
          <Box>
            <Link
              className={classes.postLink}
              to={user._id ? `/notice/detail/${val._id}` : "/login"}
            >
              {val.title}
            </Link>
          </Box>
          <Box>{val.author ? val.author.nick : "알수없음"}</Box>
        </Box>
      ))}
    </>
  );
}

export default Notice;

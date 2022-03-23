import React from "react";
import { Button, Container, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  area: {
    textAlign: "center",
    padding: "15% 0 5% 0",
    fontSize: "3rem",
  },
  text: {
    marginBottom: "20px",
  },
  btn: {
    marginBottom: "20px",
  },
}));

function Motto({ motto, onChangeMotto, onSubmitMotto, toggle }) {
  const classes = useStyles();
  return (
    <Container disableGutters>
      <Box className={classes.area}>
        {motto
          ? motto.split("\n").map((txt, idx) => (
              <span key={txt + idx}>
                {txt}
                <br />
              </span>
            ))
          : "적고싶은 글귀나 명언을 입력하세요!"}
      </Box>
      <form onSubmit={onSubmitMotto}>
        <Box align="center">
          {toggle ? (
            <TextField
              className={classes.text}
              variant="outlined"
              fullWidth
              onChange={onChangeMotto}
              value={motto}
            />
          ) : null}
          <Button className={classes.btn} type="submit" variant="outlined">
            {toggle ? "저장" : "입력"}
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Motto;

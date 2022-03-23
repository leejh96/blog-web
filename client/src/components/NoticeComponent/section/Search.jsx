import React from "react";
import { Box, TextField, Button, Select, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: "16px",
    },
    text: {
      marginRight: "20px",
    },
    select: {
      marginRight: "20px",
    },
  };
});

function Search({
  onChangeInput,
  onSubmithandler,
  input,
  countSearch,
  search,
}) {
  const { text, type } = input;
  const classes = useStyles();
  const types = [
    {
      type: "title",
      value: "제목",
    },
    {
      type: "author",
      value: "작성자",
    },
  ];
  return (
    <Box className={classes.area}>
      <form onSubmit={onSubmithandler}>
        <Select
          name="type"
          className={classes.select}
          native
          variant="outlined"
          value={type}
          onChange={onChangeInput}
        >
          {types.map((v, i) => (
            <option key={v + i} value={v.type}>
              {v.value}
            </option>
          ))}
        </Select>
        <TextField
          className={classes.text}
          name="text"
          onChange={onChangeInput}
          placeholder="검색"
          variant="outlined"
          required
          value={text}
        />
        <Button type="submit" variant="contained">
          검색
        </Button>
        {search ? <Typography>검색결과 : {countSearch}건</Typography> : null}
      </form>
    </Box>
  );
}

export default Search;

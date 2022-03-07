import React from "react";
import { Box, TextField, Button, Select } from "@material-ui/core";
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

function Search({ onChangeText, onSubmithandler, onChangeSelect }) {
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
          onChange={onChangeSelect}
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
          onChange={onChangeText}
          placeholder="검색"
          variant="outlined"
          required
        />
        <Button type="submit" variant="contained">
          검색
        </Button>
      </form>
    </Box>
  );
}

export default Search;

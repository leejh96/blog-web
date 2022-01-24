// import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import MaterialPagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "30px",
    },
  };
});

function Pagination({ page, pageCnt }) {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      <MaterialPagination
        size="small"
        color="primary"
        page={page}
        count={pageCnt}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/notice/${item.page}`}
            {...item}
          />
        )}
      />
    </Box>
  );
}

export default Pagination;

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { PaginationItem } from "@material-ui/lab";
import MaterialPagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles((theme) => ({
  area: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
}));

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
            to={`/guestbook/${item.page}`}
            {...item}
          />
        )}
      />
    </Box>
  );
}

export default Pagination;

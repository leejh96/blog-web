import { TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    text: {
      marginBottom: "20px",
    },
  };
});

function TextArea({ notice }) {
  const classes = useStyles();

  return (
    <>
      <Box>
        <TextField
          className={classes.text}
          fullWidth
          variant="outlined"
          inputProps={{ disabled: true }}
          value={notice.title || " "}
        />
        <TextField
          className={classes.text}
          fullWidth
          variant="outlined"
          inputProps={{ disabled: true }}
          value={notice.author ? notice.author.nick : "알수없음"}
        />
        <TextField
          className={classes.text}
          fullWidth
          variant="outlined"
          rows="30"
          multiline
          inputProps={{ disabled: true }}
          value={notice.text || ""}
        />
      </Box>
    </>
  );
}

export default TextArea;

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Button, Box, TextareaAutosize } from "@material-ui/core";
import gfm from "remark-gfm";
import { makeStyles } from "@material-ui/core/styles";

import rehypeRaw from "rehype-raw"; //markdown이 html을 읽을 수 있도록 함

const useStyles = makeStyles((theme) => ({
  edit: {
    display: "flex",
    marginBottom: "20px",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  text: {
    width: "50%",
    fontSize: "1rem",
    resize: "none",
    boxSizing: "border-box",
    padding: "20px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  markdown: {
    width: "50%",
    padding: "0 20px",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "16px",
  },
  btn: {
    fontSize: "1.5rem",
  },
}));

const Component = ({ children, className }) => {
  return (
    <>
      {children[0].includes("\n") ? (
        <SyntaxHighlighter
          language={className === undefined ? "" : className.substring(9)} //특정언어지정
          // style={materialLight}
          wrapLongLines={true} //한줄이 길어지면 다음줄로 넘어가게함 default false
          children={children}
        />
      ) : (
        <SyntaxHighlighter
          customStyle={{
            padding: "0 1px",
          }}
          codeTagProps={{
            style: { color: "#7f5cc8" },
          }}
          // style={materialLight}
          PreTag="span" //pre태그 이름을 바꾸는 것
          language={className === undefined ? "" : className.substring(9)} //특정언어지정
          children={children}
          wrapLongLines={true}
        />
      )}
    </>
  );
};

function MarkdownEditorComponent({
  onChangeText,
  onClickUpdate,
  onClickCancel,
  text,
}) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.edit}>
        <TextareaAutosize
          className={classes.text}
          variant="outlined"
          value={text}
          onChange={onChangeText}
          autoFocus
        />
        <ReactMarkdown
          className={classes.markdown}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[gfm, { singleTilde: false }]}
          children={text}
          components={{
            code: Component,
          }}
        />
      </Box>
      <Box className={classes.buttonDiv}>
        <Button
          className={classes.btn}
          variant="contained"
          onClick={onClickUpdate}
        >
          저장
        </Button>
        <Button
          className={classes.btn}
          variant="contained"
          onClick={onClickCancel}
        >
          취소
        </Button>
      </Box>
    </>
  );
}

export default MarkdownEditorComponent;

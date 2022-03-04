import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Button, Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Loading from "../../LoadingPage/Loading";
import gfm from "remark-gfm";
import { makeStyles } from "@material-ui/core/styles";
import rehypeRaw from "rehype-raw"; //markdown이 html을 읽을 수 있도록 함

const useStyles = makeStyles((theme) => ({
  markdown: {
    outline: "none",
    overflow: "auto",
  },
  btn: {
    fontSize: "1.5rem",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "flex-end",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  markdownDiv: {
    marginBottom: "30px",
  },
  textDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    fontSize: "2rem",
  },
}));
const Component = ({ children, className }) => {
  return (
    <>
      {children[0].includes("\n") ? (
        <SyntaxHighlighter
          language={className === undefined ? "" : className.substring(9)} //특정언어지정
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
          PreTag="span" //pre태그 이름을 바꾸는 것
          language={className === undefined ? "" : className.substring(9)} //특정언어지정
          children={children}
        />
      )}
    </>
  );
};

function MarkdownComponent({ load, text, user, page }) {
  const classes = useStyles();
  return (
    <Box className={classes.markdownDiv}>
      {load ? (
        <Loading />
      ) : (
        <>
          {text ? (
            <ReactMarkdown
              className={classes.markdown}
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[gfm]}
              children={text}
              components={{
                code: Component,
              }}
            />
          ) : (
            <Box className={classes.textDiv}>
              <Typography variant="h3">게시물이 없습니다.</Typography>
            </Box>
          )}
          <Box className={classes.buttonDiv}>
            {user.role === 3 ? (
              <Link className={classes.link} to={`/study/${page}/edit`}>
                <Button className={classes.btn} variant="contained">
                  {!text ? "글작성" : "글수정"}
                </Button>
              </Link>
            ) : null}
          </Box>
        </>
      )}
    </Box>
  );
}

export default MarkdownComponent;

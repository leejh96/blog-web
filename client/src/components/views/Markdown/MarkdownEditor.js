import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button, Box, TextareaAutosize } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadOneStudy, updateStudyText } from '../../../actions/StudyAction'
import gfm from 'remark-gfm'
import { makeStyles } from '@material-ui/core/styles';
import { AUTH_ERROR, LOAD_ONE_STUDY, LOAD_ONE_STUDY_ERROR, SERVER_ERROR, UPDATE_STUDY_TEXT, UPDATE_STUDY_TEXT_ERROR } from '../../../actions/type';
import rehypeRaw from 'rehype-raw' //markdown이 html을 읽을 수 있도록 함

const useStyles = makeStyles(theme => ({
  edit: {
    display: 'flex',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  },
  text: {
    width: '50%',
    fontSize: '1rem',
    resize: 'none',
    boxSizing: 'border-box',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  markdown: {
    width: '50%',
    padding: '0 20px',
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    }
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '16px',
  },
  btn: {
    fontSize: '1.5rem',
  }
}))



const Component = ({ children, className }) => {
  return (
    <Fragment>
      {
        children[0].includes('\n') ?
          <SyntaxHighlighter
            language={className === undefined ? '' : className.substring(9)} //특정언어지정
            // style={materialLight}
            wrapLongLines={true} //한줄이 길어지면 다음줄로 넘어가게함 default false
            children={children}
          />
          :
          <SyntaxHighlighter
            customStyle={{
              padding: '0 1px',
            }}
            codeTagProps={{
              style: { color: '#7f5cc8' }
            }}
            // style={materialLight}
            PreTag='span' //pre태그 이름을 바꾸는 것
            language={className === undefined ? '' : className.substring(9)} //특정언어지정
            children={children}
            wrapLongLines={true}
          />
      }
    </Fragment>

  )
};

function MarkdownEditor() {
  const classes = useStyles();
  const page = useParams().study;
  const [text, setText] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOneStudy(page))
      .then(res => {
        if (res.type === LOAD_ONE_STUDY) {
          setText(res.data.page.text);
        }
        if (res.type === LOAD_ONE_STUDY_ERROR) {
          return alert(res.data.message);
        }
        if (res.type === SERVER_ERROR) {
          return history.push('/error/500');
        }
      })
  }, [dispatch, page, history])

  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onClickUpdate = () => {
    dispatch(updateStudyText(page, text))
      .then(res => {
        if (res.type === UPDATE_STUDY_TEXT) {
          return history.push(`/study/${page}`)
        }
        if (res.type === UPDATE_STUDY_TEXT_ERROR) {
          return alert(res.data.message);
        }
        if (res.type === AUTH_ERROR) {
          alert(res.data.message);
          return history.push('/login');
        }
        if (res.type === SERVER_ERROR) {
          return history.push('/error/500');
        }
      })
  };
  const onClickCancel = () => {
    history.push(`/study/${page}`)
  }
  return (
    <Fragment>
      <Box className={classes.edit}>
        <TextareaAutosize className={classes.text} variant='outlined' value={text} onChange={onChangeText} autoFocus />
        <ReactMarkdown className={classes.markdown} rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm, { singleTilde: false }]} children={text} components={{
          code: Component
        }} />
      </Box>
      <Box className={classes.buttonDiv}>
        <Button className={classes.btn} variant="contained" onClick={onClickUpdate}>저장</Button>
        <Button className={classes.btn} variant="contained" onClick={onClickCancel}>취소</Button>
      </Box>
    </Fragment>
  )
}

export default MarkdownEditor

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button, Box, TextareaAutosize  } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadOneStudy, updateStudyText } from '../../../actions/StudyAction'
import gfm from 'remark-gfm'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    edit : {
      display : 'flex',
      marginBottom : '20px',
      [theme.breakpoints.down('md')]: {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
      }
    },
    text : {
      width : '50%',
      padding : '20px',
      fontSize : '1rem',
      resize: 'none',
      [theme.breakpoints.down('md')]: {
        width : '100%',    
      }
    },
    markdown : {
      width : '50%',
      padding : '0 20px',
      overflow : 'auto',
      [theme.breakpoints.down('md')]: {
        width : '100%',    
      }
    },
    buttonDiv :{
      display : 'flex',
      justifyContent : 'space-around',
    },
    btn : {
      fontSize: '1.5rem',
    }
}))



const Component = ({children, className}) => {
  return (
    <>
      {
        children[0].includes('\n') ? 
        <SyntaxHighlighter
          language={ className === undefined ? '' : className.substring(9)} //특정언어지정
          style={materialLight}
          wrapLongLines={true} //한줄이 길어지면 다음줄로 넘어가게함 default false
          children={children}
        /> 
        :
        <SyntaxHighlighter
          customStyle ={{
            height : 'auto',
            padding : '5px 5px',
          }}
          codeTagProps={{
            style : { color : '#7f5cc8'}
          }}
          style={materialLight}
          PreTag = 'span' //pre태그 이름을 바꾸는 것
          language={ className === undefined ? '' : className.substring(9)} //특정언어지정
          children={children}
          wrapLongLines={true}
        />
      }
    </>

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
        setText(res.data.text);
      })
    }, [dispatch, page])

    const onChangeText = (e) => {
      setText(e.target.value);
    };
    const onClickUpdate = () => {
      dispatch(updateStudyText(page, text))
      .then(history.push(`/study/${page}`))
    };
    const onClickCancel = () => {
      history.push(`/study/${page}`)
    }
    return (
      <>
        <Box className={classes.edit}>
          <TextareaAutosize  className={classes.text} variant='outlined' multiline={true} value={text} onChange={onChangeText} autoFocus />
          <ReactMarkdown className={classes.markdown} remarkPlugins={[gfm, {singleTilde: false}]} children={text} components= {{
            code : Component
          }}/>
        </Box>
        <Box className={classes.buttonDiv}>
          <Button className={classes.btn} variant="contained" onClick={onClickUpdate}>저장</Button>
          <Button className={classes.btn} variant="contained" onClick={onClickCancel}>취소</Button>
        </Box>
      </>
    )
}

export default MarkdownEditor

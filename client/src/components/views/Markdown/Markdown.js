import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button, Box, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadOneStudy } from '../../../actions/StudyAction';
import Loading from '../LoadingPage/Loading';
import gfm from 'remark-gfm'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    markdown : {
        outline : 'none',
        overflow : 'auto',
    },
    btn : {
        fontSize: '1.5rem',
    },
    buttonDiv : {
        display : 'flex',
        justifyContent : 'flex-end',
    },
    link : {
        textDecoration : 'none',
        color : 'black',
    },
    markdownDiv : {
        marginBottom : '30px',
    },
    textDiv : {
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        width : '100%',
        height : '100vh',
        fontSize : '2rem',
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
          />
        }
      </>
  
    )
  };

function MarkdownSection() {
    const classes = useStyles();
    const page = useParams().study;
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const user = useSelector(state => state.UserReducer.user);
    const [load, setLoad] = useState(false);
    useEffect(() => {
      setLoad(true)
      dispatch(loadOneStudy(page))
      .then(res => {
        setText(res.data.text);
        setLoad(false)
      })
    }, [dispatch, page])
    return( 
        <Box className={classes.markdownDiv}>
          {load ? 
            <Loading />
          :
          <>
            {text ? 
              <ReactMarkdown className={classes.markdown} remarkPlugins={[gfm]} children={text} components= {{
                code : Component
              }}/>
            :
              <Box className={classes.textDiv}><Typography variant='h3'>게시물이 없습니다.</Typography></Box>
            }
            <Box className={classes.buttonDiv}>
              { user.role === 3 ?                
                <Link className={classes.link} to={`/study/${page}/edit`}><Button className={classes.btn} variant="contained" >{!text ? "글작성" : "글수정"}</Button></Link>
                :
                <></>
              }
            </Box>
          </>
          }
        </Box>
    )
}

export default MarkdownSection;

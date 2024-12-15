import React, { useEffect, useState, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button, Box, Typography } from '@material-ui/core';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadOneStudy } from '../../../actions/StudyAction';
import Loading from '../LoadingPage/Loading';
import gfm from 'remark-gfm'
import { makeStyles } from '@material-ui/core/styles';
import { LOAD_ONE_STUDY, LOAD_ONE_STUDY_ERROR, SERVER_ERROR } from '../../../actions/type';
import rehypeRaw from 'rehype-raw' //markdown이 html을 읽을 수 있도록 함
import emoji from 'emoji-dictionary'; //이모티콘을 불러옴

const useStyles = makeStyles(theme => ({
    markdown: {
        outline: 'none',
        overflow: 'auto',
    },
    btn: {
        fontSize: '1.5rem',
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    },
    markdownDiv: {
        marginBottom: '30px',
    },
    textDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        fontSize: '2rem',
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
                        children={children}
                    />
                    :
                    <SyntaxHighlighter
                        customStyle={{
                            height: 'auto',
                            padding: '0 1px',
                        }}
                        codeTagProps={{
                            style: { color: '#7f5cc8' }
                        }}
                        // style={materialLight}
                        PreTag='span' //pre태그 이름을 바꾸는 것
                        language={className === undefined ? '' : className.substring(9)} //특정언어지정
                        children={children}
                    />
            }
        </Fragment>

    )
};

const emojiSupport = text => {
    return text.replace(/:\w+:/gi, name => {
        if (emoji.getUnicode(name)) {
            return emoji.getUnicode(name);
        } else {
            return '';
        }
    })
}


function MarkdownSection() {
    const classes = useStyles();
    const page = useParams().study;
    const dispatch = useDispatch();
    const history = useHistory();
    const [text, setText] = useState('');
    const user = useSelector(state => state.UserReducer.user);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true)
        dispatch(loadOneStudy(page))
            .then(res => {
                if (res.type === LOAD_ONE_STUDY) {
                    setText(emojiSupport(res.data.page.text));
                    setLoad(false)
                }
                if (res.type === LOAD_ONE_STUDY_ERROR) {
                    return history.push('/Notfound')
                }
                if (res.type === SERVER_ERROR) {
                    return history.push('/error/500');
                }
            })
        return () => {
            setLoad(false);
            setText('');
        }
    }, [dispatch, page, history])
    return (
        <Box className={classes.markdownDiv}>
            {
                load ?
                    <Loading />
                    :
                    <Fragment>
                        {text ?
                            <ReactMarkdown className={classes.markdown} rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} children={text} components={{
                                code: Component
                            }} />
                            :
                            <Box className={classes.textDiv}><Typography variant='h3'>게시물이 없습니다.</Typography></Box>
                        }
                        <Box className={classes.buttonDiv}>
                            {user.role === 3 ?
                                <Link className={classes.link} to={`/study/${page}/edit`}><Button className={classes.btn} variant="contained" >{!text ? "글작성" : "글수정"}</Button></Link>
                                :
                                <Fragment></Fragment>
                            }
                        </Box>
                    </Fragment>
            }
        </Box>
    )
}

export default MarkdownSection;

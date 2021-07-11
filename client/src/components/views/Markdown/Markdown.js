import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadOneStudy } from '../../../actions/StudyAction';
const Markdown = styled(ReactMarkdown)`
  outline : none;
  overflow : auto;
`;

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
              padding : 0,
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

const Buttons = styled(Button)`
  font-size: 1.5rem;
  font-family : Roboto;
`;
const ButtonDiv = styled.div`
  display : flex;
  justify-content : flex-end;
`;
const BtnLink = styled(Link)`
  text-decoration : none;
  color : black;
`;

function MarkdownSection() {
    const page = useParams().study;
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    useEffect(() => {
      dispatch(loadOneStudy(page))
      .then(res => {
        setText(res.data.text);
      })
    }, [dispatch, page])
    return( 
        <>
            <Markdown children={text} components= {{
                code : Component
            }}/>
            <ButtonDiv>
                <BtnLink to={`/study/${page}/edit`}><Buttons variant="contained" >{!text ? "글작성" : "글수정"}</Buttons></BtnLink>
            </ButtonDiv>
        </>
    )
}

export default MarkdownSection;

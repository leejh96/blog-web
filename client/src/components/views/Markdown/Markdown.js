import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@material-ui/core';

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
function MarkdownSection({ page }) {
    const [text, setText] = useState('');
    let history = useHistory();
    useEffect(() => {
      axios.post('/api/study/', {
        study : page
      })
      .then(res => {
        if(res.data.text){
          setText(res.data.text);
        }else{
          setText('');
        }
      })
    }, [page, text])



    const onClickWrite = () => {
      history.push(`/study/${page}/edit`);
    };
    return( 
        <>
            <Markdown children={text} components= {{
                code : Component
            }}/>
            <ButtonDiv>
                <Buttons variant="contained" onClick={onClickWrite}>{!text ? "글작성" : "글수정"}</Buttons>
            </ButtonDiv>
        </>
    )
}

export default MarkdownSection;

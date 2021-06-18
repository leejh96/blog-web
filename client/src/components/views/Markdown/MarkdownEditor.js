import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Express, Algorithm, CSS, HTML, JavaScript, MarkdownText, MongoDB, MySQL, ReactJS } from '../StudyPage/MarkdownText/markdown'
import {Button} from '@material-ui/core';
const EditorArea = styled.div`
  display : flex;
  margin-bottom : 20px;
`;
const Textarea = styled.textarea`
  width : 50%;
  height : 100vh;
  padding : 20px;
  font-size : 1.5rem;
  outline : none;
  resize: none;
`;
const Markdown = styled(ReactMarkdown)`
  width : 50%;
  height : 100vh;
  padding : 20px;
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

const ButtonDiv = styled.div`
  display : flex;
  justify-content : space-around;
`;

const Buttons = styled(Button)`
  font-size: 1.5rem;
  font-family : Roboto;
`;
function MarkdownEditor() {
    const [text, setText] = useState('');
    const onChangeText = (e) => {
      setText(e.target.value);
    };

    const onClickUpdate = (markdown) => {
      markdown = text;
    };
    return (
      <>
        <EditorArea>
          <Textarea value={text} onChange={onChangeText} autoFocus/>
          <Markdown children={text} components= {{
            code : Component
          }}/>
          
        </EditorArea>
        <ButtonDiv>
          <Buttons variant="contained" onClick={() => onClickUpdate(Express)}>수정</Buttons>
          <Buttons variant="contained">삭제</Buttons>
        </ButtonDiv>
      </>
    )
}

export default MarkdownEditor

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {Button} from '@material-ui/core';
import axios from 'axios';

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

const ButtonDiv = styled.div`
  display : flex;
  justify-content : space-around;
`;

const Buttons = styled(Button)`
  font-size: 1.5rem;
  font-family : Roboto;
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

function MarkdownEditor({ page }) {
    const [text, setText] = useState('');
    const history = useHistory();

    useEffect(() => {
      axios.post('/api/study/', {
        study : page
      })
      .then(res => {
        if(res.data.text){
          setText(res.data.text)
        }else{
          setText('');
        }
      })
    }, [page])

    const onChangeText = (e) => {
      setText(e.target.value);
    };
    const onClickUpdate = () => {
        axios.put(`/api/study/${page}/update`, {
          text,
          study : page
        })
        .then(res => {
          if(res.data.success){
            return history.push(`/study/${page}`);
          }
          alert(res.data.message);
          return history.push(`/study/${page}`);
        })
    };
    
    const onClickDelete = () => {
      axios.delete(`/api/study/${page}/delete`, {
        data : {
          study : page
        }
      })
      .then(res => {
        if(res.data.success){
          return history.push('/');
        }
        return alert(res.data.message);
      })
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
          <Buttons variant="contained" onClick={onClickUpdate} >저장</Buttons>
          <Buttons variant="contained" onClick={onClickDelete}>삭제</Buttons>
        </ButtonDiv>
      </>
    )
}

export default MarkdownEditor

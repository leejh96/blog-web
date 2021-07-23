import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadOneStudy, updateStudyText } from '../../../actions/StudyAction'
import gfm from 'remark-gfm'

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
        <EditorArea>
          <Textarea value={text} onChange={onChangeText} autoFocus/>
          <Markdown remarkPlugins={[gfm, {singleTilde: false}]} children={text} components= {{
            code : Component
          }}/>
        </EditorArea>
        <ButtonDiv>
          <Buttons variant="contained" onClick={onClickUpdate}>저장</Buttons>
          <Buttons variant="contained" onClick={onClickCancel}>취소</Buttons>
        </ButtonDiv>
      </>
    )
}

export default MarkdownEditor

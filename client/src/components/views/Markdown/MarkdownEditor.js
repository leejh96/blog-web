import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'

const EditorArea = styled.div`
  display : flex;
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
`;
const Component = ({ children }) => {
  return (
    <SyntaxHighlighter 
      style={materialLight}
      children = {children}
    />
  )
};

function MarkdownEditor() {
    const [text, setText] = useState('');
    const onChangeText = (e) => {
      setText(e.target.value);
    };
    return (
      <EditorArea>
        <Textarea value={text} onChange={onChangeText} autoFocus/>
        <Markdown children={text} components= {{
          code : Component
        }}/>
      </EditorArea>
    )
}

export default MarkdownEditor

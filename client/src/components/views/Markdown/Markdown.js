import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { materialLight  } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Express, Algorithm, CSS, HTML, JavaScript, MarkdownText, MongoDB, MySQL, ReactJS } from '../StudyPage/MarkdownText/markdown'

const Markdown = styled(ReactMarkdown)`
  width : 100%;
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

function MarkdownSection({page}) {
    let text = ''
    switch(page) {
        case 'Express':{
            text = Express;
            break;
        }
        case 'Algorithm':{
            text = Algorithm;
            break;
        }
        case 'CSS':{
            text = CSS;
            break;
        }
        case 'HTML':{
            text = HTML;
            break;
        }
        case 'JavaScript':{
            text = JavaScript;
            break;
        }
        case 'MongoDB':{
            text = MongoDB;
            break;
        }
        case 'MySQL':{
            text = MySQL;
            break;
        }
        case 'ReactJS':{
            text = ReactJS;
            break;
        }
        case 'MarkdownText':{
            text = MarkdownText;
            break;
        }
        default : {
            text = '# hello';
        }
    }
    return( 
        <>
            <Markdown children={text} components= {{
                code : Component
            }}/>
        </>
    )
}

export default MarkdownSection

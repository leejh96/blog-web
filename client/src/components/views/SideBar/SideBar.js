import { Divider } from '@material-ui/core';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
const SideTitle = styled.h3`
  margin : 0;
  padding : 20px 0 20px 0;
  text-align : center;
  border-bottom : 1px solid #eeeeee
`;
const SideMain = styled.div`
  display : flex;
  flex-direction : column;
  padding : 10px 10px 0 30px
`;
const SideBar = styled.div`
  height : 100vh;
  width : 200px;
  border : 1px solid #eeeeee;
  border-top : 0 ;
  border-bottom : 0;

`;
const SideLink = styled(Link)` //react-router-dom 태그는 ()에 넣는다
  text-decoration : none;
  margin-bottom : 3px;
  color : black;
  &:hover{
    color : #999999;
    text-decoration : underline;
  };
`;
const MenuTitle = styled.h4`
  margin : 0;
`;

const MenuTitleDiv = styled.div`
  display : flex;
  justify-content : space-between;
  margin : 0 0 10px 0;
  padding : 0;
`;
const DeleteBtn = styled.button`
  padding : 0;
  margin : 0;
  background-color : white;
  border :0;
  cursor : pointer;
`;
const PlusBtn = styled.button`
  padding : 0;
  margin : 0;
  background-color : white;
  border :0;
  cursor : pointer;
  &:hover{
    border : 1.5px groove #eeeeee;
  }
`;

const PlusFieldDiv = styled.div`
  margin-bottom : 10px;
  display : flex;
  justify-content : space-between;
`;

const Text = styled.input`
  padding : 0;
  margin :0;
  width : 70%;
`;

const CreateBtn = styled.button`
  padding : 0 2px;
  margin : 0;
  cursor : pointer;

  // background-color : white;
  // border :0;
  // cursor : pointer;
  // &:hover{
  //   border : 1.5px groove #eeeeee;
  // }
`;

const StudyDiv = styled.div`
  display : flex;
  justify-content : space-between;
`;

const BoardDiv = styled.div`
  display : flex;
  justify-content : space-between;
`;

function Sidebar() {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState('');

  const category = [
    {
      tag : '공지사항',
      link : '/notice/1'
    },
    {
      tag : '개발일지',
      link : '/diary'
    },
    {
      tag : '최근이슈',
      link : '/issue'
    },
    {
      tag : '방명록',
      link : '/guestbook/1'
    }
  ];
  const study = [
    {
      tag : 'Express',
      link : '/study/Express'
    },
    {
      tag : 'React',
      link : '/study/ReactJS'
    },
    {
      tag : 'MongoDB',
      link : '/study/MongoDB'
    },
    {
      tag : 'MySQL',
      link : '/study/MySQL'
    },
    {
      tag : 'HTML',
      link : '/study/HTML'
    },
    {
      tag : 'CSS',
      link : '/study/CSS'
    },
    {
      tag : 'JavaScript',
      link : '/study/JavaScript'
    },
    {
      tag : 'Algorithm',
      link : '/study/Algorithm'
    },
  ];
  const onChangeText = (e) => {
    setText(e.target.value);
  }

  const onClickPlusBtn = () => {
    toggle ? setToggle(false) : setToggle(true)
  } 
  const onClickCreateBtn = () => {
    console.log(1);
  };
  const onClickDeleteBtn = () => {
    console.log(1);
  };
  return (
    <SideBar>
      <SideTitle>
        메뉴
      </SideTitle>
      <SideMain>
        <MenuTitleDiv>
          <MenuTitle>Study</MenuTitle>
          <PlusBtn variant='text' onClick={onClickPlusBtn}>+</PlusBtn>
        </MenuTitleDiv>
        { toggle ?
          <PlusFieldDiv>
              <Text onChange={onChangeText}/>
              <CreateBtn onClick={onClickCreateBtn}>추가</CreateBtn>
          </PlusFieldDiv>
          :
          <></>
        }
        {study.map((val, i) => (
          <StudyDiv key={i}>
            <SideLink to={val.link} >
              {val.tag}
            </SideLink>
            <DeleteBtn onClick={onClickDeleteBtn}>x</DeleteBtn>
          </StudyDiv>
        ))}
      </SideMain>
      <Divider style={{margin : '10px 0 10px 0'}}/>
      <SideMain>
        <MenuTitleDiv>
          <MenuTitle>Board</MenuTitle>
        </MenuTitleDiv>        
        {category.map((val, i) => (
          <BoardDiv key={i}>
            <SideLink to={val.link}>{val.tag} </SideLink>
            <DeleteBtn onClick={onClickDeleteBtn}>x</DeleteBtn>
          </BoardDiv>
        ))}
      </SideMain>
     </SideBar> 
  )
}

export default Sidebar

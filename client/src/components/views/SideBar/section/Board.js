import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SideMain = styled.div`
  display : flex;
  flex-direction : column;
  padding : 10px 10px 0 30px
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

const Category = () => {
    return [
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
    ]
  }

function Board() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        setCategory(Category());
    }, [])
    return (
        <SideMain>
            <MenuTitleDiv>
            <MenuTitle>Board</MenuTitle>
            </MenuTitleDiv>    
            {category.map((val, i) => (
                <SideLink key={i} to={val.link}>{val.tag} </SideLink>
            ))}
        </SideMain>
    )
}

export default Board

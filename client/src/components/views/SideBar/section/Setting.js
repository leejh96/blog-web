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
      tag : '닉네임 변경',
      link : '/setting/nick'
    },
    {
      tag : '비밀번호 변경',
      link : '/setting/password'
    },
    {
      tag : '회원 탈퇴',
      link : '/setting/resign'
    }
  ]
}

function Setting() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        setCategory(Category());
    }, [])
    return (
        <SideMain>
            <MenuTitleDiv>
                <MenuTitle>목록</MenuTitle>
            </MenuTitleDiv>    
            {category.map((val, i) => (
                <SideLink key={i} to={val.link}>{val.tag} </SideLink>
            ))}
        </SideMain>
    )
}

export default Setting
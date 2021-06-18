import { Divider } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const SideTitle = styled.h3`
  margin : 0;
  padding : 20px 0 20px 0;
  text-align : center;
  border-bottom : 1px solid #eeeeee
`;
const SideMain = styled.div`
  display : flex;
  flex-direction : column;
  align-items : flex-start;
  padding-left : 30px;
  margin-top : 10px;
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
  margin : 0 0 10px 0;
  padding : 0;
`;
function Sidebar() {
  const category = [
    {
      tag : '공지사항',
      link : '/notice?page=1'
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
      link : '/guestbook'
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
  return (
    <SideBar>
      <SideTitle>
        메뉴
      </SideTitle>
      <SideMain>
        <MenuTitle>Study</MenuTitle>
        {study.map((val, i) => (
          <SideLink key={i} to={val.link} >
            {val.tag}
          </SideLink>
        ))}
      </SideMain>
      <Divider style={{margin : '10px 0 10px 0'}}/>
      <SideMain>
        <MenuTitle>Notice</MenuTitle>
        {category.map((val, i) => (
          <SideLink key={i} to={val.link}>
            {val.tag}
          </SideLink>
        ))}
      </SideMain>
     </SideBar> 
  )
}

export default Sidebar

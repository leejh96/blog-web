import React from 'react'
import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import Study from './section/Study';
import Board from './section/Board';
import Setting from './section/Setting'
import { useLocation } from 'react-router-dom';
const SideTitle = styled.h3`
  margin : 0;
  padding : 20px 0 20px 0;
  text-align : center;
  border-bottom : 1px solid #eeeeee
`;
const SideBar = styled.div`
  position : sticky;
  top : 0;
  height : 100vh;
  width : 200px;
  border : 1px solid #eeeeee;
  border-top : 0 ;
  border-bottom : 0;
  @media screen and (max-width : 768px){
      display : none;
  }
`;

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <SideBar>
    { pathname.indexOf('/setting') !== -1 ?
      <Setting />
      :
      <>
        <SideTitle>
          메뉴
        </SideTitle>
        <Study />
        <Divider style={{margin : '10px 0 10px 0'}}/>
        <Board />
      </>
    }
    </SideBar> 
  )
}

export default Sidebar

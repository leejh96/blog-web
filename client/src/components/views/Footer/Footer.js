import React from 'react';
import { Container } from '@material-ui/core'
import Copyright from './section/Copyright';
import styled from 'styled-components';

const FooterArea = styled.div`
  height : 80px;
  border : 1px solid #eeeeee;
  padding-top : 20px;
`;

const FooterText = styled.p`
  margin :0;
  padding : 0;
  text-align : center;
`;
function Footer(){ 
  return (
      <FooterArea>
        <FooterText> 
          Tel : 010-1111-1111<br />
          <Copyright />
        </FooterText>
      </FooterArea>
  );
}

export default Footer
import React from "react";
import styled from "styled-components";
import Copyright from "./section/Copyright";

const FooterArea = styled.div`
  height: 80px;
  border: 1px solid #eeeeee;
  padding-top: 20px;
  min-width: 480px;
`;

const FooterText = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
`;
function Footer() {
  return (
    <FooterArea>
      <FooterText>
        Tel : 010-4850-0573
        <br />
        <Copyright />
      </FooterText>
    </FooterArea>
  );
}

export default Footer;

import React from "react";
import styled from 'styled-components';

const Div =  styled.div`
  text-align: right;
`;

function AuthWrap({ children }) {
  return (
    <Div>
      {children}
    </Div>);
}

export default AuthWrap;

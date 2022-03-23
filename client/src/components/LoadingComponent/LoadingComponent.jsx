import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
const Loading = styled(ReactLoading)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100vh;
`;

function LoadingComponent() {
  return <Loading type="spin" color="blue" />;
}

export default LoadingComponent;

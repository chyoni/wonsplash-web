import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const Load = styled.img`
  animation: ${rotate} 1s linear infinite;
  width: 30px;
`;

const Loader: React.SFC = () => {
  return (
    <Container>
      <Load src={require("../../images/loading.png")} />
    </Container>
  );
};

export default Loader;

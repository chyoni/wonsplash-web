import React from "react";
import styled from "styled-components";

const Container = styled.img`
  border-radius: 50%;
`;

interface IProps {
  uri: any;
  className?: any;
}
const Avatar: React.SFC<IProps> = ({ uri, className }) => {
  if (uri === null || uri === "") {
    return (
      <Container
        className={className}
        src={require("../../images/noPhoto.jpg")}
      />
    );
  } else {
    return <Container className={className} src={uri} />;
  }
};

export default Avatar;

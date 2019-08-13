import React from "react";
import styled from "styled-components";

const Container = styled<any>("button")`
  width: ${props => props.width};
  padding: 10px;
  color: ${props => props.textColor};
  background-color: ${props => props.bgColor};
  border: 1px solid ${props => props.bgColor};
  border-radius: 5px;
  font-size: ${props => props.textSize};
  cursor: pointer;
`;

interface IProps {
  width: string;
  textColor: string;
  bgColor: string;
  text: string;
  textSize: string;
  onClick: any;
  className?: any;
}
const Button: React.SFC<IProps> = ({
  width,
  text,
  textColor,
  bgColor,
  textSize,
  onClick,
  className
}) => {
  return (
    <Container
      className={className}
      onClick={onClick}
      textColor={textColor}
      width={width}
      bgColor={bgColor}
      textSize={textSize}
    >
      {text}
    </Container>
  );
};

export default Button;

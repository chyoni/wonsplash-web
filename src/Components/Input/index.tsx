import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";

const Container = styled.input`
  width: 600px;
  padding: 8px;
  border: ${Theme.boxBorder};
  border-radius: 5px;
  font-size: 18px;
  &:focus {
    outline: 1px solid black;
  }
`;
interface IProps {
  name: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
}
const Input: React.SFC<IProps> = ({ name, onChange, value, type }) => {
  return (
    <Container name={name} onChange={onChange} value={value} type={type} />
  );
};

export default Input;

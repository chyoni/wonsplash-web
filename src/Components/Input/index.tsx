import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";

const Container = styled<any>("input")`
  width: ${props => props.customWidth};
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
  onKeyPress?: (e) => void;
  type?: string;
  customWidth: string;
  className?: any;
  placeholder?: string;
}
const Input: React.SFC<IProps> = ({
  name,
  onChange,
  value,
  type,
  customWidth,
  placeholder,
  className,
  onKeyPress
}) => {
  return (
    <Container
      className={className}
      name={name}
      onChange={onChange}
      value={value}
      onKeyPress={onKeyPress}
      type={type}
      customWidth={customWidth}
      placeholder={placeholder}
    />
  );
};

export default Input;

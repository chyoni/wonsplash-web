import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";

const Container = styled.div`
  width: 160px;
  height: 200px;
  margin-bottom: 15px;
`;

const Image = styled.label`
  cursor: pointer;
  height: 160px;
  width: 160px;
  border: ${Theme.boxBorder};
  display: block;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 160px;
    height: 160px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  uploading: boolean;
  fileUrl: string | null;
  onChange: any; // (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarInput: React.SFC<IProps> = ({ uploading, fileUrl, onChange }) => {
  return (
    <Container>
      <Input
        id={"avatar"}
        type={"file"}
        accept={"image/*"}
        onChange={onChange}
      />
      <Image htmlFor={"avatar"}>
        {uploading ? (
          "⏰"
        ) : (
          <img src={fileUrl || require("../../images/noPhoto.jpg")} />
        )}
      </Image>
    </Container>
  );
};

export default AvatarInput;

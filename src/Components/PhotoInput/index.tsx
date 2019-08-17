import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import Loader from "../Loader";

const Container = styled.div`
  width: 100%;
  min-height: 500px;
  margin-bottom: 15px;
`;
const Image = styled.label`
  cursor: pointer;
  width: 100%;
  height: 800px;
  border: ${Theme.boxBorder};
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackgroundImage = styled<any>("div")`
  background-image: url(${props => props.file});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;
const Alternative = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const NoPhoto = styled.img`
  width: 500px;
  height: 500px;
`;
const Input = styled.input`
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  fileUrl: string | null;
  onChange: any;
  uploading: boolean;
}
const PhotoInput: React.SFC<IProps> = ({ fileUrl, onChange, uploading }) => {
  return (
    <Container>
      <Input
        id={"upload"}
        type={"file"}
        accept={"image/*"}
        onChange={onChange}
      />
      <Image htmlFor={"upload"}>
        {uploading ? (
          <Loader />
        ) : fileUrl !== null ? (
          <BackgroundImage file={fileUrl} />
        ) : (
          <Alternative>
            <NoPhoto src={require("../../images/noSearch.png")} />
          </Alternative>
        )}
      </Image>
    </Container>
  );
};

export default PhotoInput;

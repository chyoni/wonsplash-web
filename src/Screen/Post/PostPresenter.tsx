import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import PhotoInput from "src/Components/PhotoInput";
import Input from "src/Components/Input";
import Button from "src/Components/Button";

const Container = styled.div`
  width: 100%;
  max-width: ${Theme.photoMaxWidth};
  margin: 0 auto;
  margin-top: 50px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  font-size: 46px;
  font-weight: 600;
  color: ${Theme.blackFontColor};
  margin-bottom: 25px;
`;
const Info = styled.span`
  font-size: 30px;
  color: ${Theme.blackFontColor};
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface IProps {
  uploading: boolean;
  fileUrl: string | null;
  onChangeText: (e) => void;
  tags: any;
  onChange: (e: any) => Promise<void>;
  onSubmit: () => Promise<void>;
}
const PostPresenter: React.SFC<IProps> = ({
  uploading,
  fileUrl,
  onChange,
  tags,
  onChangeText,
  onSubmit
}) => {
  return (
    <Container>
      <Header>
        <Title>Post Photo </Title>
        <Info>👇 Click here and Select Photo 👇</Info>
      </Header>
      <PhotoInput onChange={onChange} fileUrl={fileUrl} uploading={uploading} />
      <Footer>
        <Column style={{ marginBottom: 10 }}>
          <Info style={{ fontSize: 20, marginBottom: 10 }}>Tags</Info>
          <Input
            name={"tags"}
            value={tags}
            onChange={onChangeText}
            customWidth={"100%"}
            placeholder={"wonsplash, football, soccer"}
          />
        </Column>
        <Column style={{ alignItems: "flex-end" }}>
          <Button
            width={"60px"}
            bgColor={Theme.blackFontColor}
            onClick={onSubmit}
            text={"Post"}
            textColor={Theme.whiteFontColor}
            textSize={"15px"}
          />
        </Column>
      </Footer>
    </Container>
  );
};

export default PostPresenter;

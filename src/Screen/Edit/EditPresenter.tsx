import React from "react";
import styled from "styled-components";
import { IProfile } from "src/Redux/Modules/user";
import Theme from "src/Styles/Theme";
import AvatarInput from "src/Components/AvatarInput";
import Input from "src/Components/Input";
import Button from "src/Components/Button";

const Container = styled.div`
  width: 100%;
  max-width: ${Theme.photoMaxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Label = styled.span`
  font-size: 18px;
  color: ${Theme.blackFontColor};
  margin-bottom: 10px;
`;
const Footer = styled.div``;

interface IProps {
  fileUrl: string | null;
  uploading: boolean;
  firstName: string;
  lastName: string;
  me: IProfile;
  onChangeText: (e) => void;
  onChange: (e: any) => Promise<void>;
  onSumbit: () => void;
}

const EditPresenter: React.SFC<IProps> = ({
  fileUrl,
  uploading,
  firstName,
  lastName,
  me,
  onChangeText,
  onChange,
  onSumbit
}) => {
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <AvatarInput
            uploading={uploading}
            fileUrl={fileUrl}
            onChange={onChange}
          />
        </HeaderLeft>
        <HeaderRight>
          <Column>
            <Label>First Name</Label>
            <Input
              name={"firstName"}
              value={firstName}
              onChange={onChangeText}
              customWidth={"100%"}
            />
          </Column>
          <Column>
            <Label>Last Name</Label>
            <Input
              name={"lastName"}
              value={lastName}
              onChange={onChangeText}
              customWidth={"100%"}
            />
          </Column>
        </HeaderRight>
      </Header>
      <Footer>
        <Button
          width={"383px"}
          bgColor={Theme.blackFontColor}
          onClick={onSumbit}
          text={"Update Account"}
          textSize={"17px"}
          textColor={Theme.whiteFontColor}
        />
      </Footer>
    </Container>
  );
};

export default EditPresenter;

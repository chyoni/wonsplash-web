import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import { Facebook } from "../../Components/Icons/icons";
import "./Join.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const PreImage = styled.div`
  background-image: url("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  width: 800px;
  transition: width 0.2s ease-in-out;
  @media (min-width: 2000px) {
    width: 1000px;
    max-width: 1000px;
    min-width: 1000px;
  }
  resize: none;
  height: 100%;
`;
const JoinBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Bold = styled.span`
  font-size: 50px;
  font-weight: 600;
  color: ${Theme.blackFontColor};
`;
const Text = styled.span`
  margin-top: 40px;
  font-size: 15px;
`;
const ExLink = styled(Link)`
  text-decoration: underline;
  text-decoration-color: ${Theme.greyFontColor};
  color: ${Theme.greyFontColor};
  margin-left: 6px;
`;
const OR = styled.span`
  font-size: 13px;
  margin: 25px 0;
`;
const Label = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
  color: ${Theme.blackFontColor};
`;
const Form = styled.div`
  width: 600px;
  @media (min-width: 1800px) {
    width: 1000px;
  }
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 25px;
`;

interface IProps {
  responseFacebook: (response: any) => void;
  onClickRegist: () => Promise<void>;
  username: string;
  password1: string;
  password2: string;
  email: string;
  onChange: (e) => void;
}
const JoinPresenter: React.SFC<IProps> = ({
  responseFacebook,
  username,
  password1,
  password2,
  email,
  onChange,
  onClickRegist
}) => {
  return (
    <Container>
      <Helmet>
        <title>회원가입 | Wonsplash</title>
      </Helmet>
      <PreImage />
      <JoinBox>
        <Bold>Join Wonsplash</Bold>
        <Text>
          Already have an account?<ExLink to={"/"}>Login</ExLink>
        </Text>
        <FacebookLogin
          appId="475957043218096"
          autoLoad={false}
          fields="name,email,picture"
          cssClass={"facebook-join"}
          icon={<Facebook />}
          callback={responseFacebook}
          textButton={"Join With Facebook"}
        />
        <OR>OR</OR>
        <Form>
          <Column>
            <Label>Username</Label>
            <Input
              type={"text"}
              name={"username"}
              customWidth={"100%"}
              value={username}
              onChange={onChange}
            />
          </Column>
          <Column>
            <Label>Email </Label>
            <Input
              type={"email"}
              name={"email"}
              customWidth={"100%"}
              value={email}
              onChange={onChange}
            />
          </Column>
          <Column>
            <Label>Password</Label>
            <Input
              type={"password"}
              name={"password1"}
              customWidth={"100%"}
              value={password1}
              onChange={onChange}
            />
          </Column>
          <Column>
            <Label>Confirm Password</Label>
            <Input
              type={"password"}
              name={"password2"}
              customWidth={"100%"}
              value={password2}
              onChange={onChange}
            />
          </Column>
          <Button
            width={"100%"}
            onClick={onClickRegist}
            text={"Login"}
            textColor={Theme.whiteFontColor}
            bgColor={Theme.blackFontColor}
            textSize={"18px"}
          />
        </Form>
      </JoinBox>
    </Container>
  );
};

export default JoinPresenter;

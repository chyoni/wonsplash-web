import React from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login";
import Theme from "../../Styles/Theme";
import Helmet from "react-helmet";
import "./Login.css";
import { Facebook } from "../../Components/Icons/icons";
import Input from "../../Components/Input";
import Button from "src/Components/Button";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  max-width: ${Theme.maxWidth};
  background-color: ${Theme.whiteFontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Image = styled.img`
  width: 100px;
  height: 98px;
`;
const Bold = styled.span`
  margin-top: 15px;
  font-size: 24px;
  font-weight: 600;
`;
const Text = styled.span`
  margin-top: 15px;
  font-size: 15px;
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
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-bottom: 25px;
`;
const ExLink = styled(Link)`
  text-decoration: underline;
  text-decoration-color: ${Theme.greyFontColor};
  color: ${Theme.greyFontColor};
  margin-left: 6px;
`;

interface IProps {
  username: string;
  password: string;
  onChange: (e: any) => void;
  responseFacebook: (response: any) => void;
  onClickLogin: () => void;
}
const LoginPresenter: React.SFC<IProps> = ({
  username,
  password,
  onChange,
  responseFacebook,
  onClickLogin
}) => {
  return (
    <Container>
      <Helmet>
        <title>로그인 | Wonsplash</title>
      </Helmet>
      <Image src={require("../../images/logo.png")} />
      <Bold>Login</Bold>
      <Text>Welcome back</Text>
      <FacebookLogin
        appId="475957043218096"
        autoLoad={false}
        fields="name,email,picture"
        cssClass={"facebook-login"}
        icon={<Facebook />}
        callback={responseFacebook}
      >
        Login with Facebook
      </FacebookLogin>
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
          <Label>Password</Label>
          <Input
            type={"password"}
            name={"password"}
            customWidth={"100%"}
            value={password}
            onChange={onChange}
          />
        </Column>
        <Button
          width={"600px"}
          onClick={onClickLogin}
          text={"Login"}
          textColor={Theme.whiteFontColor}
          bgColor={Theme.blackFontColor}
          textSize={"18px"}
        />
      </Form>
      <Text>
        Don't have an account?<ExLink to={"/join"}>Join</ExLink>
      </Text>
    </Container>
  );
};

export default LoginPresenter;

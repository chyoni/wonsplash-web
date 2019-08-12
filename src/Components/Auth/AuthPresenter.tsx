import React from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login";
import Theme from "../../Styles/Theme";
import "./Auth.css";
import { Facebook } from "../Icons/icons";
import Input from "../Input";
import Button from "src/Button";

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
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-bottom: 25px;
`;
interface IProps {
  username: string;
  password: string;
  onChange: (e: any) => void;
  responseFacebook: (response: any) => void;
}
const AuthPresenter: React.SFC<IProps> = ({
  username,
  password,
  onChange,
  responseFacebook
}) => {
  const onClickLogin = () => {
    console.log("button click");
  };
  return (
    <Container>
      <Image src={require("../../images/logo.png")} />
      <Bold>Login</Bold>
      <Text>Welcome back</Text>
      <FacebookLogin
        appId="475957043218096"
        autoLoad={false}
        fields="name,email,picture"
        cssClass={"facebook-button"}
        icon={<Facebook />}
        callback={responseFacebook}
      >
        Login with Facebook
      </FacebookLogin>
      <OR>OR</OR>
      <Form>
        <Column>
          <Label>Username</Label>
          <Input name={"username"} value={username} onChange={onChange} />
        </Column>
        <Column>
          <Label>Password</Label>
          <Input name={"password"} value={password} onChange={onChange} />
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
    </Container>
  );
};

export default AuthPresenter;

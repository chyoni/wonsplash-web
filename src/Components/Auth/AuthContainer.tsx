import React from "react";
import AuthPresenter from "./AuthPresenter";

interface IState {
  username: string;
  password: string;
}
interface IProps {
  facebookLogin: (accessToken: any) => void;
  usernameLogin: (username: string, password: string) => void;
}

class AuthContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  public onChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({
      [name]: value
    } as any);
  };

  public responseFacebook = response => {
    const { facebookLogin } = this.props;
    if (response.accessToken) {
      facebookLogin(response.accessToken);
    }
  };

  public onClickLogin = () => {
    const { username, password } = this.state;
    const { usernameLogin } = this.props;
    if (username === "" || password === "") {
      return;
    }
    usernameLogin(username, password);
  };

  public render() {
    const { username, password } = this.state;
    return (
      <AuthPresenter
        username={username}
        password={password}
        onChange={this.onChange}
        onClickLogin={this.onClickLogin}
        responseFacebook={this.responseFacebook}
      />
    );
  }
}

export default AuthContainer;

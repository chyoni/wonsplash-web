import React from "react";
import AuthPresenter from "./AuthPresenter";

interface IState {
  username: string;
  password: string;
}
interface IProps {
  facebookLogin: (accessToken: any) => void;
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

  public render() {
    const { username, password } = this.state;
    return (
      <AuthPresenter
        username={username}
        password={password}
        onChange={this.onChange}
        responseFacebook={this.responseFacebook}
      />
    );
  }
}

export default AuthContainer;

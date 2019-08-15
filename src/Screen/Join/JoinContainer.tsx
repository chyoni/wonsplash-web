import React from "react";
import JoinPresenter from "./JoinPresenter";

interface IProps {
  facebookLogin: (accessToken: any) => void;
  registration: (
    username: string,
    password1: string,
    password2: string,
    email: string
  ) => void;
  router: any;
  history: any;
}
interface IState {
  username: string;
  password1: string;
  password2: string;
  email: string;
}
class JoinContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: "",
      email: ""
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

  public onClickRegist = async () => {
    const { username, password1, password2, email } = this.state;
    const { registration } = this.props;
    if (
      username === "" ||
      password1 === "" ||
      password2 === "" ||
      email === ""
    ) {
      return;
    }
    registration(username, password1, password2, email);
  };

  public render() {
    const { username, password1, password2, email } = this.state;
    return (
      <JoinPresenter
        responseFacebook={this.responseFacebook}
        username={username}
        password1={password1}
        password2={password2}
        email={email}
        onClickRegist={this.onClickRegist}
        onChange={this.onChange}
      />
    );
  }
}

export default JoinContainer;

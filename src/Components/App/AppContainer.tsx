import React from "react";
import AppPresenter from "./AppPresenter";

interface IProps {
  isLoggedIn: boolean;
  pathname: string;
}

class AppContainer extends React.Component<IProps> {
  public render() {
    const { isLoggedIn, pathname } = this.props;
    return <AppPresenter isLoggedIn={isLoggedIn} pathname={pathname} />;
  }
}

export default AppContainer;
